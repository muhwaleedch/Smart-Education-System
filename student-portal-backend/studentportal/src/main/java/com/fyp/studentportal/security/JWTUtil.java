package com.fyp.studentportal.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fyp.studentportal.config.ApplicationConfig;
import com.fyp.studentportal.dto.TokensDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JWTUtil {
    private static final Integer A_DAY_VALIDITY = 24 * 60 * 60 * 1000;
    private static final Integer SEVEN_DAYS_VALIDITY = 7 * 24 * 60 * 60 * 1000;
    private final ApplicationConfig applicationConfig;
    private final Algorithm algorithm;
    private final JWTVerifier jwtVerifier;
    private final Logger loggerFactory = LoggerFactory.getLogger(JWTUtil.class);

    @Autowired
    public JWTUtil(ApplicationConfig applicationConfig) {
        this.applicationConfig = applicationConfig;
        this.algorithm = Algorithm.HMAC256(this.applicationConfig.getJwtSecretKey());
        this.jwtVerifier = JWT.require(this.algorithm).build();
    }

    @Nullable
    public JWTDecodedData getDecodedToken(String completeHeaderString) {
        if (completeHeaderString.startsWith("Bearer ")) {
            String tokenString = completeHeaderString.split(" ")[1];
            try {
                DecodedJWT decodedJWT = this.jwtVerifier.verify(tokenString);
                JWTDecodedData jwtDecodedData = new JWTDecodedData();
                jwtDecodedData
                    .setToken(tokenString)
                    .setSubject(decodedJWT.getSubject())
                    .setClaims(decodedJWT.getClaim("roles").as(ArrayList.class))
                    .setIat(decodedJWT.getIssuedAt().toString())
                    .setExp(decodedJWT.getExpiresAt().toString());
                return jwtDecodedData;
            } catch (Exception exception) {
                this.loggerFactory.error("getDecodedToken in JWTUtil");
            }
        }
        return null;
    }

    @Nullable
    public JWTDecodedData getDecodedToken(HttpServletRequest request) {
        String authorizationHeaders = request.getHeader(HttpHeaders.AUTHORIZATION);
        return this.getDecodedToken(authorizationHeaders);
    }

    public TokensDTO createTokensDTO(User springSecurityUser, HttpServletRequest request) {
        String accessToken = JWT.create()
            .withSubject(springSecurityUser.getUsername())
            .withIssuedAt(new Date(System.currentTimeMillis()))
            .withExpiresAt(new Date(System.currentTimeMillis() + A_DAY_VALIDITY))
            .withClaim("roles", springSecurityUser.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
            .sign(this.algorithm);
        String refreshToken = JWT.create()
            .withSubject(springSecurityUser.getUsername())
            .withIssuedAt(new Date(System.currentTimeMillis()))
            .withExpiresAt(new Date(System.currentTimeMillis() + SEVEN_DAYS_VALIDITY))
            .withIssuer(request.getRequestURL().toString())
            .sign(this.algorithm);
        return new TokensDTO(accessToken, refreshToken);
    }

}

