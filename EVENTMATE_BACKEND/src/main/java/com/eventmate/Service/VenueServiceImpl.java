package com.eventmate.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.Entity.Venue;
import com.eventmate.Repo.VenueRepo;

@Service
public class VenueServiceImpl implements VenueService{

	@Autowired
	VenueRepo venueRepo;
	@Override
	public Venue save(Venue venue) {
		// TODO Auto-generated method stub
		return venueRepo.save(venue);
	}
	@Override
	public List<Venue> getAll() {
		// TODO Auto-generated method stub
		return venueRepo.findAll();
	}

}
