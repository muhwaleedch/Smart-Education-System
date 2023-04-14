package com.fyp.studentportal.controllers;

import com.fyp.studentportal.dto.response.BaseResponseDTO;
import com.fyp.studentportal.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    private final IUserService iUserService;

    @Autowired
    public UserController(IUserService iUserService) {
        this.iUserService = iUserService;
    }

    @GetMapping("/details")
    public BaseResponseDTO getUserDetails(HttpServletRequest request) {
        return this.iUserService.getUserDataUsingToken(request);
    }
}
