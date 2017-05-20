package com.vdshb.security.service;

import com.vdshb.security.domain.enums.Language;
import org.springframework.stereotype.Service;

@Service
public interface LocalizedMessageGenerator {

    public String localizedSubject(Language language);

    public String localizedHtmlMessage(Language language, String emailConfirmationToken);

    public String localizedPlainTextMessage(Language language, String emailConfirmationToken);
}
