package com.eventmate.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.Entity.User;
import com.eventmate.Service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // <- added allowCredentials
public class UserController {

    @Autowired
    UserService us;

    @PostMapping("/users/signup")
    public User saveUser(@RequestBody User user) {
        return us.saveUser(user);
    }

    @PostMapping("/login")
    public User getUser(@RequestBody User user) {
        return us.getUser(user.getEmail(), user.getPassword());
    }
}
