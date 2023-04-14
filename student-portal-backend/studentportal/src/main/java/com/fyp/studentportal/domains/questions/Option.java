package com.fyp.studentportal.domains.questions;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "mcq_options")
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "mcq_option_id")
    private Long mcqOptionId;

    private String optionStatement;

    @JsonIgnore
    private Boolean isCorrectOption;

    @ManyToOne(fetch = FetchType.LAZY)
    private MCQ mcq;

    public Option() {
    }

    public Option(Long mcqOptionId, String optionStatement, Boolean isCorrectOption) {
        this.mcqOptionId = mcqOptionId;
        this.optionStatement = optionStatement;
        this.isCorrectOption = isCorrectOption;
    }

    public Option(Long mcqOptionId, String optionStatement, Boolean isCorrectOption, MCQ mcq) {
        this.mcqOptionId = mcqOptionId;
        this.optionStatement = optionStatement;
        this.isCorrectOption = isCorrectOption;
        this.mcq = mcq;
    }

    public Long getMcqOptionId() {
        return mcqOptionId;
    }

    public void setMcqOptionId(Long mcqOptionId) {
        this.mcqOptionId = mcqOptionId;
    }

    public String getOptionStatement() {
        return optionStatement;
    }

    public void setOptionStatement(String optionStatement) {
        this.optionStatement = optionStatement;
    }

    public Boolean getCorrectOption() {
        return isCorrectOption;
    }

    public void setCorrectOption(Boolean correctOption) {
        isCorrectOption = correctOption;
    }

    public MCQ getMcq() {
        return mcq;
    }

    public Option setMcq(MCQ mcq) {
        this.mcq = mcq;
        return this;
    }

    @Override
    public String toString() {
        return "Option{" +
            "mcqOptionId=" + mcqOptionId +
            ", optionStatement='" + optionStatement + '\'' +
            ", isCorrectOption='" + isCorrectOption + '\'' +
            '}';
    }
}
