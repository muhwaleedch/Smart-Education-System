package com.fyp.studentportal.domains;

import com.fyp.studentportal.enums.QuizAttemptStatus;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "student_attempted_quiz_record")
public class StudentAttemptQuizRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long studentAttemptedQuizRecordId;

    @OneToOne
    private Quiz quiz;

    private Long totalMarksObtained;

    @Enumerated(EnumType.STRING)
    private QuizAttemptStatus quizAttemptStatus;

    public StudentAttemptQuizRecord() {
    }

    public StudentAttemptQuizRecord(Long studentAttemptedQuizRecordId, Quiz quiz, Long totalMarksObtained, QuizAttemptStatus quizAttemptStatus) {
        this.studentAttemptedQuizRecordId = studentAttemptedQuizRecordId;
        this.quiz = quiz;
        this.totalMarksObtained = totalMarksObtained;
        this.quizAttemptStatus = quizAttemptStatus;
    }

    public Long getStudentAttemptedQuizRecordId() {
        return studentAttemptedQuizRecordId;
    }

    public StudentAttemptQuizRecord setStudentAttemptedQuizRecordId(Long studentAttemptedQuizRecordId) {
        this.studentAttemptedQuizRecordId = studentAttemptedQuizRecordId;
        return this;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public StudentAttemptQuizRecord setQuiz(Quiz quiz) {
        this.quiz = quiz;
        return this;
    }

    public Long getTotalMarksObtained() {
        return totalMarksObtained;
    }

    public StudentAttemptQuizRecord setTotalMarksObtained(Long totalMarksObtained) {
        this.totalMarksObtained = totalMarksObtained;
        return this;
    }

    public QuizAttemptStatus getQuizAttemptStatus() {
        return quizAttemptStatus;
    }

    public StudentAttemptQuizRecord setQuizAttemptStatus(QuizAttemptStatus quizAttemptStatus) {
        this.quizAttemptStatus = quizAttemptStatus;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        StudentAttemptQuizRecord that = (StudentAttemptQuizRecord) o;

        return Objects.equals(studentAttemptedQuizRecordId, that.studentAttemptedQuizRecordId);
    }

    @Override
    public int hashCode() {
        return studentAttemptedQuizRecordId != null ? studentAttemptedQuizRecordId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "StudentAttemptQuizRecord{" +
            "studentAttemptedQuizRecordId=" + studentAttemptedQuizRecordId +
            ", quiz=" + quiz +
            ", totalMarksObtained=" + totalMarksObtained +
            '}';
    }
}
