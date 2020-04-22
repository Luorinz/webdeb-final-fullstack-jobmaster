package com.webdev20spr.javaisthebestlanguage.jobmaster.dao;

import com.webdev20spr.javaisthebestlanguage.jobmaster.model.Job;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

import static org.junit.Assert.*;

/**
 * @author Anda Luo
 * 2020-4-7
 */
@RunWith(SpringRunner.class)
@SpringBootTest()
public class JobRepositoryTest {
    @Autowired
    private JobRepository jobRepository;

    @Test
    public void addJob() {
        Job job = new Job();
        job.setTitle("testJob");
//        job.setCompany("testCompany");
        job.setDescription("test");
        jobRepository.save(job);
    }

    @Test
    public void testGetAllJobs() {
        addJob();
        jobRepository.findAll();
    }


    @Test
    public void testInsertJob() {

    }
}