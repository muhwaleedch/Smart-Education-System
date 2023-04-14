package com.fyp.studentportal.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fyp.studentportal.dto.EmailPasswordDTO;
import com.fyp.studentportal.dto.TokensDTO;
import com.fyp.studentportal.dto.response.ErrorResponseDTO;
import com.fyp.studentportal.dto.response.SuccessResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final Logger loggerFactory = LoggerFactory.getLogger(CustomAuthenticationFilter.class);

    private final ObjectMapper objectMapper = new ObjectMapper();

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Nullable
    private EmailPasswordDTO getUsernameAndPassword(HttpServletRequest request) {
        try {
            String string = request.getReader().lines().collect(Collectors.joining());
            return this.objectMapper.readValue(string, EmailPasswordDTO.class);
        } catch (IOException exception) {
            this.loggerFactory.error("getUsernameAndPassword in getUsernameAndPassword");
        }
        return null;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        EmailPasswordDTO emailPasswordDTO = this.getUsernameAndPassword(request);
        if (emailPasswordDTO == null) {
            throw new NullPointerException("nullPointerException in attemptAuthentication");
        }
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(emailPasswordDTO.getEmailAddress() + ":" + emailPasswordDTO.getRole(), emailPasswordDTO.getPassword());
        return this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User springUser = (User) authResult.getPrincipal();
        TokensDTO tokensDTO = this.jwtUtil.createTokensDTO(springUser, request);
        response.setContentType(APPLICATION_JSON_VALUE);
        this.objectMapper.writeValue(response.getOutputStream(), new SuccessResponseDTO(tokensDTO, HttpStatus.OK.value()));
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.FORBIDDEN.value());
        this.objectMapper.writeValue(response.getOutputStream(), new ErrorResponseDTO("Email and password combination does not exists", "Forbidden", HttpStatus.FORBIDDEN.value()));
    }
}
