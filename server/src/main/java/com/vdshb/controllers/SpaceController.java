package com.vdshb.controllers;

import com.vdshb.domain.Count;
import com.vdshb.domain.Space;
import com.vdshb.repository.CountRepository;
import com.vdshb.repository.SpaceRepository;
import com.vdshb.security.SecurityUserToken;
import com.vdshb.security.domain.entity.SecurityUser;
import com.vdshb.security.domain.enums.SecurityRole;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;

@RestController
public class SpaceController {

    @Inject
    private SpaceRepository spaceRepository;

    @Inject
    private CountRepository countRepository;

    @GetMapping("/api/spaces")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Space>> getSpaces(@RequestParam Long userId) {
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!securityUser.getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        List<Space> result = spaceRepository.findByUserId(userId);
        result.forEach(space -> space.setCounts(countRepository.findBySpaceId(space.getId())));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/api/space/{spaceId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Space> getSpace(@PathVariable Long spaceId) {
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Space result = spaceRepository.findOne(spaceId);
        if (!securityUser.getId().equals(result.getUserId())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        result.setCounts(countRepository.findBySpaceId(spaceId));
        return ResponseEntity.ok(result);
    }

    @PostMapping("/api/space")
    @PreAuthorize("hasRole('USER')")
    @Transactional
    public Space createSpace(@RequestBody Space space) {
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        space.setId(null);
        space.setUserId(securityUser.getId());
        Space persistedSpace = spaceRepository.save(space);
        List<Count> counts = space.getCounts();
        for (Count count : counts) {
            addCount(persistedSpace, count);
        }
        return persistedSpace;
    }

    private void addCount(Space parentSpace, Count count) {
        count.setId(null);
        count.setSpaceId(parentSpace.getId());
        countRepository.save(count);
    }

    @PutMapping("/api/space/{spaceId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @Transactional
    public ResponseEntity<Space> updateSpace(@PathVariable Long spaceId, @RequestBody Space newSpace) {
        SecurityUserToken securityUserToken = (SecurityUserToken) SecurityContextHolder.getContext().getAuthentication();
        Space persistedSpace = spaceRepository.findOne(spaceId);
        if (!securityUserToken.getPrincipal().getId().equals(persistedSpace.getUserId()) && !securityUserToken.hasRole(SecurityRole.ADMIN)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        if (securityUserToken.hasRole(SecurityRole.ADMIN)) {
            persistedSpace.setBeanPropertiesFromRestUpdate(newSpace);
        }
        spaceRepository.save(persistedSpace);
        List<Count> oldCounts = countRepository.findBySpaceId(spaceId);
        removeCounts(oldCounts, newSpace.getCounts());
        updateCounts(oldCounts, newSpace.getCounts());
        addCounts(persistedSpace, newSpace.getCounts());

        persistedSpace.setCounts(countRepository.findBySpaceId(spaceId));
        return ResponseEntity.ok(persistedSpace);
    }

    // todo: check if works
    private void removeCounts(List<Count> oldCounts, List<Count> newCounts) {
        oldCounts.stream()
                .filter(count -> !count.containedByIdIn(newCounts))
                .forEach(count -> countRepository.delete(count));
    }

    // todo: check if works
    private void updateCounts(List<Count> oldCounts, List<Count> newCounts) {
        newCounts.forEach(newCount -> {
            newCount.getByIdFrom(oldCounts).ifPresent(oldCount -> {
                oldCount.setBeanPropertiesFromRestUpdate(newCount);
                countRepository.save(oldCount);
            });
        });
    }

    // todo: check if works
    private void addCounts(Space space, List<Count> newCounts) {
        newCounts.stream()
                .filter(count -> count.getId() == null)
                .forEach(count -> addCount(space, count));
    }

}
