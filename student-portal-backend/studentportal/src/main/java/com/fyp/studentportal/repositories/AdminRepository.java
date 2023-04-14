package com.fyp.studentportal.repositories;

import com.fyp.studentportal.domains.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin getAdminByEmailAddress(String emailAddress);
}
