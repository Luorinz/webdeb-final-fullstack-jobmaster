package com.webdev20spr.javaisthebestlanguage.jobmaster.controller;

import com.sun.deploy.net.HttpResponse;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
import com.webdev20spr.javaisthebestlanguage.jobmaster.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    @GetMapping("/localjob")
    public List<Job> getLocalJobs() {
        return jobService.getJobsFromDatabase();
    }

    @GetMapping("/apijob/{keyword}")
    public List<Job> getAPIJobs(@PathVariable(name = "keyword") String keyword) {
        return jobService.getJobsFromAPI(keyword);
    }
}
