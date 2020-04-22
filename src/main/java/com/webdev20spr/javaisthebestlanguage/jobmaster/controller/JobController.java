package com.webdev20spr.javaisthebestlanguage.jobmaster.controller;

import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
import com.webdev20spr.javaisthebestlanguage.jobmaster.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Anda Luo
 * 2020-4-7
 */
@RestController
@RequestMapping("/job")
public class JobController {
    @Autowired
    private JobService jobService;

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


}
