package com.TTCS.AviationRoutesApplication.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.TTCS.AviationRoutesApplication.dto.RouteDto;
import com.TTCS.AviationRoutesApplication.dto.request.RouteRequestDto;
import com.TTCS.AviationRoutesApplication.dto.response.RouteResponseDto;
import com.TTCS.AviationRoutesApplication.services.RouteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/routes")
@Tag(name = "Route Controller", description = "APIs for managing and searching travel routes")
public class RouteController {
    
    private final RouteService routeService;
    
    @Autowired
    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping
    @Operation(summary = "Get all routes", description = "Returns a list of all routes")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved routes")
    public ResponseEntity<List<RouteDto>> getAllRoutes() {
        List<RouteDto> routes = routeService.getAllRoutes();
        return ResponseEntity.ok(routes);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get route by ID", description = "Returns a route by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved route"),
            @ApiResponse(responseCode = "404", description = "Route not found")
    })
    public ResponseEntity<?> getRouteById(@PathVariable Long id) {
        try {
            RouteDto route = routeService.getRouteById(id);
            return ResponseEntity.ok(route);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search routes", description = "Search routes by origin and destination")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved routes")
    public ResponseEntity<List<RouteDto>> searchRoutes(
            @RequestParam String originLocationCode,
            @RequestParam String destinationLocationCode) {
        
        List<RouteDto> routes = routeService.getRoutesByOriginAndDestination(
                originLocationCode, destinationLocationCode);
        
        return ResponseEntity.ok(routes);
    }
    @PostMapping("/find")
    @Operation(summary = "Find routes by criteria", description = "Find routes matching the specified criteria")
    @ApiResponse(responseCode = "200", description = "Successfully found routes")
    public ResponseEntity<List<RouteResponseDto>> findRoutes(@Valid @RequestBody RouteRequestDto routeRequest) {
        List<RouteResponseDto> routes = routeService.findRoutes(routeRequest);
        return ResponseEntity.ok(routes);
    }
    
    @PostMapping
    @Operation(summary = "Create route", description = "Creates a new route")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Route created successfully",
                    content = @Content(schema = @Schema(implementation = RouteDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<?> createRoute(@Valid @RequestBody RouteDto routeDto) {
        try {
            RouteDto createdRoute = routeService.createRoute(routeDto);
            return new ResponseEntity<>(createdRoute, HttpStatus.CREATED);
        } catch (EntityNotFoundException | IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update route", description = "Updates an existing route")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Route updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "404", description = "Route not found")
    })
    public ResponseEntity<?> updateRoute(@PathVariable Long id, @Valid @RequestBody RouteDto routeDto) {
        try {
            RouteDto updatedRoute = routeService.updateRoute(id, routeDto);
            return ResponseEntity.ok(updatedRoute);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete route", description = "Deletes a route by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Route deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Route not found")
    })
    public ResponseEntity<?> deleteRoute(@PathVariable Long id) {
        try {
            routeService.deleteRoute(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}