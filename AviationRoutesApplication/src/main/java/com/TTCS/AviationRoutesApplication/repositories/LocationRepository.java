package com.TTCS.AviationRoutesApplication.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TTCS.AviationRoutesApplication.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    
    Optional<Location> findByLocationCode(String locationCode);
    
    List<Location> findByCountry(String country);
    
    List<Location> findByCity(String city);
    
    List<Location> findByNameContainingIgnoreCase(String name);
    
    boolean existsByLocationCode(String locationCode);

    Location findByName(String name);
}