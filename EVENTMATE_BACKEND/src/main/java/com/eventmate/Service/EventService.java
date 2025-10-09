package com.eventmate.Service;

import java.util.List;

import com.eventmate.Entity.Event;
import com.eventmate.Entity.User;

public interface EventService {
	public Event saveEvent(Event e);
	public List<Event> getEventsByUser(User u);
	public boolean verifyOverLaping(Event e);
}
