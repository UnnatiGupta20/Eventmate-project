package com.eventmate.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Venue {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer venueId;
	private String venueName;
	private String venueCity;
	private Integer venueBudget;
	private Double venueRating;
	private Integer venueMinGuests;
	private Integer venueMaxGuests;
	@Column(length = 5000)
	private String venueImageLink;
	
}
