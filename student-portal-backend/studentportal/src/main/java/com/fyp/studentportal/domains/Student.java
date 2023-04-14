package com.fyp.studentportal.domains;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fyp.studentportal.enums.AssignmentStatus;
import com.fyp.studentportal.enums.Semester;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long studentId;

    @Column(unique = true)
    private String registrationNumber;

    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String emailAddress;

    private String phoneNumber;
    private String password;

    @Enumerated(EnumType.STRING)
    private Semester semesterNumber;

    @OneToOne
    @JoinColumn(name = "department_id", referencedColumnName = "department_id", nullable = false)
    @JsonProperty("department")
    private Department department;

    @ManyToMany
    private Set<Course> registeredCourses = new LinkedHashSet<>();

    @OneToMany(cascade = {CascadeType.ALL})
    private Set<StudentAttemptQuizRecord> studentAttemptQuizRecords = new LinkedHashSet<>();

    @OneToMany(cascade = {CascadeType.ALL})
    private Set<StudentAssignmentRecord> studentAssignmentRecords = new LinkedHashSet<>();


    public Student() {
    }

    public Student(Long studentId, String registrationNumber, String firstName, String lastName, String emailAddress, String phoneNumber, String password, Semester semesterNumber, Department department, Set<Course> registeredCourses, Set<StudentAttemptQuizRecord> studentAttemptQuizRecords, Set<StudentAssignmentRecord> studentAssignmentRecords) {
        this.studentId = studentId;
        this.registrationNumber = registrationNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.semesterNumber = semesterNumber;
        this.department = department;
        this.registeredCourses = registeredCourses;
        this.studentAttemptQuizRecords = studentAttemptQuizRecords;
        this.studentAssignmentRecords = studentAssignmentRecords;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
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

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Set<Course> registeredCourses() {
        return registeredCourses;
    }

    public Student setRegisteredCourses(Set<Course> registeredCourses) {
        this.registeredCourses = registeredCourses;
        return this;
    }

    public Semester getSemesterNumber() {
        return semesterNumber;
    }

    public Student setSemesterNumber(Semester semesterNumber) {
        this.semesterNumber = semesterNumber;
        return this;
    }

    public Set<Course> getRegisteredCourses() {
        return registeredCourses;
    }

    public Set<StudentAttemptQuizRecord> getStudentAttemptQuizRecords() {
        return studentAttemptQuizRecords;
    }

    public Student setStudentAttemptQuizRecords(Set<StudentAttemptQuizRecord> studentAttemptQuizRecords) {
        this.studentAttemptQuizRecords = studentAttemptQuizRecords;
        return this;
    }

    public Student addAttemptedQuizRecord(StudentAttemptQuizRecord attemptQuizRecord) {
        if (this.studentAttemptQuizRecords == null) {
            this.studentAttemptQuizRecords = new LinkedHashSet<>();
        }
        try {
            int count = (int) this.studentAttemptQuizRecords.stream().filter(it -> it.getQuiz().getQuizId().equals(attemptQuizRecord.getQuiz().getQuizId())).count();
            if (count == 0) {
                this.studentAttemptQuizRecords.add(attemptQuizRecord);
            }
        } catch (Exception e) {
            System.out.println("Exception Occurred: " + e.getMessage());
        }
        return this;
    }

    /**
     * Adding quiz records for initial values
     *
     * @param attemptQuizRecords
     * @return this
     */
    public Student addAttemptedQuizRecord(Set<StudentAttemptQuizRecord> attemptQuizRecords) {
        attemptQuizRecords.forEach(this::addAttemptedQuizRecord);
        return this;
    }

    public Set<StudentAssignmentRecord> getStudentAssignmentRecords() {
        return studentAssignmentRecords;
    }

    public Student setStudentAssignmentRecords(Set<StudentAssignmentRecord> studentAssignmentRecords) {
        this.studentAssignmentRecords = studentAssignmentRecords;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Student student = (Student) o;

        if (!Objects.equals(studentId, student.studentId)) return false;
        if (!Objects.equals(registrationNumber, student.registrationNumber))
            return false;
        if (!Objects.equals(emailAddress, student.emailAddress))
            return false;
        return Objects.equals(phoneNumber, student.phoneNumber);
    }

    @Override
    public int hashCode() {
        int result = studentId != null ? studentId.hashCode() : 0;
        result = 31 * result + (registrationNumber != null ? registrationNumber.hashCode() : 0);
        result = 31 * result + (emailAddress != null ? emailAddress.hashCode() : 0);
        result = 31 * result + (phoneNumber != null ? phoneNumber.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Student{" +
            "studentId=" + studentId +
            ", registrationNumber='" + registrationNumber + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", emailAddress='" + emailAddress + '\'' +
            ", phoneNumber='" + phoneNumber + '\'' +
            ", password='" + password + '\'' +
            ", department=" + department +
            '}';
    }

    public Student updateQuizRecord(StudentAttemptQuizRecord studentAttemptQuizRecord) {
        this.studentAttemptQuizRecords.forEach(it -> {
            if (it.getStudentAttemptedQuizRecordId().equals(studentAttemptQuizRecord.getStudentAttemptedQuizRecordId())) {
                it.setQuizAttemptStatus(studentAttemptQuizRecord.getQuizAttemptStatus());
                it.setTotalMarksObtained(studentAttemptQuizRecord.getTotalMarksObtained());
            }
        });
        return this;
    }

    public Student addAssignmentRecord(StudentAssignmentRecord studentAssignmentRecord) {
        if (this.studentAssignmentRecords == null) {
            this.studentAssignmentRecords = new LinkedHashSet<>();
        }
        this.studentAssignmentRecords.add(studentAssignmentRecord);
        return this;
    }

    public Student updateAssignmentRecord(StudentAssignmentRecord studentAssignmentRecord) {
        this.studentAssignmentRecords.forEach(it -> {
            if(it.getStudentAssignmentRecordId().equals(studentAssignmentRecord.getStudentAssignmentRecordId())) {
                it.setAssignmentStatus(studentAssignmentRecord.getAssignmentStatus());
                it.setFileUrl(studentAssignmentRecord.getFileUrl());
            }
        });
        return this;
    }
}
