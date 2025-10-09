package com.eventmate.Service;

import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.Entity.Event;
import com.eventmate.Entity.User;
import com.eventmate.Repo.EventRepo;
@Service
public class EventServiceImpl implements EventService{
	@Autowired
	EventRepo er;
	@Override
	public Event saveEvent(Event e) {
		return er.save(e);
	}
	
	@Override
	public boolean verifyOverLaping(Event e) {
		// TODO Auto-generated method stub
		LocalTime newStart=e.getEventTime();
		LocalTime newEnd=newStart.plusHours(e.getEventDuration());
		 List<Event> eventList=er.findByEventHallAndEventCityAndEventDate(e.getEventHall(), e.getEventCity(), e.getEventDate());
		for(Event event:eventList) {
			LocalTime existingStart=event.getEventTime();
			LocalTime existingEnd=existingStart.plusHours(event.getEventDuration());
			if( newStart.isBefore(existingEnd)&&newEnd.isAfter(existingStart)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public List<Event> getEventsByUser(User u) {
		// TODO Auto-generated method stub
		return er.findByUser(u);
	}

}
