package com.vdshb.controllers;

import com.vdshb.domain.Resume;
import com.vdshb.repositories.ResumeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResumeController {

    private final ResumeRepository resumeRepository;

    public ResumeController(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    @GetMapping("/api/resume/{resumeId}")
    public Resume getResume(@PathVariable Long resumeId) {
        return resumeRepository.findOne(resumeId);
    }

    @GetMapping("/api/resumes")
    public Iterable<Resume> getResumes() {
        return resumeRepository.findAll();
    }
}
