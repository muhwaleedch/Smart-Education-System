package com.fyp.studentportal.domains;

import javax.persistence.*;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "teacher")
public class Teacher extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long teacherId;

    private String firstName;
    private String lastName;
    private String emailAddress;
    private String employeeCode;
    private String password;
    private String designation;
    private String phoneNumber;

    @OneToOne
    private Department department;

    @ManyToMany
    @JoinTable(
        name = "courses_allocated",
        joinColumns = @JoinColumn(name = "teacher_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> coursesAllocatedToTeacher;

    public Teacher() {
    }

    public Teacher(
        Long teacherId,
        String firstName,
        String lastName,
        String emailAddress,
        String employeeCode,
        String password,
        String designation,
        String phoneNumber,
        Department department,
        Set<Course> coursesAllocatedToTeacher
    ) {
        this.teacherId = teacherId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.employeeCode = employeeCode;
        this.password = password;
        this.designation = designation;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.coursesAllocatedToTeacher = coursesAllocatedToTeacher;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Set<Course> getCoursesAllocatedToTeacher() {
        return coursesAllocatedToTeacher;
    }

    public void setCoursesAllocatedToTeacher(Set<Course> coursesAllocatedToTeacher) {
        this.coursesAllocatedToTeacher = coursesAllocatedToTeacher;
    }

    public void addCourseToTeacher(Course course) {
        if (this.coursesAllocatedToTeacher == null) {
            this.coursesAllocatedToTeacher = Collections.emptySet();
        }
        this.coursesAllocatedToTeacher.add(course);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Teacher teacher = (Teacher) o;

        if (!Objects.equals(teacherId, teacher.teacherId)) return false;
        return Objects.equals(emailAddress, teacher.emailAddress);
    }

    @Override
    public int hashCode() {
        int result = teacherId != null ? teacherId.hashCode() : 0;
        result = 31 * result + (emailAddress != null ? emailAddress.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Teacher{" +
            "teacherId=" + teacherId +
            ", emailAddress='" + emailAddress + '\'' +
            ", employeeCode='" + employeeCode + '\'' +
            ", password='" + password + '\'' +
            ", designation='" + designation + '\'' +
            ", department=" + department +
            ", phoneNumber=" + phoneNumber +
            ", firstName=" + firstName +
            ", lastName=" + lastName +
            '}';
    }
}
