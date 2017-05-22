package com.vdshb.security.service;

import com.vdshb.security.domain.entity.PasswordRecovery;
import com.vdshb.security.domain.enums.Language;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PasswordRecoveryLocalizedMessageGenerator implements LocalizedMessageGenerator {

    @Value("${app.url}")
    String appUrl;

    public String localizedSubject(Language language) {
        switch (language) {
            case ENGLISH:
                return "HR-paradise password recovery";
            case RUSSIAN:
                return "Восстановление забытого паролья в HR-paradise";
            default:
                return this.localizedSubject(Language.ENGLISH);
        }
    }

    public String localizedHtmlMessage(Language language, Object details) {
        PasswordRecovery passwordRecovery = (PasswordRecovery) details;
        switch (language) {
            case ENGLISH:
                return "<html><body>" +
                        EMAIL_HTML_STYLES +
                        "<h2>Recovery password</h2>" +
                        "<p>If you don't started recovery process, please just ignore this letter</p>" +
                        "<p>To confirm password recovery process please follow the link:</p>" +
                        "<a href=\"" + appUrl + "/api/security/password-recovery-confirmation/" + passwordRecovery.getEmailConfirmationToken() + "\">Recovery password</a>" +
                        "</body></html>";
            case RUSSIAN:
                return "<html><body>" +
                        EMAIL_HTML_STYLES +
                        "<h2>Восстановление пароля</h2>" +
                        "<p>Если вы не собираетесь восстанавливать пароль, пожалуйста проигнорируйте это письмо</p>" +
                        "<p>Для завершения восстановления пароля, пройдите по ссылке:</p>" +
                        "<a href=\"" + appUrl + "/api/security/password-recovery-confirmation/" + passwordRecovery.getEmailConfirmationToken() + "\">Сменить пароль</a>" +
                        "</body></html>";
            default:
                return this.localizedHtmlMessage(Language.ENGLISH, details);
        }
    }

    public String localizedPlainTextMessage(Language language, Object details) {
        PasswordRecovery passwordRecovery = (PasswordRecovery) details;
        switch (language) {
            case ENGLISH:
                return "Recovery password\n" +
                        "If you don't started recovery process, please just ignore this letter.\n" +
                        "To confirm password recovery process please follow the link:\n" +
                        appUrl + "/api/security/password-recovery-confirmation/" + passwordRecovery.getEmailConfirmationToken();
            case RUSSIAN:
                return "Восстановление пароля.\n" +
                        "Если вы не собираетесь восстанавливать пароль, пожалуйста проигнорируйте это письмо\n" +
                        "Для завершения восстановления пароля, пройдите по ссылке:\n" +
                        appUrl + "/api/security/password-recovery-confirmation/" + passwordRecovery.getEmailConfirmationToken();
            default:
                return this.localizedPlainTextMessage(Language.ENGLISH, details);
        }
    }
}
