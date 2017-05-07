package com.vdshb.security.controller;

import com.vdshb.security.domain.SignUpRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignUpController {

    private Logger log = LoggerFactory.getLogger(SignUpController.class);

    @PostMapping("/api/security/sign-up")
    public void signUp(@RequestBody SignUpRequest signUpRequest) {
        log.info("***************************");
        log.info(signUpRequest.getName());
        log.info(signUpRequest.getEmail());
        log.info(signUpRequest.getPassword());
        log.info(signUpRequest.getLanguage().name());
        log.info("***************************");
    }
}
