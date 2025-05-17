package com.TTCS.AviationRoutesApplication.dto;

import java.time.LocalDateTime;

import com.TTCS.AviationRoutesApplication.enums.TransportationType;
import com.TTCS.AviationRoutesApplication.model.Transportation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransportationDto {
    
    private Long id;
    
    @NotNull(message = "Type is required")
    private TransportationType type;
    
    @NotNull(message = "Origin location is required")
    private LocationDto originLocation;
    
    @NotNull(message = "Destination location is required")
    private LocationDto destinationLocation;
}