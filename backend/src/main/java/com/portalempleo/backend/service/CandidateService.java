package com.portalempleo.backend.service;

import com.portalempleo.backend.model.Candidate;
import com.portalempleo.backend.repository.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
                    candidate.setResume(updatedCandidate.getResume());
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
}
