package com.fyp.studentportal.dto;

public class TeacherCourseDTO {
    private Long courseId;
    private Long teacherId;
    private Long departmentId;

    public TeacherCourseDTO() {
    }

    public TeacherCourseDTO(Long courseId, Long teacherId, Long departmentId) {
        this.courseId = courseId;
        this.teacherId = teacherId;
        this.departmentId = departmentId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    @Override
    public String toString() {
        return "TeacherCourseDTO{" +
            "courseId=" + courseId +
            ", teacherId=" + teacherId +
            ", departmentId=" + departmentId +
            '}';
    }
}
