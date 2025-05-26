package com.portalempleo.backend.controller;

import com.portalempleo.backend.model.*;
import com.portalempleo.backend.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contract")
public class ContractController {

    private final ContractRepository contractRepository;

    public ContractController(ContractRepository contractRepository){
        this.contractRepository = contractRepository;
    }

    @GetMapping
    public List <Contract> getAllContracts(){
        return contractRepository.findAll();
    }
}
