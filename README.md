# 🎉 EventMate – Full Stack Event Management Platform

## 📘 Overview
**EventMate** is a complete event management solution that connects **users**, **admins**, and **service providers** (venues, photographers, music systems) on one smart platform.  
The goal is to simplify event planning — from **booking venues** to **managing events** — using a seamless interface built with **React JS**, **Spring Boot**, and **MySQL**.

This project includes:
- A fully responsive **User Dashboard** for event creation and management.
- An **Admin Dashboard** for monitoring, approving, and managing events, venues, and services.

---

## 🧩 Features

### 👥 User Features
- ✨ Create, update, and cancel event bookings easily.
- 🏛️ Smart venue suggestions based on city, budget, and capacity.
- 🔒 Prevents double booking of halls on the same date.
- 🧾 View, update, cancel, and rate events via “My Bookings” page.
- 📸 Choose photographers and music systems for your event.
- 💬 Responsive multi-step form with validation and progress tracking.

### 🧑‍💼 Admin Features
- 📊 Dashboard Overview (Total Users, Events, and Bookings).
- 🏢 Manage and approve hall bookings.
- 🧱 Add new Halls, Photographers, and Music Systems via dialog forms.
- 🧾 Manage Users and Feedback directly from the admin panel.
- 🔐 Role-based access and session management.

---

## 🧱 System Architecture

Frontend (React JS) <—> Backend (Spring Boot REST API) <—> Database (MySQL)

markdown
Copy code

- **Frontend:** React, Tailwind, Lucide Icons, Axios for API calls.  
- **Backend:** Spring Boot, Spring Data JPA, REST APIs, Validation.  
- **Database:** MySQL for persistent data (users, venues, bookings, services).

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React JS, Axios, Tailwind CSS, ShadCN UI |
| **Backend** | Spring Boot (Java), Spring Web, Spring Data JPA, Lombok |
| **Database** | MySQL |
| **Build Tools** | npm, Maven |
| **Version Control** | Git & GitHub |
| **Testing** | Postman |

---

## 🧾 Project Modules

### 👤 User Module
- Register, Login, and maintain session.
- Create event bookings using a 5-step guided form.
- Get dynamic venue and vendor suggestions.
- Manage bookings (View, Update, Cancel).
- Rate completed events.

### 🧑‍💼 Admin Module
- Access overview dashboard (User Count, Event Count, etc.).
- Approve or delete event bookings.
- Add new Halls, Music Systems, and Photographers with image upload.
- Manage feedbacks and registered users.

### 🏛️ Venue & Vendor Module
- Register and list venues with budget, rating, and guest capacity.
- Manage photographer and music system profiles.

---

## 🗂️ Database Design (ER Model Summary)

**Entities:**
- `User (user_id, name, email, password, role)`
- `Venue (venue_id, name, city, budget, rating, minGuests, maxGuests)`
- `Event (event_id, name, type, date, time, budget, capacity, venue_id, user_id)`
- `Booking (booking_id, event_id, user_id, status, created_at)`
- `Photographer (photo_id, name, city, rating)`
- `MusicSystem (system_id, name, city, rating)`

**Relationships:**
- User → Event → 1:M  
- Venue → Event → 1:M  
- Event → Booking → 1:1  
- Photographer & MusicSystem → Event → Optional 1:M  

---

## 🔁 API Endpoints (Spring Boot)

| Method | Endpoint | Description |
|---------|-----------|-------------|
| `POST` | `/api/users/login` | Authenticate user |
| `POST` | `/api/users/register` | Register new user |
| `GET` | `/api/bookings` | Fetch all bookings |
| `POST` | `/api/bookings` | Create new booking (with date validation) |
| `PATCH` | `/api/bookings/{id}` | Update existing booking |
| `PATCH` | `/api/bookings/{id}/cancel` | Cancel booking |
| `GET` | `/api/bookings/user/{id}` | Fetch user’s bookings |
| `GET` | `/api/venues` | List available venues |
| `POST` | `/api/venues/add` | Add new venue |
| `GET` | `/api/admin/stats` | Dashboard overview counts |

---


##  🚀 Future Enhancements 
💳 Online payment (Razorpay/Stripe)

📧 Email notifications for confirmation

🤖 AI event recommendation engine

📱 Launch React Native mobile version

☁️ Deploy to AWS EC2 + RDS


   ----


## 👨‍💻 Contributors 

Unnati Gupta 

## 📎 License
This project is built for educational and project purposes.
© 2025 EventMate. All rights reserved.

⭐ If you found this project useful, don’t forget to give it a star on GitHub!
