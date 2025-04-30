package com.portalempleo.backend.service;

import com.portalempleo.backend.model.User;
import com.portalempleo.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    public List<User> getAllUsers() {
        return userRepository.findAll();

    }

    public User saveUser(User user) {
        return userRepository.save(user);

    }
}
