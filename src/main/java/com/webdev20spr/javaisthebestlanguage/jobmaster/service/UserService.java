package com.webdev20spr.javaisthebestlanguage.jobmaster.service;

import com.webdev20spr.javaisthebestlanguage.jobmaster.dao.UserRepository;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Anda Luo
 * 2020-4-7
 */
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User addUser(User user) {
        return userRepository.save(user);
    }
}
