package com.fyp.studentportal.serviceImpls;

import com.fyp.studentportal.domains.Course;
import com.fyp.studentportal.domains.CourseContent;
import com.fyp.studentportal.domains.MimeTypeFileUploads;
import com.fyp.studentportal.domains.Student;
import com.fyp.studentportal.repositories.CourseRepository;
import com.fyp.studentportal.services.ICourseService;
import com.fyp.studentportal.services.IFileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements ICourseService {
    private final CourseRepository courseRepository;
    private final IFileUploadService iFileUploadService;

    @Autowired
    public CourseServiceImpl(CourseRepository courseRepository, IFileUploadService iFileUploadService) {
        this.courseRepository = courseRepository;
        this.iFileUploadService = iFileUploadService;
    }

    @Override
    public Course createCourse(Course course) {
        if (null != course.getCourseId() && this.courseRepository.existsById(course.getCourseId())) {
            throw new DataIntegrityViolationException("Course Already exists");
        }
        return this.courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Course course) {
        if (this.courseRepository.existsById(course.getCourseId())) {
            return this.courseRepository.save(course);
        }
        throw new EntityNotFoundException("Course does not exists");
    }

    @Override
    public void deleteCourse(Long courseId) {
        this.courseRepository.deleteById(courseId);
    }

    @Override
    public Course getCourseDetails(Long courseId) {
        Optional<Course> optionalCourse = this.courseRepository.findById(courseId);
        if (optionalCourse.isPresent()) {
            return optionalCourse.get();
        }
        throw new EntityNotFoundException("Course not found");
    }

    @Override
    public List<Course> getAllCourseListByDepartment(Long departmentId) {
        return this.courseRepository.findAllByDepartment_DepartmentId(departmentId);
    }

    @Override
    public Course addCourseContent(CourseContent courseContent, Long courseId, List<MultipartFile> multipartFiles) {
        Optional<Course> optionalCourse = this.courseRepository.findById(courseId);
        if (optionalCourse.isPresent()) {
            if (multipartFiles != null) {
                multipartFiles.forEach(it -> {
                    MimeTypeFileUploads mimeTypeFileUploads = this.iFileUploadService.uploadFileGetData(it);
                    courseContent.addMimeTypeFile(mimeTypeFileUploads);
                });
                optionalCourse.get().addCourseContent(courseContent);
            }
            return this.courseRepository.save(optionalCourse.get());
        }
        throw new RuntimeException("Course doest not exists");
    }

    @Override
    public List<Course> getAllCourses() {
        return this.courseRepository.findAll();
    }

    @Override
    public Long getRegisteredUsersCount(Long courseId) {
        Optional<Course> optionalCourse = this.courseRepository.findById(courseId);
        if (optionalCourse.isPresent()) {
            return (long) optionalCourse.get().students().size();
        }
        throw new EntityNotFoundException("Course not found");
    }

    @Override
    public Course updateCourseFileUrl(String url, Long courseId) {
        if (url != null && courseId != null) {
            Optional<Course> optionalCourse = this.courseRepository.findById(courseId);
            if (optionalCourse.isPresent()) {
                Course course = optionalCourse.get();
                course.setCdfURL(url);
                return this.courseRepository.save(course);
            }
            throw new EntityNotFoundException("Required Course not found!");
        }
        throw new RuntimeException("Invalid Request");
    }

    @Override
    public Set<CourseContent> getAllCourseContentsForCourse(Long courseId) {
        Optional<Course> optionalCourse = this.courseRepository.findById(courseId);
        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();
            return course.getCourseContents();
        }
        throw new EntityNotFoundException("Required Course not found!");
    }

    @Override
    public Course addCourseContent(CourseContent courseContent, Long courseId) {
        Optional<Course> courseOptional = this.courseRepository.findById(courseId);
        if (courseOptional.isPresent()) {
            Course course = courseOptional.get();
            course.addCourseContent(courseContent);
            return this.courseRepository.save(course);
        }
        throw new EntityNotFoundException("Required Course not found!");
    }

    @Override
    public Course updateCourseContents(CourseContent courseContent, Long courseId) {
        Optional<Course> optionalCourse = this.courseRepository.findById(courseId);
        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();
            course.setCourseContents(course.getCourseContents().stream().map(it -> {
                if (it.getCourseContentId().equals(courseContent.getCourseContentId())) {
                    it = courseContent;
                }
                return it;
            }).collect(Collectors.toSet()));
            return this.courseRepository.save(course);
        }
        throw new EntityNotFoundException("Required Course not found!");
    }

    @Override
    public void deleteCourseContent(Long courseContentId, Long courseId) {
        Optional<Course> optionalCourse = this.courseRepository.findById(courseId);
        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();
            course.setCourseContents(course.getCourseContents().stream().filter(it -> !it.getCourseContentId().equals(courseContentId)).collect(Collectors.toSet()));
            this.courseRepository.save(course);
            return;
        }
        throw new EntityNotFoundException("Required Course not found!");
    }

    @Override
    public Set<Student> getRegisteredCourses(Long courseId) {
        Optional<Course> optionalCourse = this.courseRepository.findById(courseId);
        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();
            return course.students();
        }
        throw new EntityNotFoundException("Required Course not found!");
    }
}
