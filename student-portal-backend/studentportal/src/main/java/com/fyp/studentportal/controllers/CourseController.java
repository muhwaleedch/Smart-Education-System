package com.fyp.studentportal.controllers;

import com.fyp.studentportal.domains.CourseContent;
import com.fyp.studentportal.dto.response.BaseResponseDTO;
import com.fyp.studentportal.services.ICourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.fyp.studentportal.dto.response.SuccessResponseDTO.getNoContentResponse;
import static com.fyp.studentportal.dto.response.SuccessResponseDTO.getSuccessObject;

@RestController
@RequestMapping("/course")
public class CourseController {
    private final ICourseService iCourseService;

    @Autowired
    public CourseController(ICourseService iCourseService) {
        this.iCourseService = iCourseService;
    }

    @GetMapping("/students-registered-count")
    public ResponseEntity<BaseResponseDTO> getStudentRegisteredInCourse(@RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iCourseService.getRegisteredUsersCount(courseId), HttpStatus.OK.value());
    }

    @PutMapping("/update-cdf-url")
    public ResponseEntity<BaseResponseDTO> uploadCDFFileUrl(@RequestParam("url") String url, @RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iCourseService.updateCourseFileUrl(url, courseId), HttpStatus.OK.value());
    }

    @GetMapping("/course-contents")
    public ResponseEntity<BaseResponseDTO> getCourseContents(@RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iCourseService.getAllCourseContentsForCourse(courseId), HttpStatus.OK.value());
    }

    @PostMapping("/add-course-contents")
    public ResponseEntity<BaseResponseDTO> addCourseContents(@RequestBody CourseContent courseContent, @RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iCourseService.addCourseContent(courseContent, courseId), HttpStatus.CREATED.value());
    }

    @PutMapping("/update-course-content")
    public ResponseEntity<BaseResponseDTO> updateCourseContent(@RequestBody CourseContent courseContent, @RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iCourseService.updateCourseContents(courseContent, courseId), HttpStatus.OK.value());
    }

    @DeleteMapping("/delete-course-content")
    public ResponseEntity<?> deleteCourseContent(@RequestParam("courseContentId") Long courseContentId, @RequestParam("courseId") Long courseId) {
        this.iCourseService.deleteCourseContent(courseContentId, courseId);
        return getNoContentResponse();
    }

    @GetMapping("/get-registered-students")
    public ResponseEntity<BaseResponseDTO> getRegisteredCourses(@RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iCourseService.getRegisteredCourses(courseId), HttpStatus.OK.value());
    }

}
