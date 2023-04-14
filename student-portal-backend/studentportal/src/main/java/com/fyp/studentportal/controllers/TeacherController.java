package com.fyp.studentportal.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fyp.studentportal.domains.CourseContent;
import com.fyp.studentportal.domains.questions.BaseQuestion;
import com.fyp.studentportal.dto.AssignDTO;
import com.fyp.studentportal.dto.AssignmentCreationDTO;
import com.fyp.studentportal.dto.QuizCreationDTO;
import com.fyp.studentportal.dto.response.BaseResponseDTO;
import com.fyp.studentportal.services.ICourseService;
import com.fyp.studentportal.services.IQuestionService;
import com.fyp.studentportal.services.ITeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.fyp.studentportal.dto.response.ErrorResponseDTO.getErrorObject;
import static com.fyp.studentportal.dto.response.SuccessResponseDTO.getNoContentResponse;
import static com.fyp.studentportal.dto.response.SuccessResponseDTO.getSuccessObject;

@RestController
@RequestMapping("/teacher")
public class TeacherController {
    private final ICourseService iCourseService;
    private final IQuestionService iQuestionService;
    private final ITeacherService iTeacherService;

    @Autowired
    public TeacherController(ICourseService iCourseService, IQuestionService iQuestionService, ITeacherService iTeacherService) {
        this.iCourseService = iCourseService;
        this.iQuestionService = iQuestionService;
        this.iTeacherService = iTeacherService;
    }

    @PostMapping("/add-course-content")
    public ResponseEntity<?> addCourseContent(
        @RequestParam("data") String data,
        @RequestParam("files") List<MultipartFile> files,
        @RequestParam("courseId") Long courseId
    ) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            CourseContent courseContent = objectMapper.readValue(data, new TypeReference<CourseContent>() {
            });
            return getSuccessObject(this.iCourseService.addCourseContent(courseContent, courseId, files), HttpStatus.OK.value());
        } catch (Exception exception) {
            return getErrorObject("Invalid course contents", exception.getMessage(), HttpStatus.BAD_REQUEST.value());
        }
    }

    @PostMapping("/add-question")
    public ResponseEntity<BaseResponseDTO> addQuestion(@RequestBody BaseQuestion baseQuestion) {
        return getSuccessObject(this.iQuestionService.saveQuestion(baseQuestion), HttpStatus.CREATED.value());
    }

    @PostMapping("/create-quiz")
    public ResponseEntity<BaseResponseDTO> createQuiz(@RequestBody List<QuizCreationDTO> quizCreationDTO, @RequestParam("syllabus") String syllabus, @RequestParam("sheetName") String sheetName, @RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iQuestionService.createQuiz(quizCreationDTO, syllabus, sheetName, courseId), HttpStatus.CREATED.value());
    }

    @PostMapping("/create-assignment")
    public ResponseEntity<BaseResponseDTO> createAssignment(
        @RequestBody(required = false) List<AssignmentCreationDTO> assignmentCreationDTOList,
        @RequestParam("syllabus") String syllabus,
        @RequestParam("sheetName") String sheetName,
        @RequestParam("courseId") Long courseId,
        @RequestParam("startTime") String startTime,
        @RequestParam("endTime") String endTime,
        @RequestParam(value = "fileUrl", required = false) String fileUrl
    ) {
        return getSuccessObject(this.iQuestionService.createAssignment(
            assignmentCreationDTOList,
            sheetName,
            syllabus,
            fileUrl,
            courseId,
            startTime,
            endTime
        ), HttpStatus.CREATED.value());
    }

    @PostMapping("/get-courses")
    public ResponseEntity<BaseResponseDTO> addQuestion(@RequestParam("teacherId") Long teacherId) {
        return getSuccessObject(this.iTeacherService.getTeacherCourses(teacherId), HttpStatus.CREATED.value());
    }

    @GetMapping("/get-quiz-for-course")
    public ResponseEntity<BaseResponseDTO> getQuizForCourse(@RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iTeacherService.getQuizForCourse(courseId), HttpStatus.OK.value());
    }

    @GetMapping("/get-assignment-for-course")
    public ResponseEntity<BaseResponseDTO> getAssignmentForCourse(@RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iTeacherService.getAssignmentForCourse(courseId), HttpStatus.OK.value());
    }

    @DeleteMapping("/delete-assignment")
    public ResponseEntity<?> deleteAssignment(@RequestParam("assignmentId") Long assigmentId) {
        this.iTeacherService.deleteAssignment(assigmentId);
        return getNoContentResponse();
    }

    @DeleteMapping("/delete-quiz")
    public ResponseEntity<?> deleteQuiz(@RequestParam("quizId") Long quizId) {
        this.iTeacherService.deleteQuiz(quizId);
        return getNoContentResponse();
    }

    @PatchMapping("/assign-quiz")
    public ResponseEntity<?> assignQuiz(@RequestParam("quizId") Long quizId, @RequestBody AssignDTO assignDTO) {
        this.iTeacherService.assignQuiz(quizId, assignDTO);
        return getNoContentResponse();
    }

    @PatchMapping("/assign-assignment")
    public ResponseEntity<?> assignAssignment(@RequestParam("assignmentId") Long assignmentId, @RequestBody AssignDTO assignDTO) {
        this.iTeacherService.assignAssignment(assignmentId, assignDTO);
        return getNoContentResponse();
    }

    @GetMapping("/get-quiz-statuses")
    public ResponseEntity<BaseResponseDTO> getQuizStatuses(@RequestParam("teacherId") Long teacherId, @RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iTeacherService.getQuizStatuses(courseId, teacherId), HttpStatus.OK.value());
    }

    @GetMapping("/get-assignment-statuses")
    public ResponseEntity<BaseResponseDTO> getAssignmentStatuses(@RequestParam("teacherId") Long teacherId, @RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iTeacherService.getAssignmentStatuses(courseId, teacherId), HttpStatus.OK.value());
    }
}
