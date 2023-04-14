package com.fyp.studentportal.serviceImpls;

import com.fyp.studentportal.domains.Course;
import com.fyp.studentportal.domains.Student;
import com.fyp.studentportal.domains.Teacher;
import com.fyp.studentportal.dto.TeacherCourseDTO;
import com.fyp.studentportal.services.IAdminService;
import com.fyp.studentportal.services.ICourseService;
import com.fyp.studentportal.services.IStudentService;
import com.fyp.studentportal.services.ITeacherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class AdminServiceImpl implements IAdminService {
    private final IStudentService iStudentService;
    private final ITeacherService iTeacherService;
    private final ICourseService iCourseService;

    private final Logger loggerFactory = LoggerFactory.getLogger(AdminServiceImpl.class);

    @Autowired
    public AdminServiceImpl(IStudentService iStudentService, ITeacherService iTeacherService, ICourseService iCourseService) {
        this.iStudentService = iStudentService;
        this.iTeacherService = iTeacherService;
        this.iCourseService = iCourseService;
    }


    @Override
    public Student createStudent(Student student) {
        this.loggerFactory.info("createStudent in AdminServiceImpl");
        return this.iStudentService.createStudent(student);
    }

    @Override
    public Student updateStudent(Student student) {
        this.loggerFactory.info("updateStudent in AdminServiceImpl");
        return this.iStudentService.updateStudent(student);
    }

    @Override
    public void deleteStudent(Long studentId) {
        this.loggerFactory.info("deleteStudent in AdminServiceImpl");
        this.iStudentService.deleteStudent(studentId);
    }

    @Override
    public List<Student> getAllStudentsByDepartment(Long departmentId) {
        this.loggerFactory.info("getAllStudentsByDepartment in AdminServiceImpl");
        return this.iStudentService.getAllStudentsForDepartment(departmentId);
    }

    @Override
    public Student getStudentDetails(Long studentId) {
        this.loggerFactory.info("getStudentDetails in AdminServiceImpl");
        return this.iStudentService.getStudentDetails(studentId);
    }

    @Override
    public Teacher createTeacher(Teacher teacher) {
        this.loggerFactory.info("createTeacher in AdminServiceImpl");
        return this.iTeacherService.createTeacher(teacher);
    }

    @Override
    public Teacher updateTeacher(Teacher teacher) {
        this.loggerFactory.info("updateTeacher in AdminServiceImpl");
        return this.iTeacherService.updateTeacher(teacher);
    }

    @Override
    public void deleteTeacher(Long teacherId) {
        this.loggerFactory.info("deleteTeacher in AdminServiceImpl");
        this.iTeacherService.deleteTeacher(teacherId);
    }

    @Override
    public List<Teacher> getAllTeachersByDepartment(Long departmentId) {
        this.loggerFactory.info("getAllTeachersByDepartment in AdminServiceImpl");
        return this.iTeacherService.getAllTeachersByDepartment(departmentId);
    }

    @Override
    public Teacher getTeacherDetails(Long teacherId) {
        this.loggerFactory.info("getAllTeachersByDepartment in AdminServiceImpl");
        return this.iTeacherService.getTeacherDetails(teacherId);
    }

    @Override
    public Course createCourse(Course course) {
        this.loggerFactory.info("createCourse in AdminServiceImpl");
        return this.iCourseService.createCourse(course);
    }

    @Override
    public Course updateCourse(Course course) {
        this.loggerFactory.info("updateCourse in AdminServiceImpl");
        return this.iCourseService.updateCourse(course);
    }

    @Override
    public void deleteCourse(Long courseId) {
        this.loggerFactory.info("deleteCourse in AdminServiceImpl");
        this.iCourseService.deleteCourse(courseId);
    }

    @Override
    public Course getCourseDetails(Long courseId) {
        this.loggerFactory.info("getCourseDetails in AdminServiceImpl");
        return this.iCourseService.getCourseDetails(courseId);
    }

    @Override
    public List<Course> getAllCourseListByDepartment(Long departmentId) {
        this.loggerFactory.info("getAllCourseListByDepartment in AdminServiceImpl");
        return this.iCourseService.getAllCourseListByDepartment(departmentId);
    }

    @Override
    public void allocatedCoursesToTeachers(List<TeacherCourseDTO> teacherCourseDTOList) {
        teacherCourseDTOList.forEach(it -> {
            Teacher teacher = this.iTeacherService.getTeacherDetails(it.getTeacherId());
            Course course = this.iCourseService.getCourseDetails(it.getCourseId());
            teacher.addCourseToTeacher(course);
            this.iTeacherService.updateTeacher(teacher);
        });
    }

    @Override
    public List<Course> getAllCourses() {
        return this.iCourseService.getAllCourses();
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return this.iTeacherService.getAllTeachers();
    }

    @Override
    public Set<Student> getAllStudents() {
        return this.iStudentService.getAllStudents();
    }
}
