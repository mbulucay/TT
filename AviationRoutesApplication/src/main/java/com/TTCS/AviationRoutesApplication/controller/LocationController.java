package com.TTCS.AviationRoutesApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.TTCS.AviationRoutesApplication.dto.LocationDto;
import com.TTCS.AviationRoutesApplication.services.LocationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/locations")
@Tag(name = "Location Controller", description = "APIs for managing locations")
public class LocationController {
    
    private final LocationService locationService;
    
    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    @Operation(summary = "Get all locations", description = "Returns a list of all locations")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved locations")
    public ResponseEntity<List<LocationDto>> getAllLocations() {
        List<LocationDto> locations = locationService.getAllLocations();
        return ResponseEntity.ok(locations);
    }
    
    @GetMapping("/{id}")
    @Operation(
        summary = "Get location by ID", 
        description = "Returns a location by ID or 404 if not found"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Successfully retrieved location",
            content = @Content(schema = @Schema(implementation = LocationDto.class))
        ),
        @ApiResponse(
            responseCode = "404", 
            description = "Location not found",
            content = @Content(schema = @Schema(implementation = String.class))
        )
    })
    public ResponseEntity<?> getLocationById(@PathVariable Long id) {
        try {
            LocationDto location = locationService.getLocationById(id);
            return new ResponseEntity<>(location, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/code/{locationCode}")
    @Operation(summary = "Get location by code", description = "Returns a location by location code")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved location"),
            @ApiResponse(responseCode = "404", description = "Location not found")
    })
    public ResponseEntity<?> getLocationByCode(@PathVariable String locationCode) {
        try {
            LocationDto location = locationService.getLocationByCode(locationCode);
            return ResponseEntity.ok(location);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search locations", description = "Search locations by country, city, or name")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved locations")
    public ResponseEntity<List<LocationDto>> searchLocations(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String name) {
        
        List<LocationDto> locations;
        
        if (country != null) {
            locations = locationService.getLocationsByCountry(country);
        } else if (city != null) {
            locations = locationService.getLocationsByCity(city);
        } else if (name != null) {
            locations = locationService.searchLocationsByName(name);
        } else {
            locations = locationService.getAllLocations();
        }
        
        return ResponseEntity.ok(locations);
    }
    
    @PostMapping
    @Operation(summary = "Create location", description = "Creates a new location")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Location created successfully",
                    content = @Content(schema = @Schema(implementation = LocationDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<?> createLocation(@Valid @RequestBody LocationDto locationDto) {
        try {
            LocationDto createdLocation = locationService.createLocation(locationDto);
            return new ResponseEntity<>(createdLocation, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update location", description = "Updates an existing location")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Location updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "404", description = "Location not found")
    })
    public ResponseEntity<?> updateLocation(@PathVariable Long id, @Valid @RequestBody LocationDto locationDto) {
        try {
            LocationDto updatedLocation = locationService.updateLocation(id, locationDto);
            return ResponseEntity.ok(updatedLocation);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete location", description = "Deletes a location by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Location deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Location not found")
    })
    public ResponseEntity<?> deleteLocation(@PathVariable Long id) {
        try {
            locationService.deleteLocation(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}