package com.eventmate.Repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.eventmate.Entity.Event;

public interface EventRepo extends JpaRepository<Event, Integer>{

}
