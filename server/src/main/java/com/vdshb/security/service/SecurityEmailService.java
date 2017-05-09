package com.vdshb.security.service;

import com.vdshb.security.domain.InactiveSecurityUser;
import com.vdshb.security.domain.Language;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SecurityEmailService {

    private Logger log = LoggerFactory.getLogger(SecurityEmailService.class);

    @Value("${app.url}")
    String appUrl;
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

    public void sendEmailConfirmation(InactiveSecurityUser inactiveSecurityUser) {
        String subject = localizedEmailConfirmationSubject(inactiveSecurityUser.getLanguage());
        String textMessage = localizedEmailConfirmationPlainTextMessage(inactiveSecurityUser.getLanguage(), inactiveSecurityUser.getEmailConfirmationToken());
        String htmlMessage = localizedEmailConfirmationHtmlMessage(inactiveSecurityUser.getLanguage(), inactiveSecurityUser.getEmailConfirmationToken());
        if (isMock) {
            log.info("================ sent Email ================");
            log.info("Subject: " + subject);
            log.info("Text Message: " + textMessage);
            log.info("============================================");
        } else {
            try {
                HtmlEmail email = new HtmlEmail();
                email.setHostName(host);
                email.setSslSmtpPort(port);
                email.setSSLCheckServerIdentity(isSsl);
                email.setStartTLSRequired(isTls);
                email.addTo(inactiveSecurityUser.getEmail(), inactiveSecurityUser.getName());
                email.setAuthentication(user, password);
                email.setSubject(subject);
                email.setHtmlMsg(htmlMessage);
                email.setTextMsg(textMessage);
                email.send();
            } catch (EmailException e) {
                log.error("Couldn't send email to " + inactiveSecurityUser.getEmail(), e);
            }
        }
    }

    private String localizedEmailConfirmationSubject(Language language) {
        switch (language) {
            case ENGLISH:
                return "HR-paradise registration confirmation";
            case RUSSIAN:
                return "Подтверждение регистрации в HR-paradise";
            default:
                return localizedEmailConfirmationSubject(Language.ENGLISH);
        }
    }

    private String localizedEmailConfirmationHtmlMessage(Language language, String emailConfirmationToken) {
        switch (language) {
            case ENGLISH:
                return "<html><body>" +
                        "<style>" +
                        "    body {" +
                        "        font-family: Arial, Helvetica, sans-serif;" +
                        "        font-size: 20px;" +
                        "        margin: 20px;" +
                        "    }" +
                        "    p {" +
                        "        display: inline-block;" +
                        "        margin-right: 10px;" +
                        "    }" +
                        "    h2 {" +
                        "        margin-bottom: 30px;" +
                        "    }" +
                        "    div {" +
                        "        margin-bottom: 15px;" +
                        "    }" +
                        "    a {" +
                        "        text-decoration: none;" +
                        "        color: #337ab7;" +
                        "        font-weight: 400;" +
                        "    }" +
                        "    a:hover {" +
                        "        color: #23527c;" +
                        "        text-decoration: underline;" +
                        "    }" +
                        "</style>" +
                        "<h2>Welcome to HR-paradise!</h2>" +
                        "<p>To activate your account please follow the link:</p>" +
                        "<a href=\"" + appUrl + "/api/security/confirm-user-email/" + emailConfirmationToken + "\">Activate the account</a>" +
                        "</body></html>";
            case RUSSIAN:
                return "<html><body>" +
                        "<style>" +
                        "    body {" +
                        "        font-family: Arial, Helvetica, sans-serif;" +
                        "        font-size: 20px;" +
                        "        margin: 20px;" +
                        "    }" +
                        "    p {" +
                        "        display: inline-block;" +
                        "        margin-right: 10px;" +
                        "    }" +
                        "    h2 {" +
                        "        margin-bottom: 30px;" +
                        "    }" +
                        "    div {" +
                        "        margin-bottom: 15px;" +
                        "    }" +
                        "    a {" +
                        "        text-decoration: none;" +
                        "        color: #337ab7;" +
                        "        font-weight: 400;" +
                        "    }" +
                        "    a:hover {" +
                        "        color: #23527c;" +
                        "        text-decoration: underline;" +
                        "    }" +
                        "</style>" +
                        "<h2>Добро пожалловать в HR-paradise!</h2>" +
                        "<p>Для того, чтобы активировать свой аккаунт, пожалуйста, пройдите по ссылке:</p>" +
                        "<a href=\"" + appUrl + "/api/security/confirm-user-email/" + emailConfirmationToken + "\">Активировать аккаунт</a>" +
                        "</body></html>";
            default:
                return localizedEmailConfirmationHtmlMessage(Language.ENGLISH, emailConfirmationToken);
        }
    }

    private String localizedEmailConfirmationPlainTextMessage(Language language, String emailConfirmationToken) {
        switch (language) {
            case ENGLISH:
                return "Welcome to HR-paradise!\n" +
                        "To activate your account please follow the link:\n" +
                        appUrl + "/api/security/confirm-user-email/" + emailConfirmationToken;
            case RUSSIAN:
                return "Добро пожалловать в HR-paradise!\n" +
                        "Для того, чтобы активировать свой аккаунт, пожалуйста, пройдите по ссылке:\n" +
                        appUrl + "/api/security/confirm-user-email/" + emailConfirmationToken;
            default:
                return localizedEmailConfirmationPlainTextMessage(Language.ENGLISH, emailConfirmationToken);
        }
    }
}
