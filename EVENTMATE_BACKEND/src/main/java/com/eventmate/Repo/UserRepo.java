package com.eventmate.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventmate.Entity.User;
import java.util.List;


public interface UserRepo extends JpaRepository<User, Long>{

	User findByEmailAndPassword(String email, String password);
}
