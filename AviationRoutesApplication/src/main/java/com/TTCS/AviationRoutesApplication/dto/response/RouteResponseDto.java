package com.TTCS.AviationRoutesApplication.dto.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.TTCS.AviationRoutesApplication.dto.LocationDto;
import com.TTCS.AviationRoutesApplication.dto.TransportationDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteResponseDto {
    
    private Long id;
    
    private LocationDto originLocation;
    
    private LocationDto destinationLocation;
    
    private List<TransportationDto> transportations = new ArrayList<>();
}