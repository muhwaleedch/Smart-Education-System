package com.fyp.studentportal.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fyp.studentportal.dto.response.ErrorResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;
    private final Logger loggerFactory = LoggerFactory.getLogger(JWTRequestFilter.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public JWTRequestFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (request.getRequestURI().contains("/admin") || request.getRequestURI().contains("/user/login")) {
            filterChain.doFilter(request, response);
            return;
        }
        filterChain.doFilter(request, response);
//        if (null != authorizationHeader) {
//            try {
//                JWTDecodedData jwtDecodedData = this.jwtUtil.getDecodedToken(authorizationHeader);
//                if (null == jwtDecodedData) {
//                    throw new RuntimeException("jwtDecodedData is null");
//                }
//                List<SimpleGrantedAuthority> authorityList = jwtDecodedData.getClaims().stream().map(it -> new SimpleGrantedAuthority(it)).collect(Collectors.toList());
//                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(jwtDecodedData.getSubject(), null, authorityList);
//                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//                filterChain.doFilter(request, response);
//            } catch (Exception e) {
//                this.loggerFactory.error(e.getMessage());
//                response.setContentType(APPLICATION_JSON_VALUE);
//                response.setStatus(HttpStatus.FORBIDDEN.value());
//                this.objectMapper.writeValue(response.getOutputStream(), new ErrorResponseDTO("Access Forbidden", "Invalid Authorization Header", HttpStatus.FORBIDDEN.value()));
//            }
//        } else {
//            response.setContentType(APPLICATION_JSON_VALUE);
//            response.setStatus(HttpStatus.FORBIDDEN.value());
//            this.objectMapper.writeValue(response.getOutputStream(), new ErrorResponseDTO("Access Forbidden", "Authorization Bearer Not Specified", HttpStatus.FORBIDDEN.value()));
//        }
    }
}
