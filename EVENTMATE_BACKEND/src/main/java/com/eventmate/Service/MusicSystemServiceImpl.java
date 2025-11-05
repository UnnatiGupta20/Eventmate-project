package com.eventmate.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.Entity.MusicSystem;
import com.eventmate.Repo.MusicSystemRepo;

@Service
public class MusicSystemServiceImpl implements MusicSystemService {

	@Autowired
	MusicSystemRepo musicSystemRepo;
	@Override
	public MusicSystem save(MusicSystem musicSystem) {
		// TODO Auto-generated method stub
		return musicSystemRepo.save(musicSystem);
	}
	@Override
	public List<MusicSystem> getAll() {
		// TODO Auto-generated method stub
		return musicSystemRepo.findAll();
	}

}
