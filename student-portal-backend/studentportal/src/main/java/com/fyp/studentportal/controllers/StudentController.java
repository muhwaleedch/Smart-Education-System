package com.fyp.studentportal.controllers;

import com.fyp.studentportal.dto.quiz.QuizSubmitDTO;
import com.fyp.studentportal.dto.response.BaseResponseDTO;
import com.fyp.studentportal.services.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.fyp.studentportal.dto.response.SuccessResponseDTO.getNoContentResponse;
import static com.fyp.studentportal.dto.response.SuccessResponseDTO.getSuccessObject;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final IStudentService iStudentService;

    @Autowired
    public StudentController(IStudentService iStudentService) {
        this.iStudentService = iStudentService;
    }

    @PostMapping("/register-course")
    public ResponseEntity<BaseResponseDTO> registerStudentCourse(@RequestParam("courseId") Long courseId, @RequestParam("studentId") Long studentId) {
        return getSuccessObject(this.iStudentService.registerCourse(courseId, studentId), HttpStatus.OK.value());
    }

    @DeleteMapping("/delete-course-registration")
    public ResponseEntity<?> deleteCourseRegistered(@RequestParam("courseId") Long courseId, @RequestParam("studentId") Long studentId) {
        return null;
    }

    @GetMapping("/courses-registered")
    public ResponseEntity<BaseResponseDTO> getStudentCourses(@RequestParam("studentId") Long studentId) {
        return getSuccessObject(this.iStudentService.getAllCourses(studentId), HttpStatus.OK.value());
    }

    @GetMapping("/course-options")
    public ResponseEntity<BaseResponseDTO> getCourseOptions(@RequestParam("studentId") Long studentId) {
        return getSuccessObject(this.iStudentService.getCourseOptions(studentId), HttpStatus.OK.value());
    }

    @GetMapping("/active-quizzes")
    public ResponseEntity<BaseResponseDTO> getStudentActiveQuizzes(@RequestParam("studentId") Long studentId, @RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iStudentService.getStudentActiveQuizzes(studentId, courseId), HttpStatus.OK.value());
    }

    @GetMapping("/active-assignments")
    public ResponseEntity<BaseResponseDTO> getStudentActiveAssignments(@RequestParam("studentId") Long studentId, @RequestParam("courseId") Long courseId) {
        return getSuccessObject(this.iStudentService.getStudentActiveAssignments(studentId, courseId), HttpStatus.OK.value());
    }

    @GetMapping("/get-quiz-details")
    public ResponseEntity<BaseResponseDTO> getQuizDetailsAndMcqOptions(@RequestParam("quizId") Long quizId) {
        return getSuccessObject(this.iStudentService.getQuizDetailsAndMcqOptions(quizId), HttpStatus.OK.value());
    }

    @PostMapping("/submit-quiz")
    public ResponseEntity<?> submitStudentQuiz(@RequestParam("quizId") Long quizId, @RequestParam("studentId") Long studentId, @RequestBody List<QuizSubmitDTO> quizSubmitDTO) {
        this.iStudentService.submitQuiz(studentId, quizId, quizSubmitDTO);
        return getNoContentResponse();
    }

    @PostMapping("/submit-assignment")
    public ResponseEntity<?> submitStudentAssignment(@RequestParam("assignmentId") Long assignmentId, @RequestParam("studentId") Long studentId, @RequestParam("fileUrl") String fileUrl) {
        this.iStudentService.submitStudentAssignment(assignmentId, studentId, fileUrl);
        return getNoContentResponse();
    }

    @GetMapping("/attempted-quiz-details")
    public ResponseEntity<BaseResponseDTO> getAttemptedQuizMarks(@RequestParam("studentId") Long studentId, @RequestParam("courseId") Long courseId){
        return getSuccessObject(this.iStudentService.getAttemptedQuizMarks(studentId, courseId), HttpStatus.OK.value());
    }

    @GetMapping("/attempted-assignment-details")
    public ResponseEntity<BaseResponseDTO> getAttemptedAssignmentDetails(@RequestParam("studentId") Long studentId, @RequestParam("courseId") Long courseId){
        return getSuccessObject(this.iStudentService.getAttemptedAssignmentDetails(studentId, courseId), HttpStatus.OK.value());
    }
}
