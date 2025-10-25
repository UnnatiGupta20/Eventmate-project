package com.eventmate.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Venue {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer venueId;
	private String venueCity;
	private String venueHall;
	private Integer venueCapacity;
	private Double venueRating;
	
}
