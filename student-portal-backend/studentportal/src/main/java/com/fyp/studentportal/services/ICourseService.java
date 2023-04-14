package com.fyp.studentportal.services;

import com.fyp.studentportal.domains.Course;
import com.fyp.studentportal.domains.CourseContent;
import com.fyp.studentportal.domains.Student;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface ICourseService {
    Course createCourse(Course course);

    Course updateCourse(Course course);

    void deleteCourse(Long courseId);

    Course getCourseDetails(Long courseId);

    List<Course> getAllCourseListByDepartment(Long departmentId);

    Course addCourseContent(CourseContent courseContent, Long courseId, List<MultipartFile> multipartFiles);

    List<Course> getAllCourses();

    Long getRegisteredUsersCount(Long courseId);

    Course updateCourseFileUrl(String url, Long courseId);

    Set<CourseContent> getAllCourseContentsForCourse(Long courseId);

    Course addCourseContent(CourseContent courseContent, Long courseId);

    Course updateCourseContents(CourseContent courseContent, Long courseId);

    void deleteCourseContent(Long courseContentId, Long courseId);

    Set<Student> getRegisteredCourses(Long courseId);
}
