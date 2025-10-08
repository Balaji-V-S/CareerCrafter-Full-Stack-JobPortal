package com.example.careercrafter.exception;

public class UserNotFoundException extends RuntimeException 
{
    public UserNotFoundException(String message) {
        super(message);
    }
}