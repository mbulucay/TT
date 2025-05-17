package com.TTCS.AviationRoutesApplication.exceptions;

public class LocationNotFoundException extends AviationException {
    public LocationNotFoundException(String message) {
        super(message);
    }

    public LocationNotFoundException(Long id) {
        super("Location not found with id: " + id);
    }
} 