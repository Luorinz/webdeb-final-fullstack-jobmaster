package com.webdev20spr.javaisthebestlanguage.jobmaster.controller;

import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
import com.webdev20spr.javaisthebestlanguage.jobmaster.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Anda Luo
 * 2020-4-7
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/save/{jobId}")
    public String saveJob(@PathVariable(name = "jobId") String jobId) {
        System.out.println("UserController -> saveJob: " + jobId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        userService.saveJob(username, jobId);
        return "saved";
    }

    @GetMapping("/jobs")
    public List<Job> getUserJobs() {
        System.out.println("UserController -> getUserJobs: ");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        return userService.getJobsByUsername(username);
    }
}
