package com.fyp.studentportal.controllers;

import com.fyp.studentportal.domains.Course;
import com.fyp.studentportal.domains.Student;
import com.fyp.studentportal.domains.Teacher;
import com.fyp.studentportal.dto.response.BaseResponseDTO;
import com.fyp.studentportal.dto.response.SuccessResponseDTO;
import com.fyp.studentportal.security.JWTUtil;
import com.fyp.studentportal.services.IAdminService;
import com.fyp.studentportal.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.fyp.studentportal.dto.response.SuccessResponseDTO.getSuccessObject;

@RestController
@RequestMapping("/admin")
public class AdminCreationController {
    private final IAdminService iAdminService;
    private final IUserService iUserService;
    private final JWTUtil jwtUtil;

    @Autowired
    public AdminCreationController(IAdminService iAdminService, IUserService iUserService, JWTUtil jwtUtil) {
        this.iAdminService = iAdminService;
        this.iUserService = iUserService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/student/save")
    public ResponseEntity<BaseResponseDTO> createStudent(@RequestBody Student student) {
        return getSuccessObject(this.iAdminService.createStudent(student), HttpStatus.CREATED.value());
    }

    @PutMapping("/student/update")
    public ResponseEntity<BaseResponseDTO> updateStudent(@RequestBody Student student) {
        return getSuccessObject(this.iAdminService.updateStudent(student), HttpStatus.OK.value());
    }

    @DeleteMapping("/student/delete")
    public ResponseEntity<Object> deleteStudent(@RequestParam("studentId") Long studentId) {
        this.iAdminService.deleteStudent(studentId);
        return SuccessResponseDTO.getNoContentResponse();
    }

    @GetMapping("/student/details")
    public ResponseEntity<BaseResponseDTO> getStudentDetails(@RequestParam("studentId") Long studentId) {
        return getSuccessObject(this.iAdminService.getStudentDetails(studentId), HttpStatus.OK.value());
    }

    @GetMapping("/student/all-by-department")
    public ResponseEntity<BaseResponseDTO> getStudentsByDepartment(@RequestParam("departmentId") Long departmentId) {
        return getSuccessObject(this.iAdminService.getAllStudentsByDepartment(departmentId), HttpStatus.OK.value());
    }

    @GetMapping("/student/all")
    public ResponseEntity<BaseResponseDTO> getAllStudents() {
        return getSuccessObject(this.iAdminService.getAllStudents(), HttpStatus.OK.value());
    }

    @PostMapping("/teacher/save")
    public ResponseEntity<BaseResponseDTO> createTeacher(@RequestBody Teacher teacher) {
        return getSuccessObject(this.iAdminService.createTeacher(teacher), HttpStatus.CREATED.value());
    }

    @PutMapping("/teacher/update")
    public ResponseEntity<BaseResponseDTO> updateTeacher(@RequestBody Teacher teacher) {
        return getSuccessObject(this.iAdminService.updateTeacher(teacher), HttpStatus.OK.value());
    }

    @DeleteMapping("/teacher/delete")
    public ResponseEntity<Object> deleteTeacher(@RequestParam("teacherId") Long teacherId) {
        this.iAdminService.deleteTeacher(teacherId);
        return SuccessResponseDTO.getNoContentResponse();
    }

    @GetMapping("/teacher/details")
    public ResponseEntity<BaseResponseDTO> getTeacherDetails(@RequestParam("teacherId") Long teacherId) {
        return getSuccessObject(this.iAdminService.getTeacherDetails(teacherId), HttpStatus.OK.value());
    }

    @GetMapping("/teacher/all-by-department")
    public ResponseEntity<BaseResponseDTO> getTeachersByDepartment(@RequestParam("departmentId") Long departmentId) {
        return getSuccessObject(this.iAdminService.getAllTeachersByDepartment(departmentId), HttpStatus.OK.value());
    }

    @GetMapping("/teacher/all")
    public ResponseEntity<BaseResponseDTO> getAllTeachers() {
        return getSuccessObject(this.iAdminService.getAllTeachers(), HttpStatus.OK.value());
    }

    @PostMapping("/course/save")
    public ResponseEntity<BaseResponseDTO> createCourse(@RequestBody Course course) {
        return getSuccessObject(this.iAdminService.createCourse(course), HttpStatus.CREATED.value());
    }

    @PutMapping("/course/update")
    public ResponseEntity<BaseResponseDTO> updateCourse(@RequestBody Course course) {
        return getSuccessObject(this.iAdminService.updateCourse(course), HttpStatus.OK.value());
    }

    @DeleteMapping("/course/delete")
    public ResponseEntity<Object> deleteCourse(@RequestParam("courseId") Long courseId) {
        this.iAdminService.deleteCourse(courseId);
        return SuccessResponseDTO.getNoContentResponse();
    }

    @GetMapping("/course/details")
    public ResponseEntity<BaseResponseDTO> getCourseDetails(@RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iAdminService.getCourseDetails(courseId), HttpStatus.OK.value());
    }

    @GetMapping("/course/all-by-department")
    public ResponseEntity<BaseResponseDTO> getAllCourseListByDepartment(@RequestParam("departmentId") Long departmentId) {
        return getSuccessObject(this.iAdminService.getAllCourseListByDepartment(departmentId), HttpStatus.OK.value());
    }

    @GetMapping("/course/all")
    public ResponseEntity<BaseResponseDTO> getAllCourses() {
        return getSuccessObject(this.iAdminService.getAllCourses(), HttpStatus.OK.value());
    }

    @PostMapping("/details")
    public BaseResponseDTO getUserDetails(@RequestBody String accessToken) {
        return this.iUserService.getUserDataUsingToken(this.jwtUtil.getDecodedToken("Bearer " + accessToken));
    }
}
