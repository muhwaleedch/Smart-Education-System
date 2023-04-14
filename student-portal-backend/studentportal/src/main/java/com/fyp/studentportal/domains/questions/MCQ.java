package com.fyp.studentportal.domains.questions;

import com.fyp.studentportal.domains.CourseContent;
import com.fyp.studentportal.enums.QuestionType;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "mcq")
public class MCQ extends BaseQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "mcq_id")
    private Long mcqId;

    public MCQ() {
    }

    public MCQ(Long mcqId) {
        this.mcqId = mcqId;
    }

    public MCQ(Integer marks, String question, CourseContent courseContent, Long mcqId, List<Option> options, QuestionType questionType) {
        super(marks, question, questionType);
        this.mcqId = mcqId;
    }

    public Long getMcqId() {
        return mcqId;
    }

    public void setMcqId(Long mcqId) {
        this.mcqId = mcqId;
    }

    @Override
    public String toString() {
        return "MCQ{" +
            "mcqId=" + mcqId +
            '}';
    }
}
