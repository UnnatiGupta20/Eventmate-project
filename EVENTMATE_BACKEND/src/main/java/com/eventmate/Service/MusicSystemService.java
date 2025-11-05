package com.eventmate.Service;

import java.util.List;

import com.eventmate.Entity.MusicSystem;

public interface MusicSystemService {

	MusicSystem save(MusicSystem musicSystem);
	List<MusicSystem> getAll();
}
