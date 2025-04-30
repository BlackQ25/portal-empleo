package com.portalempleo.backend.service;

import com.portalempleo.backend.model.Role;
import com.portalempleo.backend.repository.RoleRepository;
import org.springframework.stereotype.Service;
import com.portalempleo.backend.repository.LocationRepository;
import com.portalempleo.backend.model.Location;

import java.util.*;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;

    }

    public List<Location> getAllRoles() {
        return locationRepository.findAll();

    }

    public Location saveLocation(Location location) {
        return locationRepository.save(location);

    }

}
