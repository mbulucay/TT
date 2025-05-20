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

}