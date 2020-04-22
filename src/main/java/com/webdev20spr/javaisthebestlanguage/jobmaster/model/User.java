package com.webdev20spr.javaisthebestlanguage.jobmaster.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


/**
 * @author Anda Luo
 * 2020-4-4
 */
@Data
@Document(collection = "users")
public class User {
    // index
    @Id
    private String id;
    private String username;
    private String email;
    private String phone;

    // authentication
    private String role;
    private String password;

    // other information
    private String thumbnail;
    private String description;

    private List<String> savedJobs;
    private List<String> postedJobs;
    private List<String> reviewedJobs;

    public User(JwtUserDetail userDetail) {
        this.username = userDetail.getUsername();
        this.password = userDetail.getPassword();
        this.role = userDetail.getRole();
        this.email = userDetail.getEmail();
    }

    public User() {
    }
}
