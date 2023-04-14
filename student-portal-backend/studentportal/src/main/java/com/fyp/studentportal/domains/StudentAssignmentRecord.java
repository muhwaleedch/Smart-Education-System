package com.fyp.studentportal.domains;

import com.fyp.studentportal.enums.AssignmentStatus;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "student_assignment_record")
public class StudentAssignmentRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long studentAssignmentRecordId;

    @OneToOne
    private Assignment assignment;

    private Long totalMarksObtained;

    @Enumerated(EnumType.STRING)
    private AssignmentStatus assignmentStatus;

    private String fileUrl;

    public StudentAssignmentRecord() {
    }

    public StudentAssignmentRecord(Long studentAssignmentRecordId, Assignment assignment, Long totalMarksObtained, AssignmentStatus assignmentStatus, String fileUrl) {
        this.studentAssignmentRecordId = studentAssignmentRecordId;
        this.assignment = assignment;
        this.totalMarksObtained = totalMarksObtained;
        this.assignmentStatus = assignmentStatus;
        this.fileUrl = fileUrl;
    }

    public Long getStudentAssignmentRecordId() {
        return studentAssignmentRecordId;
    }

    public StudentAssignmentRecord setStudentAssignmentRecordId(Long studentAssignmentRecordId) {
        this.studentAssignmentRecordId = studentAssignmentRecordId;
        return this;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public StudentAssignmentRecord setAssignment(Assignment assignment) {
        this.assignment = assignment;
        return this;
    }

    public Long getTotalMarksObtained() {
        return totalMarksObtained;
    }

    public StudentAssignmentRecord setTotalMarksObtained(Long totalMarksObtained) {
        this.totalMarksObtained = totalMarksObtained;
        return this;
    }

    public AssignmentStatus getAssignmentStatus() {
        return assignmentStatus;
    }

    public StudentAssignmentRecord setAssignmentStatus(AssignmentStatus assignmentStatus) {
        this.assignmentStatus = assignmentStatus;
        return this;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public StudentAssignmentRecord setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        StudentAssignmentRecord that = (StudentAssignmentRecord) o;

        return Objects.equals(studentAssignmentRecordId, that.studentAssignmentRecordId);
    }

    @Override
    public int hashCode() {
        return studentAssignmentRecordId != null ? studentAssignmentRecordId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "StudentAssignmentRecord{" +
            "studentAssignmentRecordId=" + studentAssignmentRecordId +
            ", assignment=" + assignment +
            ", totalMarksObtained=" + totalMarksObtained +
            ", assignmentStatus=" + assignmentStatus +
            '}';
    }
}
