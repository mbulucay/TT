package com.TTCS.AviationRoutesApplication.dto.request;

import java.util.List;

import com.TTCS.AviationRoutesApplication.enums.DayOfWeek;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class RouteRequestDto {
    
    @NotBlank(message = "Origin location code is required")
    private String originLocation;
    
    @NotBlank(message = "Destination location code is required")
    private String destinationLocation;
    
    private List<DayOfWeek> operatingDays;
}