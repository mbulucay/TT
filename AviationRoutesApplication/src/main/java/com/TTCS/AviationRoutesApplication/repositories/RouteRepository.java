package com.TTCS.AviationRoutesApplication.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TTCS.AviationRoutesApplication.model.Location;
import com.TTCS.AviationRoutesApplication.model.Route;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    
    List<Route> findByOriginLocation(Location originLocation);
    
    List<Route> findByDestinationLocation(Location destinationLocation);
    
    List<Route> findByOriginLocationAndDestinationLocation(
            Location originLocation, Location destinationLocation);
}