package com.TTCS.AviationRoutesApplication.mapper;

import com.TTCS.AviationRoutesApplication.dto.TransportationDto;
import com.TTCS.AviationRoutesApplication.model.Transportation;
import com.TTCS.AviationRoutesApplication.enums.DayOfWeek;
// import com.TTCS.AviationRoutesApplication.mapper.Mapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
                .operatingDays(convertDayOfWeekListToString(dto.getOperatingDays()))
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
                .operatingDays(convertStringToDayOfWeekList(entity.getOperatingDays()))
                .originLocation(locationMapper.toDto(entity.getOriginLocation()))
                .destinationLocation(locationMapper.toDto(entity.getDestinationLocation()))
                .build();
    }

    private List<DayOfWeek> convertStringToDayOfWeekList(String operatingDays) {
        if (operatingDays == null || operatingDays.isEmpty()) {
            return new ArrayList<>();
        }
        // Remove any brackets and split by comma
        String cleanDays = operatingDays.replaceAll("[\\[\\]]", "");
        return Arrays.stream(cleanDays.split(","))
                .map(String::trim)
                .map(Integer::parseInt)
                .map(this::mapNumberToDayOfWeek)
                .collect(Collectors.toList());
    }

    private DayOfWeek mapNumberToDayOfWeek(int day) {
        return switch (day) {
            case 0 -> DayOfWeek.SUNDAY;
            case 1 -> DayOfWeek.MONDAY;
            case 2 -> DayOfWeek.TUESDAY;
            case 3 -> DayOfWeek.WEDNESDAY;
            case 4 -> DayOfWeek.THURSDAY;
            case 5 -> DayOfWeek.FRIDAY;
            case 6 -> DayOfWeek.SATURDAY;
            default -> throw new IllegalArgumentException("Invalid day number: " + day);
        };
    }

    private Integer mapDayOfWeekToNumber(DayOfWeek day) {
        return switch (day) {
            case SUNDAY -> 0;
            case MONDAY -> 1;
            case TUESDAY -> 2;
            case WEDNESDAY -> 3;
            case THURSDAY -> 4;
            case FRIDAY -> 5;
            case SATURDAY -> 6;
            default -> throw new IllegalArgumentException("Invalid day of week: " + day);
        };
    }

    private String convertDayOfWeekListToString(List<DayOfWeek> days) {
        if (days == null || days.isEmpty()) {
            return "";
        }
        return days.stream()
                .map(DayOfWeek::name)
                .collect(Collectors.joining(","));
    }
} 