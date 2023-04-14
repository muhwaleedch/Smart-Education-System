package com.fyp.studentportal.domains;

import com.fyp.studentportal.domains.questions.TextualQuestion;

import javax.persistence.*;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "assignment")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "assignment_id")
    private Long assignmentId;

    private String sheetName;
    private String syllabus;
    private String fileUrl;
    private Date startTime;
    private Date endTime;

    @OneToMany(cascade = {CascadeType.ALL})
    private Set<TextualQuestion> textualQuestionSet = new LinkedHashSet<>();

    @OneToOne
    private Course course;

    public Assignment() {
    }

    public Assignment(Long assignmentId, String sheetName, String syllabus, String fileUrl) {
        this.assignmentId = assignmentId;
        this.sheetName = sheetName;
        this.syllabus = syllabus;
        this.fileUrl = fileUrl;
    }

    public Assignment(Long assignmentId, String sheetName, String syllabus, String fileUrl, Set<TextualQuestion> textualQuestionSet) {
        this.assignmentId = assignmentId;
        this.sheetName = sheetName;
        this.syllabus = syllabus;
        this.fileUrl = fileUrl;
        this.textualQuestionSet = textualQuestionSet;
    }

    public Assignment(Long assignmentId, String sheetName, String syllabus, String fileUrl, Set<TextualQuestion> textualQuestionSet, Course course) {
        this.assignmentId = assignmentId;
        this.sheetName = sheetName;
        this.syllabus = syllabus;
        this.fileUrl = fileUrl;
        this.textualQuestionSet = textualQuestionSet;
        this.course = course;
    }

    public Assignment(Long assignmentId, String sheetName, String syllabus, String fileUrl, Date startTime, Date endTime, Set<TextualQuestion> textualQuestionSet, Course course) {
        this.assignmentId = assignmentId;
        this.sheetName = sheetName;
        this.syllabus = syllabus;
        this.fileUrl = fileUrl;
        this.startTime = startTime;
        this.endTime = endTime;
        this.textualQuestionSet = textualQuestionSet;
        this.course = course;
    }

    public Long getAssignmentId() {
        return assignmentId;
    }

    public Assignment setAssignmentId(Long assignmentId) {
        this.assignmentId = assignmentId;
        return this;
    }

    public String getSheetName() {
        return sheetName;
    }

    public Assignment setSheetName(String sheetName) {
        this.sheetName = sheetName;
        return this;
    }

    public String getSyllabus() {
        return syllabus;
    }

    public Assignment setSyllabus(String syllabus) {
        this.syllabus = syllabus;
        return this;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public Assignment setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
        return this;
    }

    public Set<TextualQuestion> getTextualQuestionSet() {
        return textualQuestionSet;
    }

    public Assignment setTextualQuestionSet(Set<TextualQuestion> textualQuestionSet) {
        this.textualQuestionSet = textualQuestionSet;
        return this;
    }

    public Course getCourse() {
        return course;
    }

    public Assignment setCourse(Course course) {
        this.course = course;
        return this;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Assignment setStartTime(Date startTime) {
        this.startTime = startTime;
        return this;
    }

    public Date getEndTime() {
        return endTime;
    }

    public Assignment setEndTime(Date endTime) {
        this.endTime = endTime;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Assignment that = (Assignment) o;

        return Objects.equals(assignmentId, that.assignmentId);
    }

    @Override
    public int hashCode() {
        return assignmentId != null ? assignmentId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Assignment{" +
            "assignmentId=" + assignmentId +
            ", sheetName='" + sheetName + '\'' +
            ", syllabus='" + syllabus + '\'' +
            ", fileUrl='" + fileUrl + '\'' +
            '}';
    }
}
