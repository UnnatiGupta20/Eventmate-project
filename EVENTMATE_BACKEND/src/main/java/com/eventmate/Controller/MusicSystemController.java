package com.eventmate.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.Entity.MusicSystem;
import com.eventmate.Service.MusicSystemService;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/musicsystem")
public class MusicSystemController {

	@Autowired
	MusicSystemService musicSystemService;
	
	@PostMapping("/add")
	public MusicSystem save(@RequestBody MusicSystem musicSystem) {
		return musicSystemService.save(musicSystem);
	}
	@GetMapping("/all")
	public List<MusicSystem> list(){
		return musicSystemService.getAll();
	}
}
