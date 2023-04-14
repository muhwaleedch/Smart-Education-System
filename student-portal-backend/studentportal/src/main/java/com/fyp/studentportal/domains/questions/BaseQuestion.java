package com.fyp.studentportal.domains.questions;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fyp.studentportal.domains.BaseEntity;
import com.fyp.studentportal.enums.QuestionType;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = MCQ.class, name = "mcq"),
    @JsonSubTypes.Type(value = TrueFalse.class, name = "trueFalse")
})
public class BaseQuestion extends BaseEntity {
    private Integer marks;
    private String question;

    @Enumerated(EnumType.STRING)
    private QuestionType questionType;

    public BaseQuestion() {
    }

    public BaseQuestion(Integer marks, String question, QuestionType questionType) {
        this.marks = marks;
        this.question = question;
        this.questionType = questionType;
    }

    public Integer getMarks() {
        return marks;
    }

    public void setMarks(Integer marks) {
        this.marks = marks;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public QuestionType getQuestionType() {
        return questionType;
    }

    public void setQuestionType(QuestionType questionType) {
        this.questionType = questionType;
    }

    @Override
    public String toString() {
        return "BaseQuestion{" +
            "marks=" + marks +
            ", question='" + question + '\'' +
            ", questionType=" + questionType +
            '}';
    }
}
