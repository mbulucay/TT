package com.TTCS.AviationRoutesApplication.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

import com.TTCS.AviationRoutesApplication.dto.TransportationDto;
import com.TTCS.AviationRoutesApplication.enums.TransportationType;
import com.TTCS.AviationRoutesApplication.services.TransportationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/transportations")
@Tag(name = "Transportation Controller", description = "APIs for managing transportations")
public class TransportationController {
    
    private final TransportationService transportationService;
    
    @Autowired
    public TransportationController(TransportationService transportationService) {
        this.transportationService = transportationService;
    }

    @GetMapping
    @Operation(summary = "Get all transportations", description = "Returns a list of all transportations")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved transportations")
    public ResponseEntity<List<TransportationDto>> getAllTransportations() {
        List<TransportationDto> transportations = transportationService.getAllTransportations();
        return ResponseEntity.ok(transportations);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get transportation by ID", description = "Returns a transportation by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved transportation"),
            @ApiResponse(responseCode = "404", description = "Transportation not found")
    })
    public ResponseEntity<?> getTransportationById(@PathVariable Long id) {
        try {
            TransportationDto transportation = transportationService.getTransportationById(id);
            return ResponseEntity.ok(transportation);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/type/{type}")
    @Operation(summary = "Get transportations by type", description = "Returns transportations of a specific type")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved transportations")
    public ResponseEntity<List<TransportationDto>> getTransportationsByType(
            @PathVariable TransportationType type) {
        List<TransportationDto> transportations = transportationService.getTransportationsByType(type);
        return ResponseEntity.ok(transportations);
    }
    
    @PostMapping
    @Operation(summary = "Create transportation", description = "Creates a new transportation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Transportation created successfully",
                    content = @Content(schema = @Schema(implementation = TransportationDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<?> createTransportation(@Valid @RequestBody TransportationDto transportationDto) {
        try {
            TransportationDto createdTransportation = transportationService.createTransportation(transportationDto);
            return new ResponseEntity<>(createdTransportation, HttpStatus.CREATED);
        } catch (IllegalArgumentException | EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update transportation", description = "Updates an existing transportation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Transportation updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "404", description = "Transportation not found")
    })
    public ResponseEntity<?> updateTransportation(
            @PathVariable Long id, 
            @Valid @RequestBody TransportationDto transportationDto) {
        try {
            TransportationDto updatedTransportation = transportationService.updateTransportation(id, transportationDto);
            return ResponseEntity.ok(updatedTransportation);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete transportation", description = "Deletes a transportation by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Transportation deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Transportation not found")
    })
    public ResponseEntity<?> deleteTransportation(@PathVariable Long id) {
        try {
            transportationService.deleteTransportation(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}