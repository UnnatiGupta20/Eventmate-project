package com.eventmate.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.eventmate.Entity.Admin;
import com.eventmate.Service.AdminService;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public String login(@RequestBody Admin admin, HttpSession session) {
        Admin activeAdmin = adminService.login(admin);
        System.out.println(activeAdmin);
        if (activeAdmin != null) {
            session.setAttribute("activeAdmin", activeAdmin);
            return "Login Successful";
        } else {
            return "";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        System.out.println("Invalidated");
        return "Logged out successfully";
    }

    @GetMapping("/getsession")
    public String checkSession(HttpSession session) {
    	System.out.println("Admin session checked");
        Admin activeAdmin = (Admin) session.getAttribute("activeAdmin");
        return (activeAdmin != null) ? "adminActive" : "null";
    }
//    @GetMapping("/getsession")
//    public ResponseEntity<?> getSession(HttpSession session) {
//        Object admin = session.getAttribute("admin");
//        if (admin == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//        }
//        return ResponseEntity.ok(admin);
//    }

}
