package com.eventmate.Service;

import java.util.ArrayList;
import java.util.List;

import com.eventmate.Entity.Venue;

public interface VenueService {
	public Venue save(Venue venue);
	public List<Venue> venueList();
	public List<String> cityList();
	public List<String> hallList(String venueCity);
	public Integer hallCapacity(String venueHall,String venueCity);
	public Double getRating(String venueCity,String venueHall);
	public Venue getVenue(String venueCity,String venueHall);
}
