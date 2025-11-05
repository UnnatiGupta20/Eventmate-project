package com.eventmate.Service;

import java.util.List;

import com.eventmate.Entity.User;

public interface UserService {

	User save(User user);
	User login(String userEmail,String userPassword);
	List<User> getUsersList();
}
