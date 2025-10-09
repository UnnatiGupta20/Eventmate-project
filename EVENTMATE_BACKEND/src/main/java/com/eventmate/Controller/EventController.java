package com.eventmate.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.Entity.Event;
import com.eventmate.Entity.User;
import com.eventmate.Service.EventService;

import jakarta.servlet.http.HttpSession;

	
	
@RestController
@CrossOrigin(origins="http://localhost:5173",allowCredentials = "true")
public class EventController {
	@Autowired
	EventService es;
	
	@PostMapping("/addevent")
	public ResponseEntity<?> saveEvent(@RequestBody Event e, HttpSession session) {
	    // Get logged-in user
	    User loggedInUser = (User) session.getAttribute("user");
	    if (loggedInUser == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body("User not logged in or session expired");
	    }

	    // Assign user
	    e.setUser(loggedInUser);

	    // ✅ Check overlapping
	    boolean isOverlapping = es.verifyOverLaping(e);

	    if (isOverlapping) {
	        String msg = String.format(
	            "Already an event is scheduled at %s in %s at %s.",
	            e.getEventHall(),
	            e.getEventCity(),
	            e.getEventTime()
	        );
	        return ResponseEntity.status(HttpStatus.CONFLICT).body(msg);
	    }

	    // ✅ Save if not overlapping
	    Event savedEvent = es.saveEvent(e);
	    return ResponseEntity.ok(savedEvent);
	}
	@GetMapping("/userevents")
    public List<Event> getUserEvents(HttpSession session) {
        // ✅ Get logged-in user from session
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null) {
            throw new RuntimeException("User not logged in or session expired");
        }

        // ✅ Fetch events for this user
        return es.getEventsByUser(loggedInUser);
    }



}
