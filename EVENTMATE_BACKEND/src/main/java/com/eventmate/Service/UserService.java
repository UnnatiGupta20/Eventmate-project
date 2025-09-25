package com.eventmate.Service;

import com.eventmate.Entity.User;
import com.eventmate.Repo.UserRepo;

public interface UserService{
	public User saveUser(User u);
	public User getUser(String email,String password);
	
}
