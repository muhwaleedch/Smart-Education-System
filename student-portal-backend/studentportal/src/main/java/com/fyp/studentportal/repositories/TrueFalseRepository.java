package com.fyp.studentportal.repositories;

import com.fyp.studentportal.domains.questions.TrueFalse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrueFalseRepository extends JpaRepository<TrueFalse, Long> {
}
