package com.vdshb.security.service;

import com.vdshb.security.domain.Language;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailConfirmationLocalizedMessageGenerator implements LocalizedMessageGenerator {

    @Value("${app.url}")
    String appUrl;

    public String localizedSubject(Language language) {
        switch (language) {
            case ENGLISH:
                return "HR-paradise registration confirmation";
            case RUSSIAN:
                return "Подтверждение регистрации в HR-paradise";
            default:
                return this.localizedSubject(Language.ENGLISH);
        }
    }

    public String localizedHtmlMessage(Language language, String emailConfirmationToken) {
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
                return this.localizedHtmlMessage(Language.ENGLISH, emailConfirmationToken);
        }
    }

    public String localizedPlainTextMessage(Language language, String emailConfirmationToken) {
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
                return this.localizedPlainTextMessage(Language.ENGLISH, emailConfirmationToken);
        }
    }
}
