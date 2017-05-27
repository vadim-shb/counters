package com.vdshb.security.scheduler;

import com.vdshb.security.domain.entity.InactiveSecurityUser;
import com.vdshb.security.repository.InactiveSecurityUserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Component
public class InactiveSecurityUserCleanScheduler {

    @Value("${security.email-confirmation-token-expiration-time}")
    private int emailTokenExpirationTime;

    @Inject
    private InactiveSecurityUserRepository inactiveSecurityUserRepository;

    @Scheduled(cron = "${security.expired-tokens-clean-time}")
    public void cleanChangeEmail() {
        LocalDateTime borderDateTime = LocalDateTime.ofInstant(Instant.now().minusSeconds(emailTokenExpirationTime), ZoneOffset.UTC);
        List<InactiveSecurityUser> expiredRegistrations = inactiveSecurityUserRepository.findCreatedBefore(borderDateTime);
        inactiveSecurityUserRepository.delete(expiredRegistrations);
    }
}
