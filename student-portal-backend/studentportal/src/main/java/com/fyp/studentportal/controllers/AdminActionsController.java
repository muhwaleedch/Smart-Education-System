package com.fyp.studentportal.controllers;

import com.fyp.studentportal.dto.TeacherCourseDTO;
import com.fyp.studentportal.services.IAdminService;
import com.fyp.studentportal.services.IDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import static com.fyp.studentportal.dto.response.SuccessResponseDTO.getNoContentResponse;
import static com.fyp.studentportal.dto.response.SuccessResponseDTO.getSuccessObject;

@Controller
@RequestMapping("/admin/actions")
public class AdminActionsController {
    private final IAdminService iAdminService;
    private final IDepartmentService iDepartmentService;

    @Autowired
    public AdminActionsController(IAdminService iAdminService, IDepartmentService iDepartmentService) {
        this.iAdminService = iAdminService;
        this.iDepartmentService = iDepartmentService;
    }

    @PostMapping("/allocate-courses-teacher")
    public ResponseEntity<?> allocateCoursesToTeacher(@RequestBody List<TeacherCourseDTO> teacherCourseDTOList) {
        this.iAdminService.allocatedCoursesToTeachers(teacherCourseDTOList);
        return getNoContentResponse();
    }

    @GetMapping("/all-departments")
    public ResponseEntity<?> getAllDepartments() {
        return getSuccessObject(this.iDepartmentService.getAllDepartments(), HttpStatus.OK.value());
    }
}
