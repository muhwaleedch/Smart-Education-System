package com.fyp.studentportal.serviceImpls;

import com.fyp.studentportal.domains.Assignment;
import com.fyp.studentportal.domains.Course;
import com.fyp.studentportal.domains.Quiz;
import com.fyp.studentportal.domains.StudentAssignmentRecord;
import com.fyp.studentportal.domains.questions.*;
import com.fyp.studentportal.dto.AssignmentCreationDTO;
import com.fyp.studentportal.dto.QuizCreationDTO;
import com.fyp.studentportal.enums.AssignmentStatus;
import com.fyp.studentportal.enums.QuestionType;
import com.fyp.studentportal.repositories.*;
import com.fyp.studentportal.services.ICourseService;
import com.fyp.studentportal.services.IQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class BaseQuestionServiceImpl implements IQuestionService {
    private final TrueFalseRepository trueFalseRepository;
    private final MCQRepository mcqRepository;
    private final QuizRepository quizRepository;
    private final ICourseService iCourseService;
    private final OptionRepository optionRepository;
    private final AssignmentRepository assignmentRepository;
    private final TextualQuestionRepository textualQuestionRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public BaseQuestionServiceImpl(TrueFalseRepository trueFalseRepository, MCQRepository mcqRepository, QuizRepository quizRepository, ICourseService iCourseService, OptionRepository optionRepository, AssignmentRepository assignmentRepository, TextualQuestionRepository textualQuestionRepository, StudentRepository studentRepository) {
        this.trueFalseRepository = trueFalseRepository;
        this.mcqRepository = mcqRepository;
        this.quizRepository = quizRepository;
        this.iCourseService = iCourseService;
        this.optionRepository = optionRepository;
        this.assignmentRepository = assignmentRepository;
        this.textualQuestionRepository = textualQuestionRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public BaseQuestion saveQuestion(BaseQuestion baseQuestion) {
        if (baseQuestion instanceof MCQ) {
            return this.mcqRepository.save((MCQ) baseQuestion);
        } else if (baseQuestion instanceof TrueFalse) {
            return this.trueFalseRepository.save((TrueFalse) baseQuestion);
        }
        throw new RuntimeException("Invalid Object Received");
    }

    @Override
    public Object createQuiz(List<QuizCreationDTO> quizCreationDTOList, String syllabus, String sheetName, Long courseId) {
        Quiz quiz = new Quiz();
        quiz.setSheetName(sheetName);
        quiz.setSyllabus(syllabus);

        quiz.setCourse(this.iCourseService.getCourseDetails(courseId));
        Quiz savedQuiz = this.quizRepository.save(quiz);
        AtomicLong totalQuizMarks = new AtomicLong();

        Set<MCQ> createdListOfMcq = new LinkedHashSet<>();
        quizCreationDTOList.forEach(quizCreationDTO -> {
            MCQ mcq = new MCQ();
            mcq.setQuestion(quizCreationDTO.getQuestion());
            mcq.setQuestionType(QuestionType.MCQs);
            mcq.setMarks(quizCreationDTO.getMarks());

            MCQ savedMcq = mcqRepository.save(mcq);
            List<Option> options = new ArrayList<>();

            Option option1 = new Option();
            option1.setCorrectOption(quizCreationDTO.getCorrectOption().equals("a"));
            option1.setOptionStatement(quizCreationDTO.getOption1());
            option1.setMcq(savedMcq);
            options.add(this.optionRepository.save(option1));

            Option option2 = new Option();
            option2.setCorrectOption(quizCreationDTO.getCorrectOption().equals("b"));
            option2.setOptionStatement(quizCreationDTO.getOption2());
            option2.setMcq(savedMcq);
            options.add(this.optionRepository.save(option2));

            Option option3 = new Option();
            option3.setCorrectOption(quizCreationDTO.getCorrectOption().equals("c"));
            option3.setOptionStatement(quizCreationDTO.getOption3());
            option3.setMcq(savedMcq);
            options.add(this.optionRepository.save(option3));

            Option option4 = new Option();
            option4.setCorrectOption(quizCreationDTO.getCorrectOption().equals("d"));
            option4.setOptionStatement(quizCreationDTO.getOption4());
            option4.setMcq(savedMcq);
            options.add(this.optionRepository.save(option4));

            totalQuizMarks.addAndGet(quizCreationDTO.getMarks());

            createdListOfMcq.add(this.mcqRepository.save(savedMcq));
        });
        savedQuiz.setAllMcqs(createdListOfMcq);
        savedQuiz.setTotalQuizMarks(totalQuizMarks.get());
        return this.quizRepository.save(savedQuiz);
    }

    @Override
    public Object createAssignment(List<AssignmentCreationDTO> textualQuestionList, String sheetName, String syllabus, String fileUrl, Long courseId, String startTime, String endTime) {
        Course course = this.iCourseService.getCourseDetails(courseId);
        Assignment assignment = new Assignment();
        assignment.setSyllabus(syllabus)
            .setCourse(this.iCourseService.getCourseDetails(courseId))
            .setSheetName(sheetName)
            .setFileUrl(fileUrl)
            .setStartTime(new Date(Long.parseLong(startTime)))
            .setEndTime(new Date(Long.parseLong(endTime)));
        Assignment savedAssignment = this.assignmentRepository.save(assignment);
        if (textualQuestionList != null) {
            Set<TextualQuestion> textualQuestionSet = new LinkedHashSet<>();
            textualQuestionList.forEach(it -> {
                TextualQuestion textualQuestion = new TextualQuestion();
                textualQuestion.setQuestion(it.getQuestion());
                textualQuestion.setMarks(Math.toIntExact(it.getQuestionMarks()));
                textualQuestion.setQuestionMarks(it.getQuestionMarks());
                textualQuestionSet.add(this.textualQuestionRepository.save(textualQuestion));
            });
            savedAssignment.setTextualQuestionSet(textualQuestionSet);
        }
        course.students().forEach(it -> {
            StudentAssignmentRecord studentAssignmentRecord =  new StudentAssignmentRecord();
            studentAssignmentRecord.setAssignment(savedAssignment);
            studentAssignmentRecord.setTotalMarksObtained(0L);
            studentAssignmentRecord.setAssignmentStatus(AssignmentStatus.NOT_ATTEMPTED);
            it.addAssignmentRecord(studentAssignmentRecord);
            this.studentRepository.save(it);
        });
        return this.assignmentRepository.save(savedAssignment);
    }
}

