package com.vdshb.security.service;

import com.vdshb.security.domain.entity.InactiveSecurityUser;
import com.vdshb.security.domain.enums.Language;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailConfirmationLocalizedMessageGenerator implements LocalizedMessageGenerator {

    @Value("${app.url}")
    String appUrl;

    public String localizedSubject(Language language) {
        switch (language) {
            case ENGLISH:
                return "Счётчики ЖКХ. Registration confirmation";
            case RUSSIAN:
                return "Счётчики ЖКХ. Подтверждение регистрации";
            default:
                return this.localizedSubject(Language.ENGLISH);
        }
    }

    @Override
    public String localizedHtmlMessage(Language language, Object details) {
        InactiveSecurityUser inactiveSecurityUser = (InactiveSecurityUser) details;
        switch (language) {
            case ENGLISH:
                return "<html><body>" +
                        EMAIL_HTML_STYLES +
                        "<h2>Welcome to \"Счётчики ЖКХ\"!</h2>" +
                        "<p>To activate your account please follow the link:</p>" +
                        "<a href=\"" + appUrl + "/api/security/confirm-user-email/" + inactiveSecurityUser.getEmailConfirmationToken() + "\">Activate the account</a>" +
                        "</body></html>";
            case RUSSIAN:
                return "<html><body>" +
                        EMAIL_HTML_STYLES +
                        "<h2>Добро пожаловать в \"Счётчики ЖКХ\"!</h2>" +
                        "<p>Для того, чтобы активировать свой аккаунт, пожалуйста, пройдите по ссылке:</p>" +
                        "<a href=\"" + appUrl + "/api/security/confirm-user-email/" + inactiveSecurityUser.getEmailConfirmationToken() + "\">Активировать аккаунт</a>" +
                        "</body></html>";
            default:
                return this.localizedHtmlMessage(Language.ENGLISH, details);
        }
    }

    @Override
    public String localizedPlainTextMessage(Language language, Object details) {
        InactiveSecurityUser inactiveSecurityUser = (InactiveSecurityUser) details;
        switch (language) {
            case ENGLISH:
                return "Welcome to \"Счётчики ЖКХ\"!\n" +
                        "To activate your account please follow the link:\n" +
                        appUrl + "/api/security/confirm-user-email/" + inactiveSecurityUser.getEmailConfirmationToken();
            case RUSSIAN:
                return "Добро пожалловать в \"Счётчики ЖКХ\"!\n" +
                        "Для того, чтобы активировать свой аккаунт, пожалуйста, пройдите по ссылке:\n" +
                        appUrl + "/api/security/confirm-user-email/" + inactiveSecurityUser.getEmailConfirmationToken();
            default:
                return this.localizedPlainTextMessage(Language.ENGLISH, details);
        }
    }
}
