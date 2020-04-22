package com.webdev20spr.javaisthebestlanguage.jobmaster.dao;

import com.webdev20spr.javaisthebestlanguage.jobmaster.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Anda Luo
 * 2020-4-4
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);

    User insert(User user);

}
