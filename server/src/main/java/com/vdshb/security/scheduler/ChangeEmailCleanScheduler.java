package com.vdshb.security.scheduler;

import com.vdshb.security.domain.entity.ChangeEmail;
import com.vdshb.security.repository.ChangeEmailRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Component
public class ChangeEmailCleanScheduler {

    @Value("${security.email-confirmation-token-expiration-time}")
    private int emailTokenExpirationTime;

    @Inject
    private ChangeEmailRepository changeEmailRepository;

    @Scheduled(cron = "${security.expired-tokens-clean-time}")
    public void cleanChangeEmail() {
        LocalDateTime borderDateTime = LocalDateTime.ofInstant(Instant.now().minusSeconds(emailTokenExpirationTime), ZoneOffset.UTC);
        List<ChangeEmail> expiredChanges = changeEmailRepository.findCreatedBefore(borderDateTime);
        changeEmailRepository.delete(expiredChanges);
    }
}
