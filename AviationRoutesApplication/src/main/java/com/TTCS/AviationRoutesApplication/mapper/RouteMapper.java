package com.TTCS.AviationRoutesApplication.mapper;

import com.TTCS.AviationRoutesApplication.dto.RouteDto;
import com.TTCS.AviationRoutesApplication.dto.response.RouteResponseDto;
import com.TTCS.AviationRoutesApplication.dto.request.RouteRequestDto;
import org.springframework.stereotype.Component;

@Component
public class RouteMapper implements RestMapper<RouteDto, RouteResponseDto, RouteRequestDto> {
    
    private final LocationMapper locationMapper;
    private final TransportationMapper transportationMapper;
    
    public RouteMapper(LocationMapper locationMapper, TransportationMapper transportationMapper) {
        this.locationMapper = locationMapper;
        this.transportationMapper = transportationMapper;
    }
    
    // @Override
    // public Route toEntity(RouteDto dto) {
    //     if (dto == null) return null;
        
    //     return Route.builder()
    //             .id(dto.getId())
    //             .originLocation(locationMapper.toEntity(dto.getOriginLocation()))
    //             .destinationLocation(locationMapper.toEntity(dto.getDestinationLocation()))
    //             .build();
    // }
    
    // @Override
    // public RouteDto toDto(Route entity) {
    //     if (entity == null) return null;
        
    //     RouteDto dto = RouteDto.builder()
    //             .id(entity.getId())
    //             .originLocation(locationMapper.toDto(entity.getOriginLocation()))
    //             .destinationLocation(locationMapper.toDto(entity.getDestinationLocation()))
    //             .build();
                
    //     if (entity.getTransportations() != null) {
    //         dto.setTransportations(entity.getTransportations().stream()
    //                 .map(transportationMapper::toDto)
    //                 .toList());
    //     }
        
    //     return dto;
    // }
    
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