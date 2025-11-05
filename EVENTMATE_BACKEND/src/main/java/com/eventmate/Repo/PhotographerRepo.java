package com.eventmate.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmate.Entity.Photographer;

@Repository
public interface PhotographerRepo extends JpaRepository<Photographer, Integer> {

}
