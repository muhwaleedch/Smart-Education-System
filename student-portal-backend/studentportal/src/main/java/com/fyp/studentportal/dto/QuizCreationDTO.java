package com.fyp.studentportal.dto;

public class QuizCreationDTO {
    private String question;
    private String correctOption;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private Integer marks;

    public QuizCreationDTO() {
    }

    public QuizCreationDTO(String question, String correctOption, String option1, String option2, String option3, String option4) {
        this.question = question;
        this.correctOption = correctOption;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
    }

    public QuizCreationDTO(String question, String correctOption, String option1, String option2, String option3, String option4, Integer marks) {
        this.question = question;
        this.correctOption = correctOption;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.marks = marks;
    }

    public String getQuestion() {
        return question;
    }

    public QuizCreationDTO setQuestion(String question) {
        this.question = question;
        return this;
    }

    public String getCorrectOption() {
        return correctOption;
    }

    public QuizCreationDTO setCorrectOption(String correctOption) {
        this.correctOption = correctOption;
        return this;
    }

    public String getOption1() {
        return option1;
    }

    public QuizCreationDTO setOption1(String option1) {
        this.option1 = option1;
        return this;
    }

    public String getOption2() {
        return option2;
    }

    public QuizCreationDTO setOption2(String option2) {
        this.option2 = option2;
        return this;
    }

    public String getOption3() {
        return option3;
    }

    public QuizCreationDTO setOption3(String option3) {
        this.option3 = option3;
        return this;
    }

    public String getOption4() {
        return option4;
    }

    public QuizCreationDTO setOption4(String option4) {
        this.option4 = option4;
        return this;
    }


    public Integer getMarks() {
        return marks;
    }

    public QuizCreationDTO setMarks(Integer marks) {
        this.marks = marks;
        return this;
    }

    @Override
    public String toString() {
        return "QuizCreationDTO{" +
            "question='" + question + '\'' +
            ", correctOption='" + correctOption + '\'' +
            ", option1='" + option1 + '\'' +
            ", option2='" + option2 + '\'' +
            ", option3='" + option3 + '\'' +
            ", option4='" + option4 + '\'' +
            ", marks=" + marks +
            '}';
    }
}
