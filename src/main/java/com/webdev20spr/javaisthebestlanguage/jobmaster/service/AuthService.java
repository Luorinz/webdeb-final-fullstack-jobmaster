package com.webdev20spr.javaisthebestlanguage.jobmaster.service;

import com.webdev20spr.javaisthebestlanguage.jobmaster.dao.UserRepository;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.JwtUserDetail;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.ResponseUserToken;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.User;
import com.webdev20spr.javaisthebestlanguage.jobmaster.util.auth.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.*;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.regex.PatternSyntaxException;


@Service
public class AuthService{
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    @Qualifier("CustomUserDetailsService")
    private UserDetailsService userDetailsService;

    @Resource
    private JwtUtils jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.tokenHead}")
    private String tokenHead;



    public JwtUserDetail register(JwtUserDetail userDetail) {
        final String username = userDetail.getUsername();
        if(userRepository.findByUsername(username)!=null) {
            throw new RuntimeException("User already exists");
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        final String rawPassword = userDetail.getPassword();
        userDetail.setPassword(encoder.encode(rawPassword));
        userRepository.insert(new User(userDetail));
        return userDetail;
    }

    public ResponseUserToken login(String username, String password) {
        final Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final JwtUserDetail userDetail = (JwtUserDetail) authentication.getPrincipal();
        final String token = jwtTokenUtil.generateAccessToken(userDetail);
        jwtTokenUtil.putToken(username, token);
        return new ResponseUserToken(token, userDetail);

    }

    public void logout(String token) {
        token = token.substring(tokenHead.length());
        String userName = jwtTokenUtil.getUsernameFromToken(token);
        jwtTokenUtil.deleteToken(userName);
    }



    public JwtUserDetail getUserByToken(String token) {
        token = token.substring(tokenHead.length());
        return jwtTokenUtil.getUserFromToken(token);
    }

    private Authentication authenticate(String username, String password) {
        try {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
            System.out.println("token generated " + token);
            Authentication res = authenticationManager.authenticate(token);
            return res;
        } catch (DisabledException | BadCredentialsException e) {
            throw new RuntimeException("Authentication error");
        }
    }
}
