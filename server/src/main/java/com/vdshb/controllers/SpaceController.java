package com.vdshb.controllers;

import com.vdshb.domain.CountPoint;
import com.vdshb.domain.Space;
import com.vdshb.repository.CountPointRepository;
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
    private CountPointRepository countPointRepository;

    @GetMapping("/api/spaces")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Space>> getSpaces(@RequestParam Long userId) {
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!securityUser.getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        List<Space> result = spaceRepository.findByUserId(userId);
        result.forEach(space -> space.setCountPoints(countPointRepository.findBySpaceId(space.getId())));
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
        result.setCountPoints(countPointRepository.findBySpaceId(spaceId));
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
        List<CountPoint> countPoints = space.getCountPoints();
        for (CountPoint countPoint : countPoints) {
            addCount(persistedSpace, countPoint);
        }
        return persistedSpace;
    }

    private void addCount(Space parentSpace, CountPoint countPoint) {
        countPoint.setId(null);
        countPoint.setSpaceId(parentSpace.getId());
        countPointRepository.save(countPoint);
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
        List<CountPoint> oldCountPoints = countPointRepository.findBySpaceId(spaceId);
        removeCounts(oldCountPoints, newSpace.getCountPoints());
        updateCounts(oldCountPoints, newSpace.getCountPoints());
        addCounts(persistedSpace, newSpace.getCountPoints());

        persistedSpace.setCountPoints(countPointRepository.findBySpaceId(spaceId));
        return ResponseEntity.ok(persistedSpace);
    }

    // todo: check if works
    private void removeCounts(List<CountPoint> oldCountPoints, List<CountPoint> newCountPoints) {
        oldCountPoints.stream()
                .filter(countPoint -> !countPoint.containedByIdIn(newCountPoints))
                .forEach(countPoint -> countPointRepository.delete(countPoint));
    }

    // todo: check if works
    private void updateCounts(List<CountPoint> oldCountPoints, List<CountPoint> newCountPoints) {
        newCountPoints.forEach(newCountPoint -> {
            newCountPoint.getByIdFrom(oldCountPoints).ifPresent(oldCountPoint -> {
                oldCountPoint.setBeanPropertiesFromRestUpdate(newCountPoint);
                countPointRepository.save(oldCountPoint);
            });
        });
    }

    // todo: check if works
    private void addCounts(Space space, List<CountPoint> newCountPoints) {
        newCountPoints.stream()
                .filter(countPoint -> countPoint.getId() == null)
                .forEach(countPoint -> addCount(space, countPoint));
    }

}
