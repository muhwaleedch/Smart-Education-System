package com.fyp.studentportal.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fyp.studentportal.enums.Semester;

import javax.persistence.*;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long courseId;

    private String courseName;
    private String courseCode;
    private Integer creditHours;
    private String courseDescription;
    private String cdfURL;

    @Enumerated(EnumType.STRING)
    private Semester semesterNumber;

    @OneToOne
    private Department department;

    @ManyToMany(mappedBy = "coursesAllocatedToTeacher")
    @JsonIgnore
    private Set<Teacher> teachersTeachingCourses;

    @OneToMany(cascade = {CascadeType.ALL})
    private Set<CourseContent> courseContents = new java.util.LinkedHashSet<>();

    @ManyToMany
    @JsonIgnore
    private Set<Student> students = new LinkedHashSet<>();

    public Course() {
    }

    public Course(
        Long courseId,
        String courseName,
        String courseCode,
        Integer creditHours,
        String courseDescription,
        Semester semesterNumber,
        Department department,
        Set<Teacher> teachersTeachingCourses,
        Set<CourseContent> courseContents,
        String cdfURL
    ) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.creditHours = creditHours;
        this.courseDescription = courseDescription;
        this.semesterNumber = semesterNumber;
        this.department = department;
        this.teachersTeachingCourses = teachersTeachingCourses;
        this.courseContents = courseContents;
        this.cdfURL = cdfURL;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public Integer getCreditHours() {
        return creditHours;
    }

    public void setCreditHours(Integer creditHours) {
        this.creditHours = creditHours;
    }

    public Semester getSemesterNumber() {
        return semesterNumber;
    }

    public void setSemesterNumber(Semester semesterNumber) {
        this.semesterNumber = semesterNumber;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public Set<Teacher> getTeachersTeachingCourses() {
        return teachersTeachingCourses;
    }

    public void setTeachersTeachingCourses(Set<Teacher> teachersTeachingCourses) {
        this.teachersTeachingCourses = teachersTeachingCourses;
    }

    public Set<CourseContent> getCourseContents() {
        return courseContents;
    }

    public void setCourseContents(Set<CourseContent> courseContents) {
        this.courseContents = courseContents;
    }

    public void addCourseContent(CourseContent courseContent) {
        if (this.courseContents == null) {
            this.courseContents = Collections.emptySet();
        }
        this.courseContents.add(courseContent);
    }

    public String getCdfURL() {
        return cdfURL;
    }

    public Course setCdfURL(String cdfURL) {
        this.cdfURL = cdfURL;
        return this;
    }

    public Set<Student> students() {
        return students;
    }

    public Course setStudents(Set<Student> students) {
        this.students = students;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Course course = (Course) o;

        return Objects.equals(courseId, course.courseId);
    }

    @Override
    public int hashCode() {
        return courseId != null ? courseId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Course{" +
            "courseId=" + courseId +
            ", courseName='" + courseName + '\'' +
            ", courseCode='" + courseCode + '\'' +
            ", creditHours='" + creditHours + '\'' +
            ", semesterNumber=" + semesterNumber +
            ", department=" + department +
            ", courseContents=" + courseContents +
            ", cdfURL=" + cdfURL +
            '}';
    }
}
