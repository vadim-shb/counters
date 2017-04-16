package com.vdshb.config;

import com.vdshb.security.CustomUsernamePasswordAuthenticationFilter;
import com.vdshb.security.SecurityUser;
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

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

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
            .addFilter(customUsernamePasswordAuthenticationFilter());
//                .httpBasic();

    // @formatter:on
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(customUsernamePasswordAuthenticationProvider);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        List<AuthenticationProvider> authenticationProviderList = new ArrayList<AuthenticationProvider>();
        authenticationProviderList.add(customUsernamePasswordAuthenticationProvider);
        return new ProviderManager(authenticationProviderList);
    }


    @Bean
    public CustomUsernamePasswordAuthenticationFilter customUsernamePasswordAuthenticationFilter() throws Exception {
        CustomUsernamePasswordAuthenticationFilter result = new CustomUsernamePasswordAuthenticationFilter(new AntPathRequestMatcher("/api/security/sign-in/username-password", "POST"), authenticationManagerBean());
        result.setAuthenticationSuccessHandler(successHandler());
        return result;
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return (request, response, authentication) -> {
            SecurityUser user = (SecurityUser) authentication.getPrincipal();
            response.getWriter().write("{\"accessToken\": \"" + user.getAccessToken() + "\"}");
        };
    }
}
