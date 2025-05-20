package com.TTCS.AviationRoutesApplication.mapper;

import com.TTCS.AviationRoutesApplication.dto.RouteDto;
import com.TTCS.AviationRoutesApplication.dto.response.RouteResponseDto;
import com.TTCS.AviationRoutesApplication.dto.request.RouteRequestDto;
import org.springframework.stereotype.Component;
import com.TTCS.AviationRoutesApplication.mapper.interfaces.RestMapper;

@Component
public class RouteMapper implements RestMapper<RouteDto, RouteResponseDto, RouteRequestDto> {
    
    private final LocationMapper locationMapper;
    private final TransportationMapper transportationMapper;
    
    public RouteMapper(LocationMapper locationMapper, TransportationMapper transportationMapper) {
        this.locationMapper = locationMapper;
        this.transportationMapper = transportationMapper;
    }
    
    @Override
    public RouteRequestDto toRequestDto(RouteDto entity) {
        if (entity == null) return null;
        return RouteRequestDto.builder()
                .originLocation(entity.getOriginLocation().getLocationCode())
                .destinationLocation(entity.getDestinationLocation().getLocationCode())
                .build();
    }

    @Override
    public RouteResponseDto toResponseDto(RouteDto entity) {
        if (entity == null) return null;
        return RouteResponseDto.builder()
                .id(entity.getId())
                .originLocation(locationMapper.toDto(entity.getOriginLocation()))
                .destinationLocation(locationMapper.toDto(entity.getDestinationLocation()))
                .build();
    }
} 