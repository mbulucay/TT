package com.TTCS.AviationRoutesApplication.mapper.enums;

import com.TTCS.AviationRoutesApplication.enums.DayOfWeek;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Arrays;

public class DayOfWeekMapper {
    
    /**
     * Converts a comma-separated string of numbers (0-6) to a List of DayOfWeek
     * @param daysString String of comma-separated numbers (e.g. "0,1,2")
     * @return List of DayOfWeek enums
     */
    public static List<DayOfWeek> convertStringToDayOfWeekList(String daysString) {
        if (daysString == null || daysString.trim().isEmpty()) {
            return List.of();
        }
        
        return Arrays.stream(daysString.split(","))
            .map(String::trim)
            .map(Integer::parseInt)
            .map(day -> DayOfWeek.values()[day]) // Convert integer to enum using array index
            .collect(Collectors.toList());
    }

    /**
     * Converts a List of DayOfWeek to a comma-separated string of numbers (0-6)
     * @param days List of DayOfWeek enums
     * @return String of comma-separated numbers
     */
    public static String convertDayOfWeekListToString(List<DayOfWeek> days) {
        if (days == null || days.isEmpty()) {
            return "";
        }
        
        return days.stream()
            .map(day -> String.valueOf(day.ordinal()))
            .collect(Collectors.joining(","));
    }

    public static int dayToIndex(DayOfWeek day) {
        return switch (day) {
            case SUNDAY -> 0;
            case MONDAY -> 1;
            case TUESDAY -> 2;
            case WEDNESDAY -> 3;
            case THURSDAY -> 4;
            case FRIDAY -> 5;
            case SATURDAY -> 6;
        };
    }
} 