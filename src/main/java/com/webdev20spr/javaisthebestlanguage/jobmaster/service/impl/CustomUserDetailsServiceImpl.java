package com.webdev20spr.javaisthebestlanguage.jobmaster.service.impl;


import com.webdev20spr.javaisthebestlanguage.jobmaster.dao.UserRepository;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.JwtUserDetail;
import com.webdev20spr.javaisthebestlanguage.jobmaster.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component(value="CustomUserDetailsService")
public class CustomUserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;


    @Override
    public JwtUserDetail loadUserByUsername(String name) throws UsernameNotFoundException {
        System.out.println("user detail service: " + name);
        User user = userRepository.findByUsername(name);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No userDetail found with username '%s'.", name));
        }
        JwtUserDetail userDetail = new JwtUserDetail(user);
        return userDetail;
    }
}
