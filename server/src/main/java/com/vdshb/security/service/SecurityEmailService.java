package com.vdshb.security.service;

import com.vdshb.security.domain.InactiveSecurityUser;
import com.vdshb.security.domain.Language;
import com.vdshb.security.domain.PasswordRecovery;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

@Service
public class SecurityEmailService {

    private Logger log = LoggerFactory.getLogger(SecurityEmailService.class);

    @Value("${smtp.mock}")
    boolean isMock;
    @Value("${smtp.host}")
    String host;
    @Value("${smtp.user}")
    String user;
    @Value("${smtp.password}")
    String password;
    @Value("${smtp.port}")
    String port;
    @Value("${smtp.ssl}")
    boolean isSsl;
    @Value("${smtp.tls}")
    boolean isTls;

    @Inject
    EmailConfirmationLocalizedMessageGenerator emailConfirmationLocalizedMessageGenerator;

    @Inject
    PasswordRecoveryLocalizedMessageGenerator passwordRecoveryLocalizedMessageGenerator;

    public void sendEmailAddressConfirmationEmail(InactiveSecurityUser inactiveSecurityUser) {
        String subject = emailConfirmationLocalizedMessageGenerator.localizedSubject(inactiveSecurityUser.getLanguage());
        String textMessage = emailConfirmationLocalizedMessageGenerator.localizedPlainTextMessage(inactiveSecurityUser.getLanguage(), inactiveSecurityUser.getEmailConfirmationToken());
        String htmlMessage = emailConfirmationLocalizedMessageGenerator.localizedHtmlMessage(inactiveSecurityUser.getLanguage(), inactiveSecurityUser.getEmailConfirmationToken());
        sendEmail(inactiveSecurityUser.getEmail(), inactiveSecurityUser.getName(), subject, textMessage, htmlMessage);
    }

    public void sendPasswordRecoveryEmail(PasswordRecovery passwordRecovery) {
        Language language = passwordRecovery.getSecurityUser().getLanguage();
        String subject = passwordRecoveryLocalizedMessageGenerator.localizedSubject(language);
        String textMessage = passwordRecoveryLocalizedMessageGenerator.localizedPlainTextMessage(language, passwordRecovery.getEmailConfirmationToken());
        String htmlMessage = passwordRecoveryLocalizedMessageGenerator.localizedHtmlMessage(language, passwordRecovery.getEmailConfirmationToken());
        sendEmail(passwordRecovery.getSecurityUser().getEmail(), passwordRecovery.getSecurityUser().getName(), subject, textMessage, htmlMessage);
    }

    private void sendEmail(String emailAddress, String userName, String subject, String textMessage, String htmlMessage) {
        if (isMock) {
            log.info("================ sent Email ================");
            log.info("Subject: " + subject);
            log.info("Text Message:\n" + textMessage);
            log.info("============================================");
        } else {
            try {
                HtmlEmail email = new HtmlEmail();
                email.setHostName(host);
                email.setSslSmtpPort(port);
                email.setSSLCheckServerIdentity(isSsl);
                email.setStartTLSRequired(isTls);
                email.addTo(emailAddress, userName);
                email.setAuthentication(user, password);
                email.setSubject(subject);
                email.setHtmlMsg(htmlMessage);
                email.setTextMsg(textMessage);
                email.send();
            } catch (EmailException e) {
                log.error("Couldn't send email to " + emailAddress, e);
            }
        }
    }

}
