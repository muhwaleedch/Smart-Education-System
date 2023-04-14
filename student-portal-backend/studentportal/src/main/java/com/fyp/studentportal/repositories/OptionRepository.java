package com.fyp.studentportal.repositories;

import com.fyp.studentportal.domains.questions.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {
    List<Option> findAllByMcq_McqId(Long mcqId);
}
