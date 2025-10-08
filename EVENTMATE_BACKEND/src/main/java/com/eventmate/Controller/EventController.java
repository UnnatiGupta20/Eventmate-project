package com.eventmate.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.Entity.Event;
import com.eventmate.Service.EventService;

	
	
@RestController
@CrossOrigin(origins="http://localhost:5173")
public class EventController {
	@Autowired
	EventService es;
	
	@PostMapping("/addevent")
	public Event saveEvent(@RequestBody Event e) {
		return es.saveEvent(e);
	}

}
