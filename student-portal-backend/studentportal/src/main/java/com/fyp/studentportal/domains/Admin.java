package com.fyp.studentportal.domains;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "admin")
public class Admin extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long adminId;

    private String emailAddress;
    private String password;

    public Admin() {
    }

    public Admin(Long adminId, String emailAddress, String password) {
        this.adminId = adminId;
        this.emailAddress = emailAddress;
        this.password = password;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Admin admin = (Admin) o;

        if (!Objects.equals(adminId, admin.adminId)) return false;
        return Objects.equals(emailAddress, admin.emailAddress);
    }

    @Override
    public int hashCode() {
        int result = adminId != null ? adminId.hashCode() : 0;
        result = 31 * result + (emailAddress != null ? emailAddress.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Admin{" +
            "adminId=" + adminId +
            ", emailAddress='" + emailAddress + '\'' +
            ", password='" + password + '\'' +
            '}';
    }
}
