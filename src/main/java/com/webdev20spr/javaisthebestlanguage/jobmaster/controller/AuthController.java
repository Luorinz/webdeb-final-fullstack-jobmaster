package com.webdev20spr.javaisthebestlanguage.jobmaster.controller;


import com.webdev20spr.javaisthebestlanguage.jobmaster.model.JwtUserDetail;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.ResponseUserToken;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.UserRequest;
import com.webdev20spr.javaisthebestlanguage.jobmaster.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * @author JoeTao
 * createAt: 2018/9/17
 */

@RestController
@RequestMapping("/api/v1")
public class AuthController {
    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private AuthService authService;


    @PostMapping(value = "/login")
    public ResponseUserToken login(@RequestBody UserRequest user) {
        return authService.login(user.getUsername(), user.getPassword());
    }

    @GetMapping(value = "/logout")
    public String logout(HttpServletRequest request) {
        String token = request.getHeader(tokenHeader);
        if (token == null) {
            return "error";
        }
        authService.logout(token);
        return "logged out";
    }

    @GetMapping(value = "/user")
    @PreAuthorize("hasRole('ADMIN')")
    public JwtUserDetail getUser(HttpServletRequest request) {
        String token = request.getHeader(tokenHeader);
        System.out.println("usercontroller -> getUser -> token = " + token);
        if (token == null) {
//            return ResultJson.failure(ResultCode.UNAUTHORIZED);
            return null;
        }
        JwtUserDetail userDetail = authService.getUserByToken(token);
        return userDetail;
    }

    @PostMapping(value = "/register")
    public JwtUserDetail register(@RequestBody UserRequest user) {
//        if (StringUtils.isAnyBlank(user.getName(), user.getPassword())) {
//            return ResultJson.failure(ResultCode.BAD_REQUEST);
//        }
        System.out.println("register" + user);
        JwtUserDetail userDetail = new JwtUserDetail(user.getUsername(), user.getPassword(), "GUEST");
        return authService.register(userDetail);
    }

}
