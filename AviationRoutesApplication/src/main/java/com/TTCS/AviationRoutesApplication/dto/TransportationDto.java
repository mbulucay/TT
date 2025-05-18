package com.TTCS.AviationRoutesApplication.dto;

import java.util.List;
import jakarta.validation.constraints.NotNull;

import com.TTCS.AviationRoutesApplication.enums.TransportationType;
import com.TTCS.AviationRoutesApplication.enums.DayOfWeek;

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
    private TransportationType transportationType;
    
    @NotNull(message = "Origin location is required")
    private LocationDto originLocation;
    
    @NotNull(message = "Destination location is required")
    private LocationDto destinationLocation;
    
    private List<DayOfWeek> operatingDays;
}