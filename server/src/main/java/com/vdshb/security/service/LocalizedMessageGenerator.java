package com.vdshb.security.service;

import com.vdshb.security.domain.enums.Language;
import org.springframework.stereotype.Service;

@Service
public interface LocalizedMessageGenerator {

    String EMAIL_HTML_STYLES = "<style>" +
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
            "</style>";

    String localizedSubject(Language language);

    String localizedHtmlMessage(Language language, Object details);

    String localizedPlainTextMessage(Language language, Object details);
}
