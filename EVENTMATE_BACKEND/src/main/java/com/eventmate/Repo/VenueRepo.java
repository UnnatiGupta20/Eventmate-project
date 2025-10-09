package com.eventmate.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.eventmate.Entity.Venue;
@Repository
public interface VenueRepo extends JpaRepository<Venue, Integer>{
	
	@Query("SELECT DISTINCT v.venueCity FROM Venue v")
    List<String> findAllUniqueVenueCities();
	
	@Query("SELECT v.venueHall FROM Venue v WHERE v.venueCity = :venueCity")
	List<String> findVenueHallByVenueCity(String venueCity);

	@Query("select v.venueCapacity from Venue v where v.venueHall=:venueHall and v.venueCity=:venueCity")
    Integer findVenueCapacityByVenueHall(String venueHall,String venueCity);
	
	
	
	
}