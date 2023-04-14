package com.fyp.studentportal.serviceImpls;

import com.fyp.studentportal.domains.Admin;
import com.fyp.studentportal.domains.Student;
import com.fyp.studentportal.domains.Teacher;
import com.fyp.studentportal.dto.response.BaseResponseDTO;
import com.fyp.studentportal.dto.response.ErrorResponseDTO;
import com.fyp.studentportal.dto.response.SuccessResponseDTO;
import com.fyp.studentportal.enums.Roles;
import com.fyp.studentportal.repositories.AdminRepository;
import com.fyp.studentportal.repositories.StudentRepository;
import com.fyp.studentportal.repositories.TeacherRepository;
import com.fyp.studentportal.security.JWTDecodedData;
import com.fyp.studentportal.security.JWTUtil;
import com.fyp.studentportal.services.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final AdminRepository adminRepository;
    private final JWTUtil jwtUtil;

    private final Logger loggerFactory = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    public UserServiceImpl(StudentRepository studentRepository, TeacherRepository teacherRepository, AdminRepository adminRepository, JWTUtil jwtUtil) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.adminRepository = adminRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String[] array = username.split(":");
        try {
            if (array.length == 2) {
                String usernameS = array[0];
                Roles userRole = Roles.valueOf(array[1]);
                List<SimpleGrantedAuthority> authorities = new ArrayList<>();
                switch (userRole) {
                    case ADMIN:
                        Admin admin = this.adminRepository.getAdminByEmailAddress(usernameS);
                        authorities.add(new SimpleGrantedAuthority(Roles.ADMIN.name()));
                        return new User(admin.getEmailAddress(), admin.getPassword(), authorities);
                    case TEACHER:
                        Teacher teacher = this.teacherRepository.getTeacherByEmailAddress(usernameS);
                        authorities.add(new SimpleGrantedAuthority(Roles.TEACHER.name()));
                        return new User(teacher.getEmailAddress(), teacher.getPassword(), authorities);
                    case STUDENT:
                        Student student = this.studentRepository.getStudentByEmailAddress(usernameS);
                        authorities.add(new SimpleGrantedAuthority(Roles.STUDENT.name()));
                        return new User(student.getEmailAddress(), student.getPassword(), authorities);
                }
            }
        } catch (Exception exception) {
            this.loggerFactory.error("loadUserByUsername in loadUserByUsername");
        }
        return null;
    }

    @Override
    public BaseResponseDTO getUserDataUsingToken(HttpServletRequest httpServletRequest) {
        JWTDecodedData jwtDecodedData = this.jwtUtil.getDecodedToken(httpServletRequest);
        return this.getUserDataUsingToken(jwtDecodedData);
    }

    @Override
    public BaseResponseDTO getUserDataUsingToken(JWTDecodedData jwtDecodedData) {
        try {
            List<String> claims = jwtDecodedData.getClaims();
            if (claims.size() > 0) {
                Roles userRole = Roles.valueOf(claims.get(0));
                switch (userRole) {
                    case ADMIN:
                        Admin adminByEmailAddress = this.adminRepository.getAdminByEmailAddress(jwtDecodedData.getSubject());
                        adminByEmailAddress.setPassword(null);
                        return new SuccessResponseDTO(adminByEmailAddress, HttpStatus.OK.value());
                    case STUDENT:
                        Student studentByEmailAddress = this.studentRepository.getStudentByEmailAddress(jwtDecodedData.getSubject());
                        studentByEmailAddress.setPassword(null);
                        return new SuccessResponseDTO(studentByEmailAddress, HttpStatus.OK.value());
                    case TEACHER:
                        Teacher teacherByEmailAddress = this.teacherRepository.getTeacherByEmailAddress(jwtDecodedData.getSubject());
                        teacherByEmailAddress.setPassword(null);
                        return new SuccessResponseDTO(teacherByEmailAddress, HttpStatus.OK.value());
                }
            }
        } catch (Exception ex) {
            return new ErrorResponseDTO("Invalid User", "Forbidden", HttpStatus.NOT_FOUND.value());
        }
        return null;
    }
}
