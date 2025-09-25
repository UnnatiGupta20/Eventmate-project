package com.eventmate.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.Entity.User;
import com.eventmate.Repo.UserRepo;
@Service
public class UserServiceImpl implements UserService{
    
	@Autowired
	UserRepo ur;
	
	@Override
	public User saveUser(User u) {
		return ur.save(u);
	}

	@Override
	public User getUser(String email, String password) {
		// TODO Auto-generated method stub
		return ur.findByEmailAndPassword(email, password);
	}
	

	

}
