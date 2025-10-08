package com.example.careercrafter.exception;

public class EmailAlreadyExistsException extends RuntimeException 
{
    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
