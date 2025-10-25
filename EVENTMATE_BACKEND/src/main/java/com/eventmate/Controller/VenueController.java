package com.eventmate.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.Entity.Venue;
import com.eventmate.Repo.VenueRepo;
import com.eventmate.Service.VenueService;

@RestController
@CrossOrigin(origins="http://localhost:5173",allowCredentials = "true")
public class VenueController {
	@Autowired
	VenueService vs;
	@Autowired
	VenueRepo vr;
	
	@GetMapping("/venuelist")
	public List<Venue> getVenueList(){
		return vs.venueList();
	}
	
	@GetMapping("/citylist")
	public List<String> getCityList(){
		return vs.cityList();
	}
	@GetMapping("/hall_list")
	public List<String> getHallList(@RequestParam String city){
		return vs.hallList(city);
	}
	
	@GetMapping("/hallCapacity")
	public Integer getHallCapacity(@RequestParam String hall,@RequestParam String city) {
		return  vs.hallCapacity(hall,city);
	}
	 @PostMapping("/rating/{city}/{hall}")
	    public String rateVenue(
	            @PathVariable String city,
	            @PathVariable String hall,
	            @RequestParam Double rating
	    ) {
	        Venue venue= vs.getVenue(city, hall);

	        if (venue.equals(null)) {
	            return "Venue not found";
	        }

	        
	        Double currentRating = venue.getVenueRating();
	        if (currentRating == null) currentRating = 0.0;

	        // Simple approach: assume each rating has equal weight and average is updated by counting previous ratings
	        // If you don't store count, we can do weighted average based on previous rating
	        int ratingCount = venue.getVenueRating() != null ? 1 : 0; // optional: store rating count in DB for better avg
	        double newAvg = (currentRating * ratingCount + rating) / (ratingCount + 1);

	        venue.setVenueRating(newAvg);
	        vs.save(venue);

	        return "Rating submitted successfully. New average: " + String.format("%.2f", newAvg);
	    }
	
}
