import React, { useEffect, useState } from "react";
import axios from "axios"; 
const ManageEvents = () => {
  const [bookings, setBookings] = useState([]);
 

useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/event/all", {
          method: "GET",
        credentials: "include", // allows session cookies if needed
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);
  



  return (
    <div className="content-wrapper">
      <h2 style={{ color: "#7b5c2f", marginBottom: "20px" }}>
        Hall Bookings
      </h2>

      {bookings.length === 0 ? (
        <p style={{ color: "#9c8b6a" }}>No pending bookings available.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hall</th>
              <th>City</th>
              <th>Booked By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.hall}</td>
                <td>{b.hallCity}</td>
                <td>{b.bookedBy}</td>
                <td>{b.date}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}

      
    </div>
  );
};

export default ManageEvents;
