package com.eventmate.Service;

import java.time.LocalDate;
import java.util.List;

import com.eventmate.Entity.Event;

public interface EventService {

	public Event save(Event event);
	List<Event> getEventsByUserId(Integer id);
	Event getEventById(Integer id);
	List<Event> eventsList();
	boolean isVenueBooked(Integer venueId, LocalDate eventDate);
}
