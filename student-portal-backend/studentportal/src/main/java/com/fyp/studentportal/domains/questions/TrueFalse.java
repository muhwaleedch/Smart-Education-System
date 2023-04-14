package com.fyp.studentportal.domains.questions;

import com.fyp.studentportal.domains.CourseContent;
import com.fyp.studentportal.enums.QuestionType;

import javax.persistence.*;

@Entity
@Table(name = "true_false")
public class TrueFalse extends BaseQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "true_false_id")
    private Long trueFalseId;

    private Boolean isAnswerTrue;

    public TrueFalse() {
    }

    public TrueFalse(Long trueFalseId, Boolean isAnswerTrue) {
        this.trueFalseId = trueFalseId;
        this.isAnswerTrue = isAnswerTrue;
    }

    public TrueFalse(Integer marks, String question, Long trueFalseId, Boolean isAnswerTrue,  QuestionType questionType) {
        super(marks, question, questionType);
        this.trueFalseId = trueFalseId;
        this.isAnswerTrue = isAnswerTrue;
    }

    public Long getTrueFalseId() {
        return trueFalseId;
    }

    public void setTrueFalseId(Long trueFalseId) {
        this.trueFalseId = trueFalseId;
    }

    public Boolean getAnswerTrue() {
        return isAnswerTrue;
    }

    public void setAnswerTrue(Boolean answerTrue) {
        isAnswerTrue = answerTrue;
    }

    @Override
    public String toString() {
        return "TrueFalse{" +
            "trueFalseId=" + trueFalseId +
            ", isAnswerTrue=" + isAnswerTrue +
            '}';
    }
}
