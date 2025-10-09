package com.eventmate.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.Entity.User;
import com.eventmate.Service.UserService;

import jakarta.servlet.http.HttpSession;

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
    public ResponseEntity<?> loginUser(@RequestBody User user, HttpSession session) {
        User loggedInUser = us.getUser(user.getEmail(), user.getPassword());

        if (loggedInUser != null) {
            session.setAttribute("id", loggedInUser.getId());
            session.setAttribute("username", loggedInUser.getUsername());
            session.setAttribute("email", loggedInUser.getEmail());
            session.setAttribute("user", loggedInUser);

            return ResponseEntity.ok(loggedInUser);  // ✅ return User object as JSON
            
        } else {
            return ResponseEntity.status(401).body("Invalid email or password"); // ✅ return error
        }
    }
    @GetMapping("/getSessionUser")
    public ResponseEntity<?> getSessionUser(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.status(401).body("No active session");
        }
    }

    
    @PostMapping("/logout")
    public String logoutUser(HttpSession session) {
        session.invalidate();
        return "Logged out successfully";
    }
}
