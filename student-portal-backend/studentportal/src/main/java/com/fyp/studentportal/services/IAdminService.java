package com.fyp.studentportal.services;

import com.fyp.studentportal.domains.Course;
import com.fyp.studentportal.domains.Student;
import com.fyp.studentportal.domains.Teacher;
import com.fyp.studentportal.dto.TeacherCourseDTO;
import com.fyp.studentportal.dto.response.BaseResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface IAdminService {
    Student createStudent(Student student);

    Student updateStudent(Student student);

    void deleteStudent(Long studentId);

    List<Student> getAllStudentsByDepartment(Long departmentId);

    Student getStudentDetails(Long studentId);

    Teacher createTeacher(Teacher teacher);

    Teacher updateTeacher(Teacher teacher);

    void deleteTeacher(Long teacherId);

    List<Teacher> getAllTeachersByDepartment(Long departmentId);

    Teacher getTeacherDetails(Long teacherId);

    Course createCourse(Course course);

    Course updateCourse(Course course);

    void deleteCourse(Long courseId);

    Course getCourseDetails(Long courseId);

    List<Course> getAllCourseListByDepartment(Long departmentId);

    void allocatedCoursesToTeachers(List<TeacherCourseDTO> teacherCourseDTOList);

    List<Course> getAllCourses();

    List<Teacher> getAllTeachers();

    Set<Student> getAllStudents();
}
