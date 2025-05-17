package com.TTCS.AviationRoutesApplication.exceptions;

public class AviationException extends RuntimeException {
    public AviationException(String message) {
        super(message);
    }

    public AviationException(String message, Throwable cause) {
        super(message, cause);
    }
} 