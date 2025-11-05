package com.eventmate.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	private String userFullName;
	private String userEmail;
	private String userPassword;
	private Long userMobile;
	private String userState;
	private String userCity;
	private String userInterests;
	@Column(length=5000)
	private String userImageURL;
}
