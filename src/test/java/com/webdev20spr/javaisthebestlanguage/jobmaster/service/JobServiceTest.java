package com.webdev20spr.javaisthebestlanguage.jobmaster.service;

import com.webdev20spr.javaisthebestlanguage.jobmaster.model.response.APIResponse;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * @author Anda Luo
 * 2020-4-9
 */
@RunWith(SpringRunner.class)
@SpringBootTest()
public class JobServiceTest {

    @Autowired
    private JobService jobService;


    @Test
    public void testGetJobsFromDatabase() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<APIResponse> response = restTemplate.getForEntity("https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=9b00ad3b&app_key=c8ed9e11915df1bf35073edffe3ca60a&what=Google Software Engineer", APIResponse.class);
        System.out.println(response);
    }

    @Test
    public void testGetJobsFromAPI() {
        List<Job> jobs = jobService.getJobsFromAPI("Software Engineer");
        System.out.println(jobs.get(5));
        System.out.println(jobs.size());
    }

    @Test
    public void testSearchLocalJobsByKeyword() {
        List<Job> jobs = jobService.searchLocalJobs("West");
        for (Job job : jobs) {
            System.out.println(job);
        }
    }



}