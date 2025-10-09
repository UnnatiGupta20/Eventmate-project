package com.eventmate.Repo;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventmate.Entity.Event;
import com.eventmate.Entity.User;

public interface EventRepo extends JpaRepository<Event, Integer>{
	List<Event> findByEventHallAndEventCityAndEventDate(String eventHall,String eventCity,LocalDate eventDate);
	List<Event> findByUser(User user);

}
