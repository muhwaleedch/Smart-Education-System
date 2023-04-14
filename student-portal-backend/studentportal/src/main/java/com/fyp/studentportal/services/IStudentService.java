package com.fyp.studentportal.services;

import com.fyp.studentportal.domains.Course;
import com.fyp.studentportal.domains.Quiz;
import com.fyp.studentportal.domains.Student;
import com.fyp.studentportal.dto.quiz.QuizSubmitDTO;

import java.util.List;
import java.util.Set;

public interface IStudentService {
    Student createStudent(Student student);

    Student updateStudent(Student student);

    void deleteStudent(Long studentId);

    List<Student> getAllStudentsForDepartment(Long departmentId);

    Student getStudentDetails(Long studentId);

    Set<Student> getAllStudents();

    Set<Course> getAllCourses(Long studentId);

    List<Course> getCourseOptions(Long studentId);

    Student registerCourse(Long courseId, Long studentId);

    List<Quiz> getStudentActiveQuizzes(Long studentId, Long courseId);

    Object getQuizDetailsAndMcqOptions(Long quizId);

    void submitQuiz(Long studentId, Long quizId, List<QuizSubmitDTO> quizSubmitDTO);

    Object getStudentActiveAssignments(Long studentId, Long courseId);

    void submitStudentAssignment(Long assignmentId, Long studentId, String fileUrl);

    Object getAttemptedQuizMarks(Long studentId, Long courseId);

    Object getAttemptedAssignmentDetails(Long studentId, Long courseId);
}
