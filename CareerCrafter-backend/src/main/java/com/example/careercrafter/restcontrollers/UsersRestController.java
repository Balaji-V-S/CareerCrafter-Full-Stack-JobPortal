package com.example.careercrafter.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.careercrafter.entities.Users;
import com.example.careercrafter.services.IUsersService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UsersRestController {

    @Autowired
    private IUsersService userService;

    // Get user details by email
    @GetMapping("/by-email") //done
    public Users getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }
}
