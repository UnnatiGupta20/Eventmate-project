package com.eventmate.Service;

import java.util.ArrayList;
import java.util.List;

import com.eventmate.Entity.Venue;

public interface VenueService {
	public List<Venue> venueList();
	public List<String> cityList();
	public List<String> hallList(String venueCity);
	public Integer hallCapacity(String venueHall,String venueCity);
}
