package com.fyp.studentportal.dto;

import com.fyp.studentportal.domains.StudentAttemptQuizRecord;

import java.util.List;

public class CustomDTO<T> {
    private List<T> records;
    private String studentName;

    public CustomDTO() {
    }

    public CustomDTO(List<T> records, String studentName) {
        this.records = records;
        this.studentName = studentName;
    }

    public List<T> getRecords() {
        return records;
    }

    public CustomDTO<T> setRecords(List<T> records) {
        this.records = records;
        return this;
    }

    public String getStudentName() {
        return studentName;
    }

    public CustomDTO<T> setStudentName(String studentName) {
        this.studentName = studentName;
        return this;
    }

    @Override
    public String toString() {
        return "CustomDTO{" +
            "records=" + records +
            ", studentName='" + studentName + '\'' +
            '}';
    }
}


