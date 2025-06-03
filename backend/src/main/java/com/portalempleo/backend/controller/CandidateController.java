package com.portalempleo.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portalempleo.backend.model.Candidate;
import com.portalempleo.backend.service.CandidateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/candidate")
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping
    public List<Candidate> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable Long id) {
        return candidateService.getCandidateById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Candidate createCandidate(@RequestBody Candidate candidate) {
        return candidateService.saveCandidate(candidate);
    }

    @PutMapping("/{id}")
    public Candidate updateCandidate(@PathVariable Long id, @RequestBody Candidate candidate) {
        return candidateService.updateCandidate(id, candidate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id) {
        candidateService.deleteCandidate(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update-with-resume/{id}")
    public ResponseEntity<?> updateCandidateWithResume(
            @PathVariable Long id,
            @RequestPart("data") String dataJson,
            @RequestPart(value = "resume", required = false) MultipartFile resumeFile) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            Candidate updatedData = mapper.readValue(dataJson, Candidate.class);
            Candidate updated = candidateService.updateCandidateWithResume(id, updatedData, resumeFile);
            return ResponseEntity.ok(updated);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al procesar datos JSON o archivo: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete-resume/{id}")
    public ResponseEntity<String> deleteResume(@PathVariable Long id) {
        try {
            candidateService.deleteResume(id);
            return ResponseEntity.ok("Currículum eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar currículum: " + e.getMessage());
        }
    }



}
