package com.example.careercrafter.restcontrollers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.careercrafter.dto.AuthRequestDTO;
import com.example.careercrafter.dto.AuthResponseDTO;
import com.example.careercrafter.dto.UserRegistrationDTO;
import com.example.careercrafter.services.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AuthRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }

    
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody UserRegistrationDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }
}
