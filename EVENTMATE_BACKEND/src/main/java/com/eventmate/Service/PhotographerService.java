package com.eventmate.Service;

import java.util.List;

import com.eventmate.Entity.Photographer;

public interface PhotographerService {

	Photographer save(Photographer photographer);
	List<Photographer> getList();
}
