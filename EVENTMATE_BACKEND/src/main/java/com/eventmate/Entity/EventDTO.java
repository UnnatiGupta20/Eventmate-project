package com.eventmate.Entity;

import lombok.Data;

@Data
public class EventDTO {
    private Integer eventId;
    private String eventName;
    private String eventDate;
    private String eventTime;
    private String eventCity;
    private String eventHall;
    private Integer venueId;
    private String eventDescription;
}
