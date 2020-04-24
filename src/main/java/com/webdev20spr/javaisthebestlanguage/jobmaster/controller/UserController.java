package com.webdev20spr.javaisthebestlanguage.jobmaster.controller;

import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.User;
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
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JobService jobService;


    @GetMapping("username/{username}")
    public User getUser(@PathVariable(name = "username") String username) {
        System.out.println("UserController -> getUser: " + username);
        return userService.getUser(username);
    }

    @PostMapping("save/{jobId}")
    public String saveJob(@PathVariable(name = "jobId") String jobId) {
        System.out.println("UserController -> saveJob: " + jobId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        userService.saveJob(username, jobId);
        return "saved";
    }

    @PostMapping("unsave/{jobId}")
    public String unsaveJob(@PathVariable(name = "jobId") String jobId) {
        System.out.println("UserController -> saveJob: " + jobId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        userService.unsaveJob(username, jobId);
        return "unsaved";
    }

    @GetMapping("/jobs")
    public List<Job> getCurrentUserSavedJobs() {
        System.out.println("UserController -> getUserJobs: ");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        return userService.getSavedJobsByUsername(username);
    }

    @PutMapping("/update/role")
    @PreAuthorize(value = "hasRole('ADMIN')")
    public String updateUserRole(@RequestParam(name = "username") String username,@RequestParam(name = "role") String role) {
        System.out.println("UserController -> updateUserRole");
        userService.updateUserRole(username, role);
        return "updated";
    }
    @PutMapping("/update")
    public User updateUserRole(@RequestBody User user) {
        System.out.println("UserController -> updateUserRole");
        if (user == null) {
            return null;
        }
        return userService.updateUser(user);
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

    @PutMapping("/updatejob")
    @PreAuthorize(value = "hasRole('ADV_USER') || hasRole('ADMIN')")
    public Job updateJob(@RequestBody Job jobRequest) {
        System.out.println("UserController -> UpdateJob: " + jobRequest);
        return userService.updateJob(jobRequest);
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

    @GetMapping("/review/jobs")
    @PreAuthorize(value = "hasRole('ADMIN')")
    public List<Job> getReviewedJobs() {
        System.out.println("UserController -> getReviewedJobs: ");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        return userService.getReviewedJobs(username);
    }

    @GetMapping("/post/jobs")
    @PreAuthorize(value = "hasRole('ADV_USER') || hasRole('ADMIN')")
    public List<Job> getPostedJobs() {
        System.out.println("UserController -> getPostedJobs: ");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null || username.length() == 0) throw new RuntimeException("cannot get logged in user");
        return userService.getPostedJobs(username);
    }
}
