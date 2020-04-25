package com.webdev20spr.javaisthebestlanguage.jobmaster.service;

import com.webdev20spr.javaisthebestlanguage.jobmaster.dao.JobRepository;
import com.webdev20spr.javaisthebestlanguage.jobmaster.dao.UserRepository;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.User;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.response.APIResponse;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Anda Luo
 * 2020-4-7
 */
@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;



    public List<Job> getJobsFromDatabase() {
        return jobRepository.findAll();
    }


    public List<Job> getJobsFromAPI(String keyword) {
        RestTemplate restTemplate = new RestTemplate();
        String uri = "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=9b00ad3b&app_key=c8ed9e11915df1bf35073edffe3ca60a&results_per_page=50&what=" + keyword;
        ResponseEntity<APIResponse> response = restTemplate.getForEntity(uri, APIResponse.class);
        if (response.getBody() == null || response.getBody().getCount() == 0 || response.getBody().getResults() == null || response.getBody().getResults().size() == 0) {
            return new ArrayList<>();
        }
        return response.getBody().getResults();
    }

    public Job getJob(String jobId) {
        return jobRepository.findJobById(jobId);
    }

    public Job postJob(Job jobRequest) {
        Job job = jobRepository.findJobById(jobRequest.getId());
        if (job != null) return job;
        return jobRepository.save(jobRequest);
    }

    public List<Job> searchLocalJobs(String keyword) {
        return jobRepository.searchJob(keyword);
    }

    public void deleteJob(String jobId) {
        jobRepository.deleteJobById(jobId);
    }
}
