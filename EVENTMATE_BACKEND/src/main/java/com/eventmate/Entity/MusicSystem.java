package com.eventmate.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class MusicSystem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer musicSystemId;
	private String musicSystemName;
	private String musicSystemCity;
	private Double musicSystemRating;
	@Column(length=5000)
	private String musicSystemImageUrl;
}
