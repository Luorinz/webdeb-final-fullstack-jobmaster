package com.webdev20spr.javaisthebestlanguage.jobmaster.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * @author JoeTao
 * createAt: 2018/9/17
 */
@Data
@AllArgsConstructor
public class ResponseUserToken {
    private String token;
    private UserDetails userDetail;
}
