package com.fyp.studentportal.services;

import com.fyp.studentportal.dto.response.BaseResponseDTO;
import com.fyp.studentportal.security.JWTDecodedData;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;

public interface IUserService extends UserDetailsService {

    BaseResponseDTO getUserDataUsingToken(HttpServletRequest httpServletRequest);
    BaseResponseDTO getUserDataUsingToken(JWTDecodedData jwtDecodedData);
}
