package com.fyp.studentportal.services;

import com.fyp.studentportal.domains.questions.BaseQuestion;
import com.fyp.studentportal.dto.AssignmentCreationDTO;
import com.fyp.studentportal.dto.QuizCreationDTO;

import java.util.List;

public interface IQuestionService {
    BaseQuestion saveQuestion(BaseQuestion baseQuestion);

    Object createQuiz(List<QuizCreationDTO> quizCreationDTO, String syllabus, String sheetName, Long courseId);
    Object createAssignment(List<AssignmentCreationDTO> textualQuestionList, String sheetName, String syllabus, String fileUrl, Long courseId, String startTime, String endTime);
}
