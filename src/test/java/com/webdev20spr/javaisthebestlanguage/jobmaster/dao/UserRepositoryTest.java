package com.webdev20spr.javaisthebestlanguage.jobmaster.dao;

import com.webdev20spr.javaisthebestlanguage.jobmaster.dao.UserRepository;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author Anda Luo
 * 2020-4-4
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testGetUserByUsername() {
        System.out.println(userRepository.findByUsername("user1"));
    }

    @Test
    public void testInsertUser() {
//        User user = new User();
//        userRepository.save(user);
    }
}
