package com.eventmate.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.Entity.Event;
import com.eventmate.Repo.EventRepo;
@Service
public class EventServiceImpl implements EventService{
	@Autowired
	EventRepo er;
	@Override
	public Event saveEvent(Event e) {
		return er.save(e);
	}

}
