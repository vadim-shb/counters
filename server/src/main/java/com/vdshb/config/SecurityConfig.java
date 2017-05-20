package com.vdshb.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vdshb.security.*;
import com.vdshb.security.domain.response.AuthenticatedUserResponse;
import com.vdshb.security.domain.entity.SecurityUser;
import com.vdshb.security.repository.SecurityUserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Inject
    private ObjectMapper objectMapper;

    @Inject
    private AccessTokenSecurityContextRepository accessTokenSecurityContextRepository;

    @Inject
    private RefreshTokenAuthenticationProvider refreshTokenAuthenticationProvider;

    @Inject
    private SecurityUserRepository securityUserRepository;

    @Inject
    @Qualifier("EmailPasswordAuthenticationProvider")
    private AuthenticationProvider emailPasswordAuthenticationProvider;

    public SecurityConfig() {
        super(true);
    }

    protected void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http
            .securityContext().securityContextRepository(accessTokenSecurityContextRepository).and()
            .exceptionHandling().authenticationEntryPoint(new Http403ForbiddenEntryPoint()).and()
                .headers().and()

				.sessionManagement().and()
				.securityContext().and()
				.anonymous().and()
				.servletApi().and()
                .csrf().disable()

            .authorizeRequests()
                .antMatchers("/api/security/current-user").authenticated()
                .antMatchers("/api/security/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .addFilter(emailPasswordAuthenticationFilter()) //override UsernamePasswordAuthenticationFilter
            .addFilterAfter(refreshTokenAuthenticationFilter(), EmailPasswordAuthenticationFilter.class)
            .logout()
                .logoutUrl("/api/security/sign-out")
                .logoutSuccessHandler(logoutHandler());

    // @formatter:on
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        List<AuthenticationProvider> authenticationProviderList = new ArrayList<AuthenticationProvider>();
        authenticationProviderList.add(emailPasswordAuthenticationProvider);
        authenticationProviderList.add(refreshTokenAuthenticationProvider);
        return new ProviderManager(authenticationProviderList);
    }

    @Bean
    public EmailPasswordAuthenticationFilter emailPasswordAuthenticationFilter() throws Exception {
        EmailPasswordAuthenticationFilter result = new EmailPasswordAuthenticationFilter(new AntPathRequestMatcher("/api/security/sign-in/email-password", "POST"), authenticationManagerBean());
        result.setAuthenticationSuccessHandler(successHandler());
        return result;
    }

    @Bean
    public RefreshTokenAuthenticationFilter refreshTokenAuthenticationFilter() throws Exception {
        RefreshTokenAuthenticationFilter result = new RefreshTokenAuthenticationFilter(new AntPathRequestMatcher("/api/security/refresh-auth-session", "POST"), authenticationManagerBean());
        result.setAuthenticationSuccessHandler(successHandler());
        return result;
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return (request, response, authentication) -> {
            response.setHeader("content-type","application/json");
            objectMapper.writeValue(response.getWriter(), new AuthenticatedUserResponse(authentication));
        };
    }

    private LogoutSuccessHandler logoutHandler() {
        return (request, response, authentication) -> {
            if (authentication != null) {
                SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
                securityUserRepository.dropAuthTokens(securityUser.getId());
                accessTokenSecurityContextRepository.dropAuthentication(securityUser.getAccessToken());
            }
        };
    }
}
