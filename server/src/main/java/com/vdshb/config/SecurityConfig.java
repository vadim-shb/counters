package com.vdshb.config;

import com.vdshb.security.UsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthenticationProvider usernamePasswordAuthenticationProvider;

    public SecurityConfig(@Qualifier("UsernamePasswordAuthenticationProvider") AuthenticationProvider usernamePasswordAuthenticationProvider) {
        super(true);
        this.usernamePasswordAuthenticationProvider = usernamePasswordAuthenticationProvider;
    }

    protected void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http
            .exceptionHandling()
                .authenticationEntryPoint(new Http403ForbiddenEntryPoint())
            .and()
            .headers().and()
            .sessionManagement().and()
            .securityContext().and()
            .anonymous().and()
            .servletApi().and()

            .authorizeRequests()
                .antMatchers("/api/security/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .addFilterBefore(new UsernamePasswordAuthenticationFilter(new AntPathRequestMatcher("/api/security/sign-in/username-password", "POST")), org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
            .authenticationProvider(usernamePasswordAuthenticationProvider);
//                .httpBasic();

        super.configure(http);
    // @formatter:on
    }

}
