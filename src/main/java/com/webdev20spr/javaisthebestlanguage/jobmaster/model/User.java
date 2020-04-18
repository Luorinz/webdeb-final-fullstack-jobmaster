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
    private String _id;
    private String username;
    private String email;
    private String phone;

    // authentication
    /**
     * A user can have different userGroup:
     * 	1 = Guest
     * 	2 = User
     * 	3 = Advanced_user
     * 	4 = Admin
     */
    private Integer userGroup;
    private String password;

    // other information
    private String thumbnail;
    private String description;

    private List<String> savedJobs; // for all
    private List<String> postedJobs; // for advanced-user
    private List<String> reviewedJobs; // for admin

}
