package com.eventmate.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.Entity.Admin;
import com.eventmate.Repo.AdminRepo;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminRepo adminRepo;
	@Override
	public Admin login(Admin admin) {
		
		return adminRepo.findByAdminEmailAndAdminPassword(admin.getAdminEmail(), admin.getAdminPassword());
	}

}
