package com.vdshb.controllers;

import com.vdshb.domain.Town;
import com.vdshb.repositories.TownRepository;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

@RestController
public class TownController {

    @Inject
    private TownRepository townRepository;

//    @GetMapping("/api/town/{townId}")
//    public Town getTown(@PathVariable Long townId) {
//        return townRepository.findOne(townId);
//    }
//
//    @GetMapping("/api/towns")
//    public Iterable<Town> getTowns() {
//        return townRepository.findAll();
//    }

    @PostMapping("/api/town")
    public Town createTown(@RequestBody Town town) {
        return townRepository.save(town);
    }

}
