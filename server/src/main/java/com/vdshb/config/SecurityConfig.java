package com.vdshb.config;

import com.vdshb.security.AccessTokenAuthenticationFilter;
import com.vdshb.security.AccessTokenAuthenticationProvider;
import com.vdshb.security.UsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthenticationProvider usernamePasswordAuthenticationProvider;
    private final AuthenticationProvider accessTokenAuthenticationProvider;

    public SecurityConfig(
            @Qualifier("CustomUsernamePasswordAuthenticationProvider") AuthenticationProvider usernamePasswordAuthenticationProvider,
            AccessTokenAuthenticationProvider accessTokenAuthenticationProvider
    ) {
        super(true);
        this.usernamePasswordAuthenticationProvider = usernamePasswordAuthenticationProvider;
        this.accessTokenAuthenticationProvider = accessTokenAuthenticationProvider;
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
            .addFilterBefore(new UsernamePasswordAuthenticationFilter(new AntPathRequestMatcher("/api/security/sign-in/username-password", "POST")), UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new AccessTokenAuthenticationFilter(AnyRequestMatcher.INSTANCE), AccessTokenAuthenticationFilter.class)
            .authenticationProvider(usernamePasswordAuthenticationProvider)
            .authenticationProvider(accessTokenAuthenticationProvider);
//                .httpBasic();

        super.configure(http);
    // @formatter:on
    }

}
