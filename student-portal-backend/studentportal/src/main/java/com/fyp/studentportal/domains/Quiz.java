package com.fyp.studentportal.domains;

import com.fyp.studentportal.domains.questions.MCQ;

import javax.persistence.*;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "quiz")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "quiz_id")
    private Long quizId;

    private String sheetName;
    private String syllabus;
    private Date startTime;
    private Date endTime;
    private Long totalQuizMarks;

    @OneToMany
    private Set<MCQ> allMcqs = new LinkedHashSet<>();

    @OneToOne
    private Course course;

    public Quiz() {
    }

    public Quiz(Long quizId, String sheetName, String syllabus, Date startTime, Date endTime, Long totalQuizMarks, Set<MCQ> allMcqs, Course course) {
        this.quizId = quizId;
        this.sheetName = sheetName;
        this.syllabus = syllabus;
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalQuizMarks = totalQuizMarks;
        this.allMcqs = allMcqs;
        this.course = course;
    }

    public Long getQuizId() {
        return quizId;
    }

    public Quiz setQuizId(Long quizId) {
        this.quizId = quizId;
        return this;
    }

    public Set<MCQ> getAllMcqs() {
        return allMcqs;
    }

    public Quiz setAllMcqs(Set<MCQ> allMcqs) {
        this.allMcqs = allMcqs;
        return this;
    }

    public String getSheetName() {
        return sheetName;
    }

    public Quiz setSheetName(String sheetName) {
        this.sheetName = sheetName;
        return this;
    }

    public String getSyllabus() {
        return syllabus;
    }

    public Quiz setSyllabus(String syllabus) {
        this.syllabus = syllabus;
        return this;
    }

    public Course getCourse() {
        return course;
    }

    public Quiz setCourse(Course course) {
        this.course = course;
        return this;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Quiz setStartTime(Date startTime) {
        this.startTime = startTime;
        return this;
    }

    public Date getEndTime() {
        return endTime;
    }

    public Quiz setEndTime(Date endTime) {
        this.endTime = endTime;
        return this;
    }

    public Long getTotalQuizMarks() {
        return totalQuizMarks;
    }

    public Quiz setTotalQuizMarks(Long totalQuizMarks) {
        this.totalQuizMarks = totalQuizMarks;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Quiz quiz = (Quiz) o;

        return Objects.equals(quizId, quiz.quizId);
    }

    @Override
    public int hashCode() {
        return quizId != null ? quizId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Quiz{" +
            "quizId=" + quizId +
            ", sheetName='" + sheetName + '\'' +
            ", syllabus='" + syllabus + '\'' +
            ", allMcqs=" + allMcqs +
            ", course=" + course +
            '}';
    }
}
