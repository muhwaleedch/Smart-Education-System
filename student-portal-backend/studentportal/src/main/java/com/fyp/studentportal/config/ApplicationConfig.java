package com.fyp.studentportal.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties("com.fyp.studentportal")
@PropertySource("classpath:application.yml")
public class ApplicationConfig {
    @Value("com.fyp.studentportal.jwt")
    private String jwtSecretKey;

    public String getJwtSecretKey() {
        return jwtSecretKey;
    }
}
