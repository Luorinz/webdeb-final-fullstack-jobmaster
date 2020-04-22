package com.webdev20spr.javaisthebestlanguage.jobmaster.controller;

import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
import com.webdev20spr.javaisthebestlanguage.jobmaster.service.JobService;
import com.webdev20spr.javaisthebestlanguage.jobmaster.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Autowired
    private JobService jobService;


    @PostMapping("/{jobId}")
    public String saveJob(@PathVariable(name = "jobId") String jobId) {
        System.out.println("UserController -> saveJob: " + jobId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        userService.saveJob(username, jobId);
        return "saved";
    }

    @GetMapping("/jobs")
    public List<Job> getCurrentUserSavedJobs() {
        System.out.println("UserController -> getUserJobs: ");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        return userService.getSavedJobsByUsername(username);
    }

    @PutMapping("/update")
    @PreAuthorize(value = "hasRole('ADMIN')")
    public String updateUserRole(@RequestParam(name = "username") String username,@RequestParam(name = "role") String role) {
        System.out.println("UserController -> updateUserRole");
        userService.updateUserRole(username, role);
        return "updated";
    }

    @PostMapping("/post")
    @PreAuthorize(value = "hasRole('ADV_USER') || hasRole('ADMIN')")
    public Job postJob(@RequestBody Job jobRequest) {
        System.out.println("UserController -> postJob: " + jobRequest);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        Job job = jobService.postJob(jobRequest);
        userService.postJob(username, job.getId());
        userService.reviewJob(username, job.getId());
        return job;
    }

    @DeleteMapping("/delete/{jobId}")
    @PreAuthorize(value = "hasRole('ADV_USER') || hasRole('ADMIN')")
    public String deleteJob(@PathVariable(name = "jobId") String jobId) {
        System.out.println("UserController -> deleteJob: " + jobId);
        jobService.deleteJob(jobId);
        userService.deleteJob(jobId);
        return "deleted";
    }

    @PutMapping("/pass/{jobId}")
    @PreAuthorize(value = "hasRole('ADMIN')")
    public String reviewJobPass(@PathVariable(name = "jobId") String jobId) {
        System.out.println("UserController -> reviewJobPass: " + jobId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        userService.reviewJobPass(username, jobId);
        return "passed";
    }

    @PutMapping("/review/{jobId}")
    @PreAuthorize(value = "hasRole('ADMIN')")
    public String reviewJob(@PathVariable(name = "jobId") String jobId) {
        System.out.println("UserController -> reviewJob: " + jobId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        userService.reviewJob(username, jobId);
        return "under reviewed";
    }
}
