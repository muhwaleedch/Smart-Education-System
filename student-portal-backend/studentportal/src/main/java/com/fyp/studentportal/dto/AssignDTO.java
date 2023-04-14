package com.fyp.studentportal.dto;

public class AssignDTO {
    private String startDate;
    private String endDate;

    public AssignDTO() {
    }

    public AssignDTO(String startDate, String endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getStartDate() {
        return startDate;
    }

    public AssignDTO setStartDate(String startDate) {
        this.startDate = startDate;
        return this;
    }

    public String getEndDate() {
        return endDate;
    }

    public AssignDTO setEndDate(String endDate) {
        this.endDate = endDate;
        return this;
    }

    @Override
    public String toString() {
        return "AssignDTO{" +
            "startDate=" + startDate +
            ", endDate=" + endDate +
            '}';
    }
}
