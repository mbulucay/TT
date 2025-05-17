package com.TTCS.AviationRoutesApplication.mapper;

import com.TTCS.AviationRoutesApplication.dto.TransportationDto;
import com.TTCS.AviationRoutesApplication.model.Transportation;
import org.springframework.stereotype.Component;

@Component
public class TransportationMapper implements Mapper<Transportation, TransportationDto> {
    
    private final LocationMapper locationMapper;
    
    public TransportationMapper(LocationMapper locationMapper) {
        this.locationMapper = locationMapper;
    }
    
    @Override
    public Transportation toEntity(TransportationDto dto) {
        if (dto == null) return null;
        
        return Transportation.builder()
                .id(dto.getId())
                .type(dto.getType())
                .originLocation(locationMapper.toEntity(dto.getOriginLocation()))
                .destinationLocation(locationMapper.toEntity(dto.getDestinationLocation()))
                .build();
    }
    
    @Override
    public TransportationDto toDto(Transportation entity) {
        if (entity == null) return null;
        
        return TransportationDto.builder()
                .id(entity.getId())
                .type(entity.getType())
                .originLocation(locationMapper.toDto(entity.getOriginLocation()))
                .destinationLocation(locationMapper.toDto(entity.getDestinationLocation()))
                .build();
    }
} 