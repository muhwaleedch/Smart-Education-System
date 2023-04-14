package com.fyp.studentportal.dto;

import com.fyp.studentportal.enums.Roles;

public class EmailPasswordDTO {
    private String emailAddress;
    private String password;
    private Roles role;

    public EmailPasswordDTO() {
    }

    public EmailPasswordDTO(String emailAddress, String password, Roles role) {
        this.emailAddress = emailAddress;
        this.password = password;
        this.role = role;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "EmailPasswordDTO{" +
            "emailAddress='" + emailAddress + '\'' +
            ", password='" + password + '\'' +
            ", role='" + role + '\'' +
            '}';
    }
}
