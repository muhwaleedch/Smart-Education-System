package com.fyp.studentportal.dto.quiz;

import java.util.List;

public class QuizDetailsResponseDTO {
    private Long quizId;
    private List<MCQDTO> mcqs;

    public QuizDetailsResponseDTO() {
    }

    public QuizDetailsResponseDTO(Long quizId, List<MCQDTO> mcqs) {
        this.quizId = quizId;
        this.mcqs = mcqs;
    }

    public Long getQuizId() {
        return quizId;
    }

    public QuizDetailsResponseDTO setQuizId(Long quizId) {
        this.quizId = quizId;
        return this;
    }

    public List<MCQDTO> getMcqs() {
        return mcqs;
    }

    public QuizDetailsResponseDTO setMcqs(List<MCQDTO> mcqs) {
        this.mcqs = mcqs;
        return this;
    }

    @Override
    public String toString() {
        return "QuizDetailsResponseDTO{" +
            "quizId=" + quizId +
            ", mcqs=" + mcqs +
            '}';
    }
}
