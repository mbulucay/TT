package com.TTCS.AviationRoutesApplication.exceptions;

public class DuplicateLocationException extends AviationException {
    public DuplicateLocationException(String message) {
        super(message);
    }

    public DuplicateLocationException(String name, String code) {
        super("Location already exists with name: " + name + " or code: " + code);
    }
} 