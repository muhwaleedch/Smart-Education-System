package com.fyp.studentportal.dto;

public class AssignmentCreationDTO {
    private Long questionMarks;
    private String question;

    public AssignmentCreationDTO() {
    }

    public AssignmentCreationDTO(Long questionMarks, String question) {
        this.questionMarks = questionMarks;
        this.question = question;
    }

    public Long getQuestionMarks() {
        return questionMarks;
    }

    public AssignmentCreationDTO setQuestionMarks(Long questionMarks) {
        this.questionMarks = questionMarks;
        return this;
    }

    public String getQuestion() {
        return question;
    }

    public AssignmentCreationDTO setQuestion(String question) {
        this.question = question;
        return this;
    }

    @Override
    public String toString() {
        return "AssignmentCreationDTO{" +
            "questionMarks=" + questionMarks +
            ", question='" + question + '\'' +
            '}';
    }
}
