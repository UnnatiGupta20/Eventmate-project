package com.eventmate.Controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.convert.Jsr310Converters.LocalDateTimeToDateConverter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.Entity.Event;
import com.eventmate.Entity.User;
import com.eventmate.Service.EventService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/event")
public class EventController {
	
	@Autowired
	EventService eventService;
	
	@PutMapping("/cancel/{id}")
	public ResponseEntity<String> cancel(@PathVariable Integer id) {
		
		Event event=eventService.getEventById(id);
		if(event!=null) {
			event.setEventStatus("cancelled");
			eventService.save(event);
			System.out.println(event);
			System.out.println("Event cancel called");
			System.out.println(id);
			return ResponseEntity.ok("Event canceled successfully");
	    } else {
	        return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("Event not found");
	    }
		
	}
	
	 @PostMapping("/add")
	    public ResponseEntity<?> save(@RequestBody Event event) {

	        if (event.getEventVenue() != null && event.getEventVenue().getVenueId() != null) {
	            boolean booked = eventService.isVenueBooked(
	                event.getEventVenue().getVenueId(),
	                event.getEventDate()
	            );

	            if (booked) {
	                return ResponseEntity.status(HttpStatus.SC_CONFLICT)
	                        .body("This venue is already booked on " + event.getEventDate() + ". Please choose another venue or date.");
	            }
	        }

	        Event savedEvent = eventService.save(event);
	        return ResponseEntity.ok(savedEvent);
	    }

	@GetMapping("/count")
	public Integer getEventsCount() {
		return eventService.eventsList().size();//sample
		
	}
	@GetMapping("/get/{id}")
	public List<Event> getByUserId(@PathVariable Integer id){
		return eventService.getEventsByUserId(id);
	
		
	}
	@GetMapping("/upcomingcount")
	public Integer getUpcomingEventsCount() {
	    int count = 0;

	    for (Event e : eventService.eventsList()) {
	        // ✅ Compare event date with today's date
	        if (e.getEventDate().isAfter(LocalDate.now())) {
	            count++;
	        }
	    }

	    return count;
	}

	@GetMapping("/all")
    public List<Map<String, Object>> getAllBookings() {
        List<Map<String, Object>> bookings = new ArrayList<>();
        
        for(Event e:eventService.eventsList()) {
        	bookings.add(Map.of(
                    "id", e.getEventId(),
                    "hall", e.getEventVenue().getVenueName(),
                    "hallCity",e.getEventVenue().getVenueCity(),
                    "bookedBy",e.getEventUser().getUserFullName(),
                    "date", e.getEventDate()
                ));
        }
//        bookings.add(Map.of(
//            "id", 1,
//            "hall", "Grand Palace Hall",
//            "bookedBy", "Alice Johnson",
//            "date", "2025-12-15"
//        ));
//        bookings.add(Map.of(
//            "id", 2,
//            "hall", "Sunset Banquet",
//            "bookedBy", "Bob Williams",
//            "date", "2025-11-10"
//        ));
//        bookings.add(Map.of(
//            "id", 3,
//            "hall", "Grand Palace Hall",
//            "bookedBy", "Charlie Brown",
//            "date", "2025-12-15"
//        ));

        return bookings;
    }

}
