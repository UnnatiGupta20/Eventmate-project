package com.eventmate.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eventmate.Entity.Venue;


public interface VenueService {

	Venue save(Venue venue);
	List<Venue> getAll();
}
