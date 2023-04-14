package com.fyp.studentportal.dto.quiz;

public class QuizSubmitDTO {
    private Long mcqId;
    private String correctOptionSelected;

    public QuizSubmitDTO() {
    }

    public QuizSubmitDTO(Long mcqId, String correctOptionSelected) {
        this.mcqId = mcqId;
        this.correctOptionSelected = correctOptionSelected;
    }

    public Long getMcqId() {
        return mcqId;
    }

    public QuizSubmitDTO setMcqId(Long mcqId) {
        this.mcqId = mcqId;
        return this;
    }

    public String getCorrectOptionSelected() {
        return correctOptionSelected;
    }

    public QuizSubmitDTO setCorrectOptionSelected(String correctOptionSelected) {
        this.correctOptionSelected = correctOptionSelected;
        return this;
    }

    @Override
    public String toString() {
        return "QuizSubmitDTO{" +
            "mcqId=" + mcqId +
            ", correctOptionSelected='" + correctOptionSelected + '\'' +
            '}';
    }
}
