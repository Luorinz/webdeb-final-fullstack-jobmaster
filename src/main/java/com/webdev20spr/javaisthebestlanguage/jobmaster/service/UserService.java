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

    public List<Job> getSavedJobsByUsername(String username) {
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


    public void deleteJob(String jobId) {
        List<User> users = userRepository.findAll();
        for (User user: users) {
            List<String> savedJobs = new ArrayList<>();
            if (user.getSavedJobs() != null) savedJobs = user.getSavedJobs();
            savedJobs.remove(jobId);
            user.setSavedJobs(savedJobs);
            List<String> postedJobs = new ArrayList<>();
            if (user.getPostedJobs() != null) postedJobs = user.getPostedJobs();
            postedJobs.remove(jobId);
            user.setPostedJobs(postedJobs);
            List<String> reviewedJobs = new ArrayList<>();
            if (user.getReviewedJobs() != null) reviewedJobs = user.getReviewedJobs();
            reviewedJobs.remove(jobId);
            user.setReviewedJobs(reviewedJobs);
            userRepository.save(user);
        }
    }

    public void reviewJob(String username, String jobId) {
        User user = userRepository.findByUsername(username);
        Job job = jobRepository.findJobById(jobId);
        if (user != null && job != null) {
            // user
            List<String> reviewedJobs = new ArrayList<>();
            if (user.getReviewedJobs() != null) reviewedJobs = user.getReviewedJobs();
            if (!reviewedJobs.contains(jobId)) reviewedJobs.add(jobId);
            user.setReviewedJobs(reviewedJobs);
            userRepository.save(user);
            //job
            job.setUnderReview(true);
            jobRepository.save(job);
        }
    }

    public void reviewJobPass(String username, String jobId) {
        User user = userRepository.findByUsername(username);
        Job job = jobRepository.findJobById(jobId);

        if (user != null && job != null) {
            List<String> reviewedJobs = new ArrayList<>();
            if (user.getReviewedJobs() != null) reviewedJobs = user.getReviewedJobs();
            reviewedJobs.remove(jobId);
            user.setReviewedJobs(reviewedJobs);
            userRepository.save(user);
            // job
            job.setUnderReview(false);
            jobRepository.save(job);
        }
    }

    public List<Job> getReviewedJobs(String username) {
        User user = userRepository.findByUsername(username);
        List<Job> ret = new ArrayList<>();
        if (user != null) {
            List<String> jobIds = user.getReviewedJobs();
            if (jobIds == null) return ret;
            for (String jobId: jobIds) {
                Job job = jobRepository.findJobById(jobId);
                ret.add(job);
            }
        }
        return ret;
    }

    public List<Job> getPostedJobs(String username) {
        User user = userRepository.findByUsername(username);
        List<Job> ret = new ArrayList<>();
        if (user != null) {
            List<String> jobIds = user.getPostedJobs();
            if (jobIds == null) return ret;
            for (String jobId: jobIds) {
                Job job = jobRepository.findJobById(jobId);
                ret.add(job);
            }
        }
        return ret;
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }
}
