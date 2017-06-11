package com.vdshb.controllers;

import com.vdshb.domain.Count;
import com.vdshb.domain.Space;
import com.vdshb.repository.CountRepository;
import com.vdshb.repository.SpaceRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;

@RestController
public class SpaceController {

    @Inject
    private SpaceRepository spaceRepository;
    @Inject
    private CountRepository countRepository;

//    @GetMapping("/api/towns")
//    public List<Town> getTowns() {
//        List<Town> towns = IteratorUtils.toList(townRepository.findAll().iterator());
//        towns.sort(Comparator.comparing(Town::getName));
//        return towns;
//    }

    @PostMapping("/api/space")
    @PreAuthorize("hasRole('USER')")
    @Transactional
    public Space createSpace(@RequestBody Space space) {
        space.setId(null);
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
