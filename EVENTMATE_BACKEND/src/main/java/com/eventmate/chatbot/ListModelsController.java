package com.eventmate.chatbot;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ListModelsController {

    private final String GOOGLE_API_KEY = "AIzaSyBYt8W7VJ-XwiQPpHonSPFr92E9G_PfKSQ"; // replace with your key

    @GetMapping("/listModels")
    public String getModels() {
        try {
            String url = "https://generativelanguage.googleapis.com/v1/models?key=" + GOOGLE_API_KEY;

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody(); // returns JSON with all models
        } catch (Exception e) {
            e.printStackTrace();
            return "Unable to fetch models.";
        }
    }
}
