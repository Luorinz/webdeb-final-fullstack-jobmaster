package com.webdev20spr.javaisthebestlanguage.jobmaster.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Anda Luo
 * 2020-4-7
 */
@RestController
public class UserController {
    @GetMapping("/test")
    public String test() {
        return "Test";
    }

    @PostMapping("/login")
    public String login() {
        return "login!";
    }
}
