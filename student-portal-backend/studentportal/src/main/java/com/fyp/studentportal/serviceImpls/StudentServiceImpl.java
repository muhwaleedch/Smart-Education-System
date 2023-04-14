package com.fyp.studentportal.serviceImpls;

import com.fyp.studentportal.domains.*;
import com.fyp.studentportal.domains.questions.Option;
import com.fyp.studentportal.dto.quiz.MCQDTO;
import com.fyp.studentportal.dto.quiz.QuizDetailsResponseDTO;
import com.fyp.studentportal.dto.quiz.QuizSubmitDTO;
import com.fyp.studentportal.enums.AssignmentStatus;
import com.fyp.studentportal.enums.QuizAttemptStatus;
import com.fyp.studentportal.enums.Semester;
import com.fyp.studentportal.repositories.CourseRepository;
import com.fyp.studentportal.repositories.OptionRepository;
import com.fyp.studentportal.repositories.QuizRepository;
import com.fyp.studentportal.repositories.StudentRepository;
import com.fyp.studentportal.services.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements IStudentService {
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final QuizRepository quizRepository;
    private final OptionRepository optionRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, CourseRepository courseRepository, BCryptPasswordEncoder bCryptPasswordEncoder, QuizRepository quizRepository, OptionRepository optionRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.quizRepository = quizRepository;
        this.optionRepository = optionRepository;
    }

    @Override
    public Student createStudent(Student student) {
        if (null != student.getStudentId() && this.studentRepository.existsById(student.getStudentId())) {
            throw new DataIntegrityViolationException("Student Already exists");
        }
        student.setPassword(this.bCryptPasswordEncoder.encode(student.getPassword()));
        return this.studentRepository.save(student);
    }

    @Override
    public Student updateStudent(Student student) {
        Optional<Student> optionalStudent = this.studentRepository.findById(student.getStudentId());
        if (optionalStudent.isPresent()) {
            if (student.getPassword() != null && student.getPassword().equals("")) {
                student.setPassword(this.bCryptPasswordEncoder.encode(student.getPassword()));
            } else {
                student.setPassword(optionalStudent.get().getPassword());
            }
            student.setRegisteredCourses(optionalStudent.get().registeredCourses());
            return this.studentRepository.save(student);
        }
        throw new EntityNotFoundException("Student does not exists");
    }

    @Override
    public void deleteStudent(Long studentId) {
        this.studentRepository.deleteById(studentId);
    }

    @Override
    public List<Student> getAllStudentsForDepartment(Long departmentId) {
        return this.studentRepository.findAllByDepartment_DepartmentId(departmentId);
    }

    @Override
    public Student getStudentDetails(Long studentId) {
        Optional<Student> optionalStudent = this.studentRepository.findById(studentId);
        if (optionalStudent.isPresent()) {
            return optionalStudent.get();
        }
        throw new EntityNotFoundException("Student not found");
    }

    @Override
    public Set<Student> getAllStudents() {
        return this.studentRepository.findAll().stream().peek(it -> it.setPassword(null)).collect(Collectors.toSet());
    }

    @Override
    public Set<Course> getAllCourses(Long studentId) {
        Optional<Student> optionalStudent = this.studentRepository.findById(studentId);
        if (optionalStudent.isPresent()) {
            return optionalStudent.get().registeredCourses();
        }
        throw new EntityNotFoundException("Student not found");
    }

    @Override
    public List<Course> getCourseOptions(Long studentId) {
        Optional<Student> optionalStudent = this.studentRepository.findById(studentId);
        if (optionalStudent.isPresent()) {
            return this.courseRepository.findAllByDepartment_DepartmentIdAndSemesterNumberIn(optionalStudent.get().getDepartment().getDepartmentId(), Semester.getSemesters(optionalStudent.get().getSemesterNumber()));
        }
        throw new EntityNotFoundException("Student not found");
    }

    @Override
    public Student registerCourse(Long courseId, Long studentId) {
        Optional<Student> optionalStudent = this.studentRepository.findById(studentId);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            Optional<Course> course = this.courseRepository.findById(courseId);
            if (course.isPresent()) {
                student.registeredCourses().add(course.get());
                course.get().students().add(student);
                return this.studentRepository.save(student);
            } else {
                throw new EntityNotFoundException("Course not found!");
            }
        }
        throw new EntityNotFoundException("Student not found");
    }

    @Override
    public List<Quiz> getStudentActiveQuizzes(Long studentId, Long courseId) {
        Date currentDate = new Date(System.currentTimeMillis());
        Optional<Student> optionalStudent = this.studentRepository.findById(studentId);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            boolean isFound = false;
            for (Course it : student.registeredCourses()) {
                if (it.getCourseId().equals(courseId)) {
                    isFound = true;
                    break;
                }
            }
            if (!isFound) {
                throw new RuntimeException("Course Does not exist for student");
            }

            List<Quiz> finalListQuiz;
            finalListQuiz = student.getStudentAttemptQuizRecords().stream().filter(it -> {
                if (it.getQuiz().getStartTime() == null || it.getQuiz().getEndTime() == null || it.getQuizAttemptStatus() == QuizAttemptStatus.ATTEMPTED) {
                    return false;
                }
                return it.getQuiz().getStartTime().compareTo(currentDate) <= 0 && it.getQuiz().getEndTime().compareTo(currentDate) > 0;
            }).map(StudentAttemptQuizRecord::getQuiz).collect(Collectors.toList());
            return finalListQuiz;
        }
        throw new EntityNotFoundException("Student not found");
    }

    @Override
    public Object getQuizDetailsAndMcqOptions(Long quizId) {
        Optional<Quiz> optionalQuiz = this.quizRepository.findById(quizId);
        if (optionalQuiz.isPresent()) {
            Quiz quiz = optionalQuiz.get();
            QuizDetailsResponseDTO quizDetailsResponseDTO = new QuizDetailsResponseDTO();
            quizDetailsResponseDTO.setQuizId(quiz.getQuizId());
            List<MCQDTO> mcqsList = new ArrayList<>();
            quiz.getAllMcqs().forEach(it -> {
                MCQDTO mcqdto = new MCQDTO();
                List<Option> options = this.optionRepository.findAllByMcq_McqId(it.getMcqId());
                mcqdto
                    .setOptionOne(options.get(0).getOptionStatement())
                    .setOptionTwo(options.get(1).getOptionStatement())
                    .setOptionThree(options.get(2).getOptionStatement())
                    .setOptionFour(options.get(3).getOptionStatement())
                    .setMarks(it.getMarks())
                    .setMcqId(it.getMcqId())
                    .setQuestionString(it.getQuestion());
                mcqsList.add(mcqdto);
            });
            return quizDetailsResponseDTO.setMcqs(mcqsList);
        }
        throw new EntityNotFoundException("Quiz not found!");
    }

    @Override
    public void submitQuiz(Long studentId, Long quizId, List<QuizSubmitDTO> quizSubmitDTO) {
        Optional<Student> optionalStudent = this.studentRepository.findById(studentId);
        if (optionalStudent.isPresent()) {
            StudentAttemptQuizRecord studentAttemptQuizRecords = optionalStudent
                .get()
                .getStudentAttemptQuizRecords()
                .stream().filter(it -> it.getQuiz().getQuizId().equals(quizId))
                .findFirst().orElseThrow(RuntimeException::new);
            studentAttemptQuizRecords.setQuizAttemptStatus(QuizAttemptStatus.ATTEMPTED);
            AtomicLong marksObtained = new AtomicLong();
            quizSubmitDTO.forEach(it -> {
                List<Option> optionList = this.optionRepository.findAllByMcq_McqId(it.getMcqId());
                optionList.forEach(option -> {
                    if (it.getCorrectOptionSelected().equalsIgnoreCase("a") && option.getCorrectOption()) {
                        marksObtained.addAndGet(option.getMcq().getMarks());
                    } else if (it.getCorrectOptionSelected().equalsIgnoreCase("b") && option.getCorrectOption()) {
                        marksObtained.addAndGet(option.getMcq().getMarks());
                    } else if (it.getCorrectOptionSelected().equalsIgnoreCase("c") && option.getCorrectOption()) {
                        marksObtained.addAndGet(option.getMcq().getMarks());
                    } else if (it.getCorrectOptionSelected().equalsIgnoreCase("d") && option.getCorrectOption()) {
                        marksObtained.addAndGet(option.getMcq().getMarks());
                    }
                });
            });
            studentAttemptQuizRecords.setTotalMarksObtained(marksObtained.get());
            optionalStudent.get().updateQuizRecord(studentAttemptQuizRecords);
            this.studentRepository.save(optionalStudent.get());
            return;
        }
        throw new EntityNotFoundException("Quiz not found!");
    }

    @Override
    public Object getStudentActiveAssignments(Long studentId, Long courseId) {
        Optional<Student> optionalStudent = this.studentRepository.findById(studentId);
        Date currentDate = new Date(System.currentTimeMillis());
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            return student.
                getStudentAssignmentRecords()
                .stream()
                .filter(it -> it.getAssignment().getCourse().getCourseId().equals(courseId) &&
                    it.getAssignment().getStartTime().compareTo(currentDate) <= 0 &&
                    it.getAssignment().getEndTime().compareTo(currentDate) > 0 &&
                    it.getAssignmentStatus() == AssignmentStatus.NOT_ATTEMPTED)
                .collect(Collectors.toList());
        }
        throw new EntityNotFoundException("Student not found!");
    }

    @Override
    public void submitStudentAssignment(Long assignmentId, Long studentId, String fileUrl) {
        Optional<Student> optionalStudent = this.studentRepository.findById(studentId);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            StudentAssignmentRecord studentAssignmentRecord = student.getStudentAssignmentRecords().stream().filter(it -> it.getAssignment().getAssignmentId().equals(assignmentId)).findFirst().orElseThrow(RuntimeException::new);
            studentAssignmentRecord.setAssignmentStatus(AssignmentStatus.ATTEMPTED);
            studentAssignmentRecord.setFileUrl(fileUrl);
            student.updateAssignmentRecord(studentAssignmentRecord);
            this.studentRepository.save(student);
            return;
        }
        throw new EntityNotFoundException("Student not found!");
    }

    @Override
    public Object getAttemptedQuizMarks(Long studentId, Long courseId) {
        Optional<Student> optionalStudent = this.studentRepository.findById(studentId);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            return student.getStudentAttemptQuizRecords().stream().filter(it -> it.getQuizAttemptStatus() == QuizAttemptStatus.ATTEMPTED).collect(Collectors.toList());
        }
        throw new EntityNotFoundException("Student not found!");
    }

    @Override
    public Object getAttemptedAssignmentDetails(Long studentId, Long courseId) {
        Optional<Student> optionalStudent = this.studentRepository.findById(studentId);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            return student.getStudentAssignmentRecords().stream().filter(it -> it.getAssignmentStatus() == AssignmentStatus.ATTEMPTED).collect(Collectors.toList());
        }
        throw new EntityNotFoundException("Student not found!");
    }
}
