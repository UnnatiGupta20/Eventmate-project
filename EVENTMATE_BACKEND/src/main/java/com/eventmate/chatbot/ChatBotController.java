package com.eventmate.chatbot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.eventmate.Service.VenueService;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

import java.util.List;

import com.eventmate.Entity.Venue;

@RestController
@RequestMapping("/chatbot")
@CrossOrigin(origins = "*")
public class ChatBotController {

    @Autowired
    private VenueService venueService;

    private final Client client;

    public ChatBotController() {
        this.client = Client.builder()
                .apiKey("AIzaSyCGFqABr0QdeNlePrgVBC_mhu5_ot-9dQE")
                .build();
    }

    /**
     * Combines the user's message with the latest venue data
     */
    private String buildPrompt(String userMessage) {
        List<Venue> venues = venueService.getAll();

        StringBuilder sb = new StringBuilder();
        sb.append("You are a helpful assistant. Here are the venues currently available:\n");
        for (Venue v : venues) {
            sb.append("- ").append(v.getVenueName())
              .append(" in ").append(v.getVenueCity())
              .append(", Capacity: ").append(v.getVenueMaxGuests())
              .append(", Average Rating: ")
              .append(v.getVenueRating() != null ? String.format("%.2f", v.getVenueRating()) : "N/A")
              .append("\n");
        }

        sb.append("\nAnswer the user's query: ").append(userMessage);
        return sb.toString();
    }

    /**
     * User sends a message to the chatbot
     */
    @PostMapping("/ask")
    public String askBot(@RequestBody String userMessage) {
        try {
            // Build prompt dynamically with venue data
            String prompt = buildPrompt(userMessage);

            GenerateContentResponse response = client.models.generateContent(
                    "gemini-2.5-flash",
                    prompt,
                    null
            );

            System.out.println("User Message: " + userMessage);
            System.out.println("Generated Response: " + response.text());
            return response.text();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    @GetMapping("/ping")
    public String ping() {
        return "Chatbot is running!";
    }
}
