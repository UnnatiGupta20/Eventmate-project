package com.eventmate.Entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer eventId;
	private String eventName;
	private String eventType;
	private String eventDescription;
	private LocalDate eventDate;
	private LocalTime eventTime;
	private Integer eventDuration;
	private String eventDecoration;
	private String eventFood;
	private String eventNotes;
	private String eventStatus = "active";
	@ManyToOne
    @JoinColumn(name = "venue_id")
    private Venue eventVenue;  
	
	@ManyToOne
	 @JoinColumn(name = "music_system_id")
    private MusicSystem eventMusicSystem; 
	
	@ManyToOne
    @JoinColumn(name = "photographer_id")
    private Photographer eventPhotographer;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User eventUser;
}
