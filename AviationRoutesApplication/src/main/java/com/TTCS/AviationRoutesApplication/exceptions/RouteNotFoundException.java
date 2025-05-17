package com.TTCS.AviationRoutesApplication.exceptions;

public class RouteNotFoundException extends AviationException {
    public RouteNotFoundException(String message) {
        super(message);
    }

    public RouteNotFoundException(Long id) {
        super("Route not found with id: " + id);
    }
} 