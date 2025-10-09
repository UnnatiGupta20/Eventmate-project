package com.eventmate.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
}
