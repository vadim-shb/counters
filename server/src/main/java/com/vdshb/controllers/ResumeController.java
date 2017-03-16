package com.vdshb.controllers;

import com.vdshb.domain.Resume;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResumeController {

    @GetMapping("/api/resume")
    public Resume getResume() {
        Resume result = new Resume();
        result.setId(12L);
        return result;
    }
//    @GetMapping("/api/resume/{resumeId}")
//    public Resume getResume(@PathVariable Long resumeId) {
//        Resume result = new Resume();
//        result.setId(resumeId);
//        return result;
//    }
}
