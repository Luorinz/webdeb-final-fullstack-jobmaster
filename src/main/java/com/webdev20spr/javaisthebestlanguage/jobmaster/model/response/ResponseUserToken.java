package com.webdev20spr.javaisthebestlanguage.jobmaster.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;


@Data
@AllArgsConstructor
public class ResponseUserToken {
    private String token;
    private UserDetails userDetail;
}
