package com.vdshb.controllers;

import com.vdshb.domain.Readout;
import com.vdshb.repository.CountRepository;
import com.vdshb.repository.ReadoutRepository;
import com.vdshb.security.domain.entity.SecurityUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@RestController
public class ReadoutController {

    @Inject
    private ReadoutRepository readoutRepository;

    @Inject
    private CountRepository countRepository;

    @PostMapping("/api/readouts")
    @PreAuthorize("hasRole('USER')")
    @Transactional
    public ResponseEntity<List<Readout>> createSpace(@RequestBody List<Readout> readouts) {
        if (isIllegalReadouts(readouts)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        Instant creationDateTime = Instant.now();
        readouts.forEach(readout -> {
            readout.setCreationDateTime(creationDateTime);
            readoutRepository.save(readout);
        });
        return ResponseEntity.ok(readouts);
    }

    private boolean isIllegalReadouts(List<Readout> readouts) {
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Set<Long> userCounts = countRepository.findUserCountIds(securityUser.getId());
        return readouts.stream().anyMatch(readout -> !userCounts.contains(readout.getCountId()));
    }

}
