package com.eventmate.Entity;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="events")
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer eventId;
	private String eventName;
	private String eventType;
	private String eventDescription;
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate eventDate;
	
	@JsonFormat(pattern="HH:mm")
	private LocalTime eventTime;
	private Integer eventDuration;
	private String eventCity;
	private String eventHall;
	private Integer eventGuests;
	private String eventNotes;
	private Integer serviceId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="uid",referencedColumnName = "id")
	@JsonIgnore
	private User user;
	

}
