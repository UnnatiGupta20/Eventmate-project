package com.eventmate.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.Entity.User;
import com.eventmate.Repo.UserRepo;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserRepo userRepo;
	@Override
	public User save(User user) {
		// TODO Auto-generated method stub
		return userRepo.save(user);
	}
	@Override
	public User login(String userEmail, String userPassword) {
		// TODO Auto-generated method stub
		return userRepo.findByUserEmailAndUserPassword(userEmail, userPassword);
	}
	@Override
	public List<User> getUsersList() {
		// TODO Auto-generated method stub
		return userRepo.findAll();
	}

}
