package com.fyp.studentportal.repositories;

import com.fyp.studentportal.domains.questions.MCQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MCQRepository extends JpaRepository<MCQ, Long> {
}
