package com.TTCS.AviationRoutesApplication.model;

import com.TTCS.AviationRoutesApplication.enums.TransportationType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.CollectionTable;
import java.time.DayOfWeek;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "transportations",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {
               "transportation_type",
               "origin_location_id",
               "destination_location_id",
               "operating_days"
           })
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transportation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "Type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "transportation_type", nullable = false)
    private TransportationType transportationType;
    
    @NotNull(message = "Origin location is required")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "origin_location_id", nullable = false)
    private Location originLocation;
    
    @NotNull(message = "Destination location is required")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destination_location_id", nullable = false)
    private Location destinationLocation;
    
    @Column(name = "operating_days")
    private String operatingDays;

    public List<DayOfWeek> getOperatingDaysAsList() {
        if (operatingDays == null || operatingDays.isEmpty()) {
            return new ArrayList<>();
        }
        return Arrays.stream(operatingDays.split(","))
                .map(DayOfWeek::valueOf)
                .collect(Collectors.toList());
    }

    public void setOperatingDaysFromList(List<DayOfWeek> days) {
        if (days == null || days.isEmpty()) {
            this.operatingDays = "";
            return;
        }
        this.operatingDays = days.stream()
                .map(DayOfWeek::name)
                .collect(Collectors.joining(","));
    }
}