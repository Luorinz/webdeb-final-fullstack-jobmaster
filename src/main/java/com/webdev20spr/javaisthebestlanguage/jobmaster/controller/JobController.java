package com.webdev20spr.javaisthebestlanguage.jobmaster.controller;

import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
import com.webdev20spr.javaisthebestlanguage.jobmaster.service.JobService;
import com.webdev20spr.javaisthebestlanguage.jobmaster.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Anda Luo
 * 2020-4-7
 */
@RestController
@CrossOrigin
@RequestMapping("/job")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private UserService userService;

    @GetMapping("/search/localjob")
    public List<Job> getAllLocalJobs() {
        return jobService.getJobsFromDatabase();
    }

    @GetMapping("/search/localjob/{keyword}")
    // TODO: a minor bug here, cannot search area properly
    public List<Job> searchLocalJobs(@PathVariable(name = "keyword") String keyword) {
        return jobService.searchLocalJobs(keyword);
    }

    @GetMapping("/search/apijob/{keyword}")
    public List<Job> searchAPIJobs(@PathVariable(name = "keyword") String keyword) {
        return jobService.getJobsFromAPI(keyword);
    }

    @GetMapping("/search/{jobId}")
    public Job getJob(@PathVariable(name = "jobId") String jobId) {
        return jobService.getJob(jobId);
    }






}
