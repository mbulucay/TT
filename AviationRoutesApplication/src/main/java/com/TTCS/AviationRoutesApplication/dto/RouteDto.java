package com.TTCS.AviationRoutesApplication.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.TTCS.AviationRoutesApplication.model.Route;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteDto {
    
    private Long id;
    
    @NotNull(message = "Origin location is required")
    private LocationDto originLocation;
    
    @NotNull(message = "Destination location is required")
    private LocationDto destinationLocation;
    
    private List<TransportationDto> transportations = new ArrayList<>();
}