package com.vdshb.security.service;

import com.vdshb.security.domain.entity.ChangeEmail;
import com.vdshb.security.domain.enums.Language;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class NewEmailConfirmMessageGenerator implements LocalizedMessageGenerator {

    @Value("${app.url}")
    String appUrl;

    public String localizedSubject(Language language) {
        switch (language) {
            case ENGLISH:
                return "HR-paradise email changing confirmation";
            case RUSSIAN:
                return "Подтверждение смены email в HR-paradise";
            default:
                return this.localizedSubject(Language.ENGLISH);
        }
    }

    @Override
    public String localizedHtmlMessage(Language language, Object details) {
        ChangeEmail changeEmail = (ChangeEmail) details;
        switch (language) {
            case ENGLISH:
                return "<html><body>" +
                        EMAIL_HTML_STYLES +
                        "<h2>Hello " + changeEmail.getSecurityUser().getName() + "!</h2>" +
                        "<p>To confirm your new email please follow the link:</p>" +
                        "<a href=\"" + appUrl + "/api/security/change-email/confirm-new-email/" + changeEmail.getNewEmailConfirmationToken() + "\">Confirm new email</a>" +
                        "</body></html>";
            case RUSSIAN:
                return "<html><body>" +
                        EMAIL_HTML_STYLES +
                        "<h2>Здравствуйте " + changeEmail.getSecurityUser().getName() + "!</h2>" +
                        "<p>Для того, чтобы подтвердить правильность нового email, пожалуйста, пройдите по ссылке:</p>" +
                        "<a href=\"" + appUrl + "/api/security/change-email/confirm-new-email/" + changeEmail.getNewEmailConfirmationToken() + "\">Подтвердить email</a>" +
                        "</body></html>";
            default:
                return this.localizedHtmlMessage(Language.ENGLISH, details);
        }
    }

    public String localizedPlainTextMessage(Language language, Object details) {
        ChangeEmail changeEmail = (ChangeEmail) details;
        switch (language) {
            case ENGLISH:
                return "Hello " + changeEmail.getSecurityUser().getName() + "!\n" +
                        "To confirm your new email please follow the link:\n" +
                        appUrl + "/api/security/change-email/confirm-new-email/" + changeEmail.getNewEmailConfirmationToken();
            case RUSSIAN:
                return "Здравствуйте " + changeEmail.getSecurityUser().getName() + "!\n" +
                        "Для того, чтобы подтвердить правильность нового email, пожалуйста, пройдите по ссылке:\n" +
                        appUrl + "/api/security/change-email/confirm-new-email/" + changeEmail.getNewEmailConfirmationToken();
            default:
                return this.localizedPlainTextMessage(Language.ENGLISH, details);
        }
    }
}
