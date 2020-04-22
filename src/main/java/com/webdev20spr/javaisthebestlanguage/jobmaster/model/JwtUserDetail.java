package com.webdev20spr.javaisthebestlanguage.jobmaster.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * @author Anda Luo
 * 2020-4-18
 */
public class JwtUserDetail implements UserDetails {

    private String username;
    private String password;
    private String email;
    private String role;

    public JwtUserDetail(String username) {
        this.username = username;
    }

    public JwtUserDetail(String username, String password, String email, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
    }

    public JwtUserDetail(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.role = user.getRole();
    }

    public JwtUserDetail(String username, String role) {
        this.username = username;
        this.role = role;
    }

    public JwtUserDetail(String username, String email, String role) {
        this.username = username;
        this.role = role;
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
