package com.fyp.studentportal.domains.questions;

import com.fyp.studentportal.enums.QuestionType;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "textual_question")
public class TextualQuestion extends BaseQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "textual_question_id")
    private Long textualQuestionId;

    private Long questionMarks;

    public TextualQuestion() {
    }

    public TextualQuestion(Long textualQuestionId) {
        this.textualQuestionId = textualQuestionId;
    }

    public TextualQuestion(Integer marks, String question, QuestionType questionType, Long textualQuestionId) {
        super(marks, question, questionType);
        this.textualQuestionId = textualQuestionId;
    }

    public TextualQuestion(Long textualQuestionId, Long questionMarks) {
        this.textualQuestionId = textualQuestionId;
        this.questionMarks = questionMarks;
    }

    public TextualQuestion(Integer marks, String question, QuestionType questionType, Long textualQuestionId, Long questionMarks) {
        super(marks, question, questionType);
        this.textualQuestionId = textualQuestionId;
        this.questionMarks = questionMarks;
    }

    public Long getQuestionMarks() {
        return questionMarks;
    }

    public TextualQuestion setQuestionMarks(Long questionMarks) {
        this.questionMarks = questionMarks;
        return this;
    }

    public Long getTextualQuestionId() {
        return textualQuestionId;
    }

    public TextualQuestion setTextualQuestionId(Long textualQuestionId) {
        this.textualQuestionId = textualQuestionId;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TextualQuestion that = (TextualQuestion) o;

        return Objects.equals(textualQuestionId, that.textualQuestionId);
    }

    @Override
    public int hashCode() {
        return textualQuestionId != null ? textualQuestionId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "TextualQuestion{" +
            "textualQuestionId=" + textualQuestionId +
            '}';
    }
}
