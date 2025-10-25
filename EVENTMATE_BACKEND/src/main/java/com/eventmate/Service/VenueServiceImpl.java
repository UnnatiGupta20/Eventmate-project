package com.eventmate.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.Entity.Venue;
import com.eventmate.Repo.VenueRepo;
@Service
public class VenueServiceImpl implements VenueService{
	@Autowired
	VenueRepo vr;
	@Override
	public List<Venue> venueList() {
		// TODO Auto-generated method stub
		return vr.findAll();
	}
	@Override
	public List<String> cityList() {
		// TODO Auto-generated method stub
		return vr.findAllUniqueVenueCities();
	}
	@Override
	public List<String> hallList(String venueCity) {
		// TODO Auto-generated method stub
		return vr.findVenueHallByVenueCity(venueCity);
	}
	@Override
	public Integer hallCapacity(String venueHall,String venueCity) {
		// TODO Auto-generated method stub
		return vr.findVenueCapacityByVenueHall(venueHall,venueCity);
	}
	@Override
	public Venue save(Venue venue) {
		// TODO Auto-generated method stub
		return vr.save(venue);
	}
	@Override
	public Double getRating(String venueCity, String venueHall) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Venue getVenue(String venueCity, String venueHall) {
		// TODO Auto-generated method stub
		return vr.findByVenueCityAndVenueHall(venueCity, venueHall);
	}
	

}
