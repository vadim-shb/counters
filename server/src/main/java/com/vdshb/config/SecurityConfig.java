package com.vdshb.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vdshb.security.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
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

    private AuthenticationProvider customUsernamePasswordAuthenticationProvider;

    public SecurityConfig(
            @Qualifier("CustomUsernamePasswordAuthenticationProvider") AuthenticationProvider customUsernamePasswordAuthenticationProvider
    ) {
        super(true);
        this.customUsernamePasswordAuthenticationProvider = customUsernamePasswordAuthenticationProvider;
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
                .antMatchers("/api/security/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .addFilter(customUsernamePasswordAuthenticationFilter())
            .addFilterAfter(refreshTokenAuthenticationFilter(), CustomUsernamePasswordAuthenticationFilter.class);
//                .httpBasic();

    // @formatter:on
    }

    //todo: try without it
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.authenticationProvider(customUsernamePasswordAuthenticationProvider);
//        auth.authenticationProvider(refreshTokenAuthenticationProvider);
//    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        List<AuthenticationProvider> authenticationProviderList = new ArrayList<AuthenticationProvider>();
        authenticationProviderList.add(customUsernamePasswordAuthenticationProvider);
        authenticationProviderList.add(refreshTokenAuthenticationProvider);
        return new ProviderManager(authenticationProviderList);
    }

    @Bean
    public CustomUsernamePasswordAuthenticationFilter customUsernamePasswordAuthenticationFilter() throws Exception {
        CustomUsernamePasswordAuthenticationFilter result = new CustomUsernamePasswordAuthenticationFilter(new AntPathRequestMatcher("/api/security/sign-in/username-password", "POST"), authenticationManagerBean());
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
            SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
            objectMapper.writeValue(response.getWriter(), new AuthenticatedUserResponse(securityUser));
        };
    }
}
