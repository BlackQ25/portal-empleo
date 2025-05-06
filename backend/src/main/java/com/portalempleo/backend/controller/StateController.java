package com.portalempleo.backend.controller;

import com.portalempleo.backend.model.State;
import com.portalempleo.backend.repository.StateRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/states")
public class StateController {

    private final StateRepository stateRepository;

    public StateController(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    @GetMapping
    public List<State> getAllStates() {
        return stateRepository.findAll();
    }
}
