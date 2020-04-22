package com.webdev20spr.javaisthebestlanguage.jobmaster.service;

import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * @author Anda Luo
 * 2020-4-22
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
    @Autowired
    UserService userService;


    @Test
    public void testSaveJob() {
        userService.saveJob("test", "1522485004");
    }

    @Test
    public void testGetJobsByUsername() {
        List<Job> jobs = userService.getSavedJobsByUsername("test");
        System.out.println(jobs.size());
        for (Job job: jobs) {
            System.out.println(job);
        }

    }
}