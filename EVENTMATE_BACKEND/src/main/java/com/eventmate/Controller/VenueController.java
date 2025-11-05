package com.eventmate.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.Entity.Venue;
import com.eventmate.Service.VenueService;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/venue")
public class VenueController {

	@Autowired
	VenueService venueService;
	
	@PostMapping("/add")
	public Venue addVenue(@RequestBody Venue venue) {
	    return venueService.save(venue);
	}
	
	@GetMapping("/cities")
	public List<String> cityList(){
		List<String> cities=new ArrayList<>();
		for(Venue v:venueService.getAll()) {
			if(!cities.contains(v.getVenueCity())) {
				cities.add(v.getVenueCity());
			}
		}
		return cities;
	}
	
	@GetMapping("/list/{venueCity}")
	public List<Venue> venueList(@PathVariable String venueCity){
		
		List<Venue> venues=new ArrayList<>();
		for(Venue v:venueService.getAll()) {
			if(v.getVenueCity().equals(venueCity)) {
				venues.add(v);
			}
		}
		return venues;
	}
//  public List<Map<String, Object>> getVenues() {
//
//      List<Map<String, Object>> venues = new ArrayList<>();
//      List<Venue> all=venueService.getAll(); 
//      
//      for(Venue v:all) {
//    	  venues.add(Map.of(
//                  "id", v.getVenueId(),
//                  "name",v.getVenueName(),
//                  "city", v.getVenueCity(),
//                  "budget", v.getVenueBudget(),
//                  "rating", v.getVenueRating(),
//                  "minGuests", v.getVenueMinGuests(),
//                  "maxGuests", v.getVenueMaxGuests(),
//                  "image", v.getVenueImageLink()
//          ));
//      }
      // 1
//      venues.add(Map.of(
//              "id", 1,
//              "name", "The Grand Palace",
//              "city", "Mumbai",
//              "budget", 100000,
//              "rating", 4.7,
//              "minGuests", 150,
//              "maxGuests", 500,
//              "image", "/hall1.jpg"
//      ));
//
//      // 2
//      venues.add(Map.of(
//              "id", 2,
//              "name", "Ocean View",
//              "city", "Mumbai",
//              "budget", 75000,
//              "rating", 4.7,
//              "minGuests", 150,
//              "maxGuests", 500,
//              "image", "/hall2.jpg"
//      ));
//
//      // 3
//      venues.add(Map.of(
//              "id", 3,
//              "name", "Aurora Hall",
//              "city", "Mumbai",
//              "budget", 750000,
//              "rating", 4.8,
//              "minGuests", 150,
//              "maxGuests", 500,
//              "image", "/hall5.jpg"
//      ));
//
//      // 4
//      venues.add(Map.of(
//              "id", 4,
//              "name", "Luna Banquet",
//              "city", "Mumbai",
//              "budget", 100000,
//              "rating", 4.8,
//              "minGuests", 150,
//              "maxGuests", 500,
//              "image", "/hall6.jpg"
//      ));
//
//      // 5
//      venues.add(Map.of(
//              "id", 5,
//              "name", "Opal Avenue",
//              "city", "Delhi",
//              "budget", 75000,
//              "rating", 4.5,
//              "minGuests", 150,
//              "maxGuests", 500,
//              "image", "/hall3.jpg"
//      ));
//
//      // 6
//      venues.add(Map.of(
//              "id", 6,
//              "name", "Starlight",
//              "city", "Delhi",
//              "budget", 75000,
//              "rating", 4.5,
//              "minGuests", 150,
//              "maxGuests", 500,
//              "image", "/hall7.jpg"
//      ));
//
//      // 7
//      venues.add(Map.of(
//              "id", 7,
//              "name", "Skyline Venue",
//              "city", "Delhi",
//              "budget", 95000,
//              "rating", 4.5,
//              "minGuests", 150,
//              "maxGuests", 500,
//              "image", "/hall8.jpg"
//      ));
//
//      // 8
//      venues.add(Map.of(
//              "id", 8,
//              "name", "The Crystal Dome",
//              "city", "Delhi",
//              "budget", 95000,
//              "rating", 4.5,
//              "minGuests", 150,
//              "maxGuests", 500,
//              "image", "/hall9.jpg"
//      ));
//
//      // 9
//      venues.add(Map.of(
//              "id", 9,
//              "name", "Golden Aura Banquets",
//              "city", "Bangalore",
//              "budget", 75000,
//              "rating", 4.8,
//              "minGuests", 150,
//              "maxGuests", 500,
//              "image", "/hall4.jpg"
//      ));
//
//      // 10
//      venues.add(Map.of(
//              "id", 10,
//              "name", "Midnight Mirage",
//              "city", "Bangalore",
//              "budget", 75000,
//              "rating", 4.8,
//              "minGuests", 150,
//              "maxGuests", 500,
//              "image", "/hall10.jpg"
//      ));

//      return venues;
//}
}
