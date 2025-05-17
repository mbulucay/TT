package com.TTCS.AviationRoutesApplication.exceptions;

public class TransportationNotFoundException extends AviationException {
    public TransportationNotFoundException(String message) {
        super(message);
    }

    public TransportationNotFoundException(Long id) {
        super("Transportation not found with id: " + id);
    }
} 