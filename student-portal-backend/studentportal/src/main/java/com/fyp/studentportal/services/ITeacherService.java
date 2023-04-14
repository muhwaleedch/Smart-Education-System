package com.fyp.studentportal.services;

import com.fyp.studentportal.domains.Course;
import com.fyp.studentportal.domains.Teacher;
import com.fyp.studentportal.dto.AssignDTO;

import java.util.List;
import java.util.Set;

public interface ITeacherService {
    Teacher createTeacher(Teacher teacher);

    Teacher updateTeacher(Teacher teacher);

    void deleteTeacher(Long teacherId);

    List<Teacher> getAllTeachersByDepartment(Long departmentId);

    Teacher getTeacherDetails(Long teacherId);

    List<Teacher> getAllTeachers();

    Set<Course> getTeacherCourses(Long teacherId);

    Object getAssignmentForCourse(Long courseId);

    Object getQuizForCourse(Long courseId);

    void deleteQuiz(Long quizId);

    void deleteAssignment(Long assigmentId);

    void assignAssignment(Long assignmentId, AssignDTO assignDTO);

    void assignQuiz(Long quizId, AssignDTO assignDTO);

    Object getQuizStatuses(Long courseId, Long teacherId);

    Object getAssignmentStatuses(Long courseId, Long teacherId);
}
