package com.vdshb.security.scheduler;

import com.vdshb.security.domain.entity.PasswordRecovery;
import com.vdshb.security.repository.PasswordRecoveryRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Component
public class PasswordRecoveryCleanScheduler {

    @Value("${security.email-password-recovery-token-expiration-time:}")
    private int passwordRecoveryTokenExpirationTime;

    @Inject
    private PasswordRecoveryRepository passwordRecoveryRepository;

    @Scheduled(cron = "${security.expired-tokens-clean-time}")
    public void cleanChangeEmail() {
        LocalDateTime borderDateTime = LocalDateTime.ofInstant(Instant.now().minusSeconds(passwordRecoveryTokenExpirationTime), ZoneOffset.UTC);
        List<PasswordRecovery> expiredPasswordRecoveries = passwordRecoveryRepository.findCreatedBefore(borderDateTime);
        passwordRecoveryRepository.delete(expiredPasswordRecoveries);
    }
}
