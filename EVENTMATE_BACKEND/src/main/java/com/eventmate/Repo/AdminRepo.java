package com.eventmate.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmate.Entity.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer> {
	Admin findByAdminEmailAndAdminPassword(String adminEmail,String adminPassword);
}
