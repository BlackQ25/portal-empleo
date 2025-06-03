package com.portalempleo.backend.service;

import com.portalempleo.backend.model.Candidate;
import com.portalempleo.backend.repository.CandidateRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;

    public CandidateService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Optional<Candidate> getCandidateById(Long userId) {
        return candidateRepository.findById(userId);
    }

    public Candidate saveCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    public Candidate updateCandidate(Long userId, Candidate updatedCandidate) {
        return candidateRepository.findById(userId)
                .map(candidate -> {
                    candidate.setName(updatedCandidate.getName());
                    candidate.setPhone(updatedCandidate.getPhone());
                    candidate.setAddress(updatedCandidate.getAddress());
                    candidate.setResumePath(updatedCandidate.getResumePath());
                    candidate.setSkills(updatedCandidate.getSkills());
                    candidate.setExperience(updatedCandidate.getExperience());
                    candidate.setBirthDate(updatedCandidate.getBirthDate());
                    return candidateRepository.save(candidate);
                })
                .orElseThrow(() -> new IllegalArgumentException("Candidato no encontrado"));
    }

    public void deleteCandidate(Long userId) {
        candidateRepository.deleteById(userId);
    }

    public Candidate updateCandidateWithResume(Long id, Candidate updatedData, MultipartFile resumeFile) throws IOException {
        Candidate existing = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidato no encontrado"));

        existing.setName(updatedData.getName());
        existing.setPhone(updatedData.getPhone());
        existing.setAddress(updatedData.getAddress());
        existing.setBirthDate(updatedData.getBirthDate());
        existing.setSkills(updatedData.getSkills());
        existing.setExperience(updatedData.getExperience());

        if (resumeFile != null && !resumeFile.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + resumeFile.getOriginalFilename();
            Path uploadDir = Paths.get("uploads/resumes");
            Files.createDirectories(uploadDir);
            try {
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path filePath = uploadDir.resolve(fileName);
                resumeFile.transferTo(filePath);

                existing.setResumePath(fileName);
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Error al guardar el currículum", e);
            }
        }

        return candidateRepository.save(existing);
    }

    public void deleteResume(Long id) {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidato no encontrado"));

        String resumePath = candidate.getResumePath();
        if (resumePath != null) {
            try {
                Path filePath = Paths.get(resumePath).normalize();
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                throw new RuntimeException("Error al eliminar archivo", e);
            }
        }

        candidate.setResumePath(null);
        candidateRepository.save(candidate);
    }

}
