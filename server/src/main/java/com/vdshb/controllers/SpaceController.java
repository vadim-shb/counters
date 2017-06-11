package com.vdshb.controllers;

import com.vdshb.domain.Count;
import com.vdshb.domain.Space;
import com.vdshb.repository.CountRepository;
import com.vdshb.repository.SpaceRepository;
import com.vdshb.security.domain.entity.SecurityUser;
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
    public ResponseEntity<List<Space>> getTowns(@RequestParam Long userId) {
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!securityUser.getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        List<Space> result = spaceRepository.findByUserId(userId);
        result.forEach(space -> space.setCounts(countRepository.findBySpaceId(space.getId())));
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
            count.setId(null);
            count.setSpaceId(persistedSpace.getId());
            countRepository.save(count);
        }
        return persistedSpace;
    }

//    @PutMapping("/api/town/{townId}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Town> updateTown(@PathVariable Long townId, @RequestBody Town town) {
//        Town persistedTown = townRepository.findOne(townId);
//        if (persistedTown == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//        persistedTown.setBeanPropertiesFromRestUpdate(town);
//        townRepository.save(persistedTown);
//        return ResponseEntity.ok(persistedTown);
//    }
//
//    @DeleteMapping("/api/town/{townId}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public void deleteTown(@PathVariable Long townId) {
//        townRepository.delete(townId);
//    }

}
