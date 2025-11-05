package com.eventmate.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmate.Entity.Venue;

@Repository
public interface VenueRepo extends JpaRepository<Venue, Integer>{

}
