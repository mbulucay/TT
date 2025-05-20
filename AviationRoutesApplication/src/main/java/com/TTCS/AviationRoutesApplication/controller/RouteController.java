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
    
    @GetMapping("/api/search")
    @Operation(summary = "Search routes", description = "Search routes by origin and destination using either location codes or location IDs")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved routes"),
        @ApiResponse(responseCode = "400", description = "Invalid parameters provided")
    })
    public ResponseEntity<List<RouteResponseDto>> searchRoutes(
            @RequestParam(required = false) String originLocationCode,
            @RequestParam(required = false) String destinationLocationCode,
            @RequestParam(required = false) Long originLocationId,
            @RequestParam(required = false) Long destinationLocationId) {
        
        // If location codes are provided, use them
        if (originLocationCode != null && destinationLocationCode != null) {
            List<RouteResponseDto> routes = routeService.getRoutesByOriginAndDestination(
                    originLocationCode, destinationLocationCode);
            return ResponseEntity.ok(routes);
        }
        
        // If location IDs are provided, use them
        if (originLocationId != null && destinationLocationId != null) {
            List<RouteResponseDto> routes = routeService.getRoutesByOriginAndDestination(
                    originLocationId, destinationLocationId);
            return ResponseEntity.ok(routes);
        }
        
        // If neither complete set of parameters is provided, return bad request
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/find")
    @Operation(summary = "Find routes by criteria", description = "Find routes matching the specified criteria")
    @ApiResponse(responseCode = "200", description = "Successfully found routes")
    public ResponseEntity<List<RouteResponseDto>> findRoutes(@Valid @RequestBody RouteRequestDto routeRequest) {
        List<RouteResponseDto> routes = routeService.findRoutes(routeRequest);
        return ResponseEntity.ok(routes);
    }
}