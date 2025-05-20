package com.TTCS.AviationRoutesApplication.mapper;

import com.TTCS.AviationRoutesApplication.dto.TransportationDto;
import com.TTCS.AviationRoutesApplication.model.Transportation;
import com.TTCS.AviationRoutesApplication.mapper.enums.DayOfWeekMapper;
import org.springframework.stereotype.Component;
import com.TTCS.AviationRoutesApplication.mapper.interfaces.Mapper;

import java.time.DayOfWeek;
import java.util.List;

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
                .transportationType(dto.getTransportationType())
                .operatingDays(DayOfWeekMapper.convertDayOfWeekListToString(dto.getOperatingDays()))
                .originLocation(locationMapper.toEntity(dto.getOriginLocation()))
                .destinationLocation(locationMapper.toEntity(dto.getDestinationLocation()))
                .build();
    }
    
    @Override
    public TransportationDto toDto(Transportation entity) {
        if (entity == null) return null;
        
        return TransportationDto.builder()
                .id(entity.getId())
                .transportationType(entity.getTransportationType())
                .operatingDays(DayOfWeekMapper.convertStringToDayOfWeekList(entity.getOperatingDays()))
                .originLocation(locationMapper.toDto(entity.getOriginLocation()))
                .destinationLocation(locationMapper.toDto(entity.getDestinationLocation()))
                .build();
    }
} 