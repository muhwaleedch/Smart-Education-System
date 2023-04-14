package com.fyp.studentportal.security;

import com.fyp.studentportal.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {
    private final IUserService iUserService;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;
    private final JWTRequestFilter jwtRequestFilter;

    @Autowired
    public SecurityConfigurer(IUserService iUserService, PasswordEncoder passwordEncoder, JWTUtil jwtUtil, JWTRequestFilter jwtRequestFilter) {
        this.iUserService = iUserService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.iUserService).passwordEncoder(this.passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests().antMatchers("/**").permitAll();

        http.csrf().disable();

        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(super.authenticationManagerBean(), this.jwtUtil);
        customAuthenticationFilter.setFilterProcessesUrl("/user/login");
        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(this.jwtRequestFilter, CustomAuthenticationFilter.class);
    }
}
