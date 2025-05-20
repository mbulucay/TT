package com.TTCS.AviationRoutesApplication.mapper;

import com.TTCS.AviationRoutesApplication.dto.LocationDto;
import com.TTCS.AviationRoutesApplication.model.Location;
import org.springframework.stereotype.Component;
import com.TTCS.AviationRoutesApplication.mapper.interfaces.Mapper;

@Component
public class LocationMapper implements Mapper<Location, LocationDto> {
    
    @Override
    public Location toEntity(LocationDto dto) {
        if (dto == null) return null;
        
        return Location.builder()
                .id(dto.getId())
                .name(dto.getName())
                .city(dto.getCity())
                .country(dto.getCountry())
                .locationCode(dto.getLocationCode())
                .build();
    }
    
    @Override
    public LocationDto toDto(Location entity) {
        if (entity == null) return null;
        
        return LocationDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .city(entity.getCity())
                .country(entity.getCountry())
                .locationCode(entity.getLocationCode())
                .build();
    }
} 