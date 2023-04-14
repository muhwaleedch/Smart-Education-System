package com.fyp.studentportal.dto.quiz;

public class MCQDTO {
    private String optionOne;
    private String optionTwo;
    private String optionThree;
    private String optionFour;
    private Integer marks;
    private String questionString;
    private Long mcqId;

    public MCQDTO() {
    }

    public MCQDTO(String optionOne, String optionTwo, String optionThree, String optionFour, Integer marks, String questionString, Long mcqId) {
        this.optionOne = optionOne;
        this.optionTwo = optionTwo;
        this.optionThree = optionThree;
        this.optionFour = optionFour;
        this.marks = marks;
        this.questionString = questionString;
        this.mcqId = mcqId;
    }

    public String getOptionOne() {
        return optionOne;
    }

    public MCQDTO setOptionOne(String optionOne) {
        this.optionOne = optionOne;
        return this;
    }

    public String getOptionTwo() {
        return optionTwo;
    }

    public MCQDTO setOptionTwo(String optionTwo) {
        this.optionTwo = optionTwo;
        return this;
    }

    public String getOptionThree() {
        return optionThree;
    }

    public MCQDTO setOptionThree(String optionThree) {
        this.optionThree = optionThree;
        return this;
    }

    public String getOptionFour() {
        return optionFour;
    }

    public MCQDTO setOptionFour(String optionFour) {
        this.optionFour = optionFour;
        return this;
    }

    public Integer getMarks() {
        return marks;
    }

    public MCQDTO setMarks(Integer marks) {
        this.marks = marks;
        return this;
    }

    public String getQuestionString() {
        return questionString;
    }

    public MCQDTO setQuestionString(String questionString) {
        this.questionString = questionString;
        return this;
    }

    public Long getMcqId() {
        return mcqId;
    }

    public MCQDTO setMcqId(Long mcqId) {
        this.mcqId = mcqId;
        return this;
    }

    @Override
    public String toString() {
        return "MCQDTO{" +
            "optionOne='" + optionOne + '\'' +
            ", optionTwo='" + optionTwo + '\'' +
            ", optionThree='" + optionThree + '\'' +
            ", optionFour='" + optionFour + '\'' +
            ", marks='" + marks + '\'' +
            ", questionString='" + questionString + '\'' +
            ", mcqId='" + mcqId + '\'' +
            '}';
    }
}


