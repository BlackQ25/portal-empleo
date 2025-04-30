package com.portalempleo.backend.controller;

import com.portalempleo.backend.model.Location;
import com.portalempleo.backend.service.LocationService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService){
        this.locationService = locationService;

    }

    @GetMapping
    public List<Location> getAllRoles() {
        return locationService.getAllRoles();

    }

    @PostMapping
    public Location createLocation(@RequestBody Location location) {
        return locationService.saveLocation(location);

    }

}
