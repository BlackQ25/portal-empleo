package com.portalempleo.backend.controller;

import com.portalempleo.backend.model.*;
import com.portalempleo.backend.dto.*;
import com.portalempleo.backend.service.UserService;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * ejemplo de POST esperado:
     * {
     *   "user": {
     *              "email": "test@example.com",
     *              "password": "12345",
     *              "role": "CANDIDATE"
     *           },
     *
     *   "roleData": {
     *              "name": "John Doe",
     *              "phone": "600111222", ...
     *              }
     * }
     */
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserWithRoleRequest request) {
        User createdUser = userService.createUser(request.getUser(), request.getRoleData());
        return ResponseEntity.ok(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
