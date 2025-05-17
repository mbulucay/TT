package com.TTCS.AviationRoutesApplication.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TTCS.AviationRoutesApplication.enums.TransportationType;
import com.TTCS.AviationRoutesApplication.model.Location;
import com.TTCS.AviationRoutesApplication.model.Transportation;

@Repository
public interface TransportationRepository extends JpaRepository<Transportation, Long> {
    
    List<Transportation> findByType(TransportationType type);
    
    List<Transportation> findByOriginLocation(Location originLocation);
    
    List<Transportation> findByDestinationLocation(Location destinationLocation);
    
    List<Transportation> findByOriginLocationAndDestinationLocation(
            Location originLocation, Location destinationLocation);
    
    // List<Transportation> findByOriginLocationCodeAndDestinationLocationCode(
    //         String originLocationCode, String destinationLocationCode);
}