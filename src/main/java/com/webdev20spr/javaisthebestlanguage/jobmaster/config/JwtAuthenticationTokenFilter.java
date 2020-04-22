package com.webdev20spr.javaisthebestlanguage.jobmaster.config;


import com.webdev20spr.javaisthebestlanguage.jobmaster.util.auth.JwtUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.annotation.Resource;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Value("${jwt.header}")
    private String token_header;

    @Resource
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String auth_token = request.getHeader(this.token_header);
        System.out.println("jwtfilter -> dofilter -> auth_token = " + auth_token);
        final String auth_token_start = "Bearer ";
        if (auth_token != null && auth_token.length() != 0 && auth_token.startsWith(auth_token_start)) {
            auth_token = auth_token.substring(auth_token_start.length());
        } else {
            auth_token = null;
        }

        String username = jwtUtils.getUsernameFromToken(auth_token);

        logger.info(String.format("Checking authentication for userDetail %s.", username));

        if (jwtUtils.containToken(username, auth_token) && username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetail = jwtUtils.getUserFromToken(auth_token);
            if (jwtUtils.validateToken(auth_token, userDetail)) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetail, null, userDetail.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                logger.info(String.format("Authenticated userDetail %s, setting security context", username));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        chain.doFilter(request, response);
    }
}
