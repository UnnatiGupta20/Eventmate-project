package com.eventmate.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.Entity.Photographer;
import com.eventmate.Repo.PhotographerRepo;

@Service
public class PhotographerServiceImpl implements PhotographerService {

	@Autowired
	PhotographerRepo photographerRepo;
	@Override
	public Photographer save(Photographer photographer) {
		// TODO Auto-generated method stub
		return photographerRepo.save(photographer);
	}
	@Override
	public List<Photographer> getList() {
		// TODO Auto-generated method stub
		return photographerRepo.findAll();
	}

}
