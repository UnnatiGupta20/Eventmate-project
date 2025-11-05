package com.eventmate.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventmate.Entity.User;

public interface UserRepo extends JpaRepository<User, Integer> {

	User findByUserEmailAndUserPassword(String userEmail,String userPassword);
}
