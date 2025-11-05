package com.eventmate.Repo;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmate.Entity.Event;

@Repository
public interface EventRepo extends JpaRepository<Event, Integer>{

	 boolean existsByEventVenue_VenueIdAndEventDateAndEventStatus(
		        Integer venueId, LocalDate eventDate, String eventStatus
		    );
}
