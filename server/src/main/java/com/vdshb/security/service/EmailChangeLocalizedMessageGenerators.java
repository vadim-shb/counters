package com.vdshb.security.service;

import org.springframework.stereotype.Service;

import javax.inject.Inject;

@Service
public class EmailChangeLocalizedMessageGenerators {

    @Inject
    public NewEmailConfirmMessageGenerator newEmailConfirmMessageGenerator;

    @Inject
    public LocalizedMessageGenerator currentEmailConfirmMessageGenerator;
}
