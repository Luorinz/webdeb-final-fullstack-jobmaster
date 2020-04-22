package com.webdev20spr.javaisthebestlanguage.jobmaster.service;

import com.webdev20spr.javaisthebestlanguage.jobmaster.dao.JobRepository;
import com.webdev20spr.javaisthebestlanguage.jobmaster.dao.UserRepository;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Anda Luo
 * 2020-4-7
 */
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JobRepository jobRepository;

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public void saveJob(String username, String jobId) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            List<String> jobIds = new ArrayList<>();
            if (user.getSavedJobs() != null) jobIds = user.getSavedJobs();
            if (!jobIds.contains(jobId)) jobIds.add(jobId);
            user.setSavedJobs(jobIds);
            userRepository.save(user);
        }
    }

    public List<Job> getJobsByUsername(String username) {
        List<Job> ret = new ArrayList<>();
        User user = userRepository.findByUsername(username);
        if (user == null) return ret;
        List<String> jobIds = user.getSavedJobs();
        if (jobIds == null) return ret;
        for (String jobId : jobIds) {
            Job job = jobRepository.findJobById(jobId);
            if (job != null) {
                ret.add(job);
            }
        }

        return ret;

    }

    public void updateUserRole(String username, String role) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            user.setRole(role);
            userRepository.save(user);
        }

    }

    public void postJob(String username, String jobId) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            List<String> postedJobs = new ArrayList<>();
            if (user.getPostedJobs() != null) postedJobs = user.getPostedJobs();
            if (!postedJobs.contains(jobId)) {
                postedJobs.add(jobId);
            }
            user.setPostedJobs(postedJobs);
            userRepository.save(user);
        }
    }
}
