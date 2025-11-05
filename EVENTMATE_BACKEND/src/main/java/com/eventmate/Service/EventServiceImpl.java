package com.eventmate.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.Entity.Event;
import com.eventmate.Repo.EventRepo;

@Service
public class EventServiceImpl implements EventService{

	@Autowired
	EventRepo eventRepo;
	@Override
	public Event save(Event event) {
		// TODO Auto-generated method stub
		return eventRepo.save(event);
	}
	@Override
	public List<Event> getEventsByUserId(Integer id) {
		// TODO Auto-generated method stub
		List<Event> list= new ArrayList<>();
		for(Event e:eventRepo.findAll()) {
			if(e.getEventUser().getUserId().equals(id)) {
				list.add(e);
			}
		}
		return list;
	}
	@Override
	public Event getEventById(Integer id) {
		// TODO Auto-generated method stub
		return eventRepo.findById(id).orElse(null);
	}
	@Override
	public List<Event> eventsList() {
		// TODO Auto-generated method stub
		return eventRepo.findAll();
	}
	@Override
	public boolean isVenueBooked(Integer venueId, LocalDate eventDate) {
		// TODO Auto-generated method stub
		return eventRepo.existsByEventVenue_VenueIdAndEventDateAndEventStatus(venueId, eventDate, "active");

	}

}
