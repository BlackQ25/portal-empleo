package com.portalempleo.backend.controller;

import com.portalempleo.backend.model.User;
import com.portalempleo.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;

    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();

    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);

    }
}
