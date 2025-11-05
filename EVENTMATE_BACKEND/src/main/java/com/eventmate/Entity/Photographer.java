package com.eventmate.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Photographer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer photographerId;
	private String photographerName;
	private String photographerCity;
	private Double photographerRating;
	@Column(length=5000)
	private String photographerImageURL;
}
