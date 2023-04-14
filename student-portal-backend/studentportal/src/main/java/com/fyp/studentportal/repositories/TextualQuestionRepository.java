package com.fyp.studentportal.repositories;

import com.fyp.studentportal.domains.questions.TextualQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TextualQuestionRepository extends JpaRepository<TextualQuestion, Long> {
}
