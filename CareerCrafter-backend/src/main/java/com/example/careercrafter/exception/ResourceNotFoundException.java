package com.example.careercrafter.exception;

public class ResourceNotFoundException extends RuntimeException 
{
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
