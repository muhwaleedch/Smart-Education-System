package com.fyp.studentportal.serviceImpls;

import com.fyp.studentportal.domains.*;
import com.fyp.studentportal.dto.AssignDTO;
import com.fyp.studentportal.dto.CustomDTO;
import com.fyp.studentportal.enums.QuizAttemptStatus;
import com.fyp.studentportal.repositories.AssignmentRepository;
import com.fyp.studentportal.repositories.QuizRepository;
import com.fyp.studentportal.repositories.StudentRepository;
import com.fyp.studentportal.repositories.TeacherRepository;
import com.fyp.studentportal.services.ICourseService;
import com.fyp.studentportal.services.ITeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TeacherServiceImpl implements ITeacherService {
    private final TeacherRepository teacherRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AssignmentRepository assignmentRepository;
    private final QuizRepository quizRepository;
    private final ICourseService iCourseService;
    private final StudentRepository studentRepository;

    private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

    @Autowired
    public TeacherServiceImpl(TeacherRepository teacherRepository, BCryptPasswordEncoder bCryptPasswordEncoder, AssignmentRepository assignmentRepository, QuizRepository quizRepository, ICourseService iCourseService, StudentRepository studentRepository) {
        this.teacherRepository = teacherRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.assignmentRepository = assignmentRepository;
        this.quizRepository = quizRepository;
        this.iCourseService = iCourseService;
        this.studentRepository = studentRepository;
    }

    @Override
    public Teacher createTeacher(Teacher teacher) {
        if (null != teacher.getTeacherId() && this.teacherRepository.existsById(teacher.getTeacherId())) {
            throw new DataIntegrityViolationException("Teacher Already exists");
        }
        teacher.setPassword(this.bCryptPasswordEncoder.encode(teacher.getPassword()));
        return this.teacherRepository.save(teacher);
    }

    @Override
    public Teacher updateTeacher(Teacher teacher) {
        Optional<Teacher> existingTeacherOptional = this.teacherRepository.findById(teacher.getTeacherId());
        if (existingTeacherOptional.isPresent()) {
            if (teacher.getPassword() != null) {
                teacher.setPassword(this.bCryptPasswordEncoder.encode(teacher.getPassword()));
            } else {
                teacher.setPassword(existingTeacherOptional.get().getPassword());
            }
            if (teacher.getCoursesAllocatedToTeacher() != null && teacher.getCoursesAllocatedToTeacher().size() > 0) {
                teacher.setCoursesAllocatedToTeacher(existingTeacherOptional.get().getCoursesAllocatedToTeacher());
            }
            if (existingTeacherOptional.get().getDepartment() != null && teacher.getDepartment() == null) {
                teacher.setDepartment(existingTeacherOptional.get().getDepartment());
            }
            return this.teacherRepository.save(teacher);
        }
        throw new EntityNotFoundException("Teacher does not exists");
    }

    @Override
    public void deleteTeacher(Long teacherId) {
        this.teacherRepository.deleteById(teacherId);
    }

    @Override
    public List<Teacher> getAllTeachersByDepartment(Long departmentId) {
        return this.teacherRepository.findAllByDepartment_DepartmentId(departmentId);
    }

    @Override
    public Teacher getTeacherDetails(Long teacherId) {
        Optional<Teacher> optionalTeacher = this.teacherRepository.findById(teacherId);
        if (optionalTeacher.isPresent()) {
            return optionalTeacher.get();
        }
        throw new EntityNotFoundException("Teacher not found");
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return this.teacherRepository.findAll().stream().peek(it -> it.setPassword(null)).collect(Collectors.toList());
    }

    @Override
    public Set<Course> getTeacherCourses(Long teacherId) {
        Optional<Teacher> optionalTeacher = this.teacherRepository.findById(teacherId);
        if (optionalTeacher.isPresent()) {
            return optionalTeacher.get().getCoursesAllocatedToTeacher();
        }
        throw new EntityNotFoundException("Teacher cannot be found");
    }

    @Override
    public Object getAssignmentForCourse(Long courseId) {
        return this.assignmentRepository.findAllByCourse_CourseId(courseId);
    }

    @Override
    public Object getQuizForCourse(Long courseId) {
        return this.quizRepository.findAllByCourse_CourseId(courseId);
    }

    @Override
    public void deleteQuiz(Long quizId) {
        this.quizRepository.deleteById(quizId);
    }

    @Override
    public void deleteAssignment(Long assigmentId) {
        this.assignmentRepository.deleteById(assigmentId);
    }

    @Override
    public void assignAssignment(Long assignmentId, AssignDTO assignDTO) {
        Optional<Assignment> optionalAssignment = this.assignmentRepository.findById(assignmentId);
        if (optionalAssignment.isPresent()) {
            try {
                optionalAssignment.get().setStartTime(simpleDateFormat.parse(assignDTO.getStartDate()));
                optionalAssignment.get().setEndTime(simpleDateFormat.parse(assignDTO.getEndDate()));
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
            this.assignmentRepository.save(optionalAssignment.get());
            return;
        }
        throw new EntityNotFoundException("Assignment does not exists");
    }

    @Override
    public void assignQuiz(Long quizId, AssignDTO assignDTO) {
        Optional<Quiz> optionalQuiz = this.quizRepository.findById(quizId);
        if (optionalQuiz.isPresent()) {
            optionalQuiz.get().setStartTime(new Date(Long.parseLong(assignDTO.getStartDate())));
            optionalQuiz.get().setEndTime(new Date(Long.parseLong(assignDTO.getEndDate())));
            Quiz quiz = this.quizRepository.save(optionalQuiz.get());

            Set<Student> studentList = this.iCourseService.getRegisteredCourses(quiz.getCourse().getCourseId());
            studentList.forEach(it -> {
                StudentAttemptQuizRecord record = new StudentAttemptQuizRecord();
                record.setQuiz(quiz);
                record.setQuizAttemptStatus(QuizAttemptStatus.NOT_ATTEMPTED);
                record.setTotalMarksObtained(0L);
                this.studentRepository.save(it.addAttemptedQuizRecord(record));
            });
            return;
        }
        throw new EntityNotFoundException("Quiz does not exists");
    }

    @Override
    public Object getQuizStatuses(Long courseId, Long teacherId) {
        Course course = this.iCourseService.getCourseDetails(courseId);
        Set<Student> students = course.students();
        List<StudentAttemptQuizRecord> studentAttemptQuizRecords = new ArrayList<>();
        students.forEach(it -> {
            for (StudentAttemptQuizRecord studentAttemptQuizRecord: it.getStudentAttemptQuizRecords()) {
                if (studentAttemptQuizRecord.getQuiz().getCourse().getCourseId().equals(courseId)) {
                    studentAttemptQuizRecords.add(studentAttemptQuizRecord);
                }
            }
        });
        return studentAttemptQuizRecords;
    }

    @Override
    public Object getAssignmentStatuses(Long courseId, Long teacherId) {
        Course course = this.iCourseService.getCourseDetails(courseId);
        Set<Student> students = course.students();
        List<StudentAssignmentRecord> studentAssignmentRecordList = new ArrayList<>();
        students.forEach(it -> {
            for (StudentAssignmentRecord studentAssignmentRecord: it.getStudentAssignmentRecords()) {
                if (studentAssignmentRecord.getAssignment().getCourse().getCourseId().equals(courseId)) {
                    studentAssignmentRecordList.add(studentAssignmentRecord);
                }
            }
        });
        return studentAssignmentRecordList;
    }
}