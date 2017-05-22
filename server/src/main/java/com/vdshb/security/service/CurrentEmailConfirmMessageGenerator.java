package com.vdshb.security.service;

import com.vdshb.security.domain.entity.ChangeSecurityUserEmail;
import com.vdshb.security.domain.enums.Language;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CurrentEmailConfirmMessageGenerator implements LocalizedMessageGenerator {

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
        ChangeSecurityUserEmail changeSecurityUserEmail = (ChangeSecurityUserEmail) details;
        switch (language) {
            case ENGLISH:
                return "<html><body>" +
                        EMAIL_HTML_STYLES +
                        "<h2>Hello " + changeSecurityUserEmail.getSecurityUser().getName() + "!</h2>" +
                        "<p>You started procedure of changing your email address to " + changeSecurityUserEmail.getNewEmail() + "</p>" +
                        "<p>If you don't want to change the email, please ignore this message</p>" +
                        "<p>To confirm your new email please follow the link:</p>" +
                        "<a href=\"" + appUrl + "/api/security/change-email/confirm-current-email/" + changeSecurityUserEmail.getCurrentEmailConfirmationToken() + "\">Confirm new email</a>" +
                        "</body></html>";
            case RUSSIAN:
                return "<html><body>" +
                        EMAIL_HTML_STYLES +
                        "<h2>Здравствуйте " + changeSecurityUserEmail.getSecurityUser().getName() + "!</h2>" +
                        "<p>Вы начали процедуру смены email адреса на " + changeSecurityUserEmail.getNewEmail() + "</p>" +
                        "<p>Для того, чтобы подтвердить правильность нового email, пожалуйста, пройдите по ссылке:</p>" +
                        "<a href=\"" + appUrl + "/api/security/change-email/confirm-current-email/" + changeSecurityUserEmail.getCurrentEmailConfirmationToken() + "\">Подтвердить email</a>" +
                        "</body></html>";
            default:
                return this.localizedHtmlMessage(Language.ENGLISH, details);
        }
    }

    public String localizedPlainTextMessage(Language language, Object details) {
        ChangeSecurityUserEmail changeSecurityUserEmail = (ChangeSecurityUserEmail) details;
        switch (language) {
            case ENGLISH:
                return "Hello " + changeSecurityUserEmail.getSecurityUser().getName() + "!\n" +
                        "You started procedure of changing your email address to " + changeSecurityUserEmail.getNewEmail() + "\n" +
                        "If you don't want to change the email, please ignore this message\n" +
                        "To confirm your new email please follow the link:\n" +
                        appUrl + "/api/security/change-email/confirm-current-email/" + changeSecurityUserEmail.getCurrentEmailConfirmationToken();
            case RUSSIAN:
                return "Здравствуйте " + changeSecurityUserEmail.getSecurityUser().getName() + "!\n" +
                        "Вы начали процедуру смены email адреса на " + changeSecurityUserEmail.getNewEmail() + "\n" +
                        "Для того, чтобы подтвердить правильность нового email, пожалуйста, пройдите по ссылке:\n" +
                        appUrl + "/api/security/change-email/confirm-current-email/" + changeSecurityUserEmail.getCurrentEmailConfirmationToken();
            default:
                return this.localizedPlainTextMessage(Language.ENGLISH, details);
        }
    }
}
