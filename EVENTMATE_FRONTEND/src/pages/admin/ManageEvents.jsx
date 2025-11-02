import React, { useEffect, useState } from "react";

const ManageEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [approvedBookings, setApprovedBookings] = useState([]); // store approved ones

  useEffect(() => {
    // Simulated hall booking fetch (dummy data)
    const timer = setTimeout(() => {
      setBookings([
        {
          id: 1,
          hall: "Grand Palace Hall",
          bookedBy: "Alice Johnson",
          date: "2025-12-15",
        },
        {
          id: 2,
          hall: "Sunset Banquet",
          bookedBy: "Bob Williams",
          date: "2025-11-10",
        },
        {
          id: 3,
          hall: "Grand Palace Hall",
          bookedBy: "Charlie Brown",
          date: "2025-12-15", // duplicate hall & date
        },
      ]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const approve = (id) => {
    const booking = bookings.find((b) => b.id === id);

    // ❌ Check if hall already booked for this date
    const isAlreadyBooked = approvedBookings.some(
      (a) => a.hall === booking.hall && a.date === booking.date
    );

    if (isAlreadyBooked) {
      alert(`❌ ${booking.hall} is already booked on ${booking.date}`);
      return;
    }

    // ✅ Otherwise approve
    alert(`✅ ${booking.hall} booked successfully for ${booking.date}`);

    // Save to approved list (simulate DB save)
    setApprovedBookings((prev) => [...prev, booking]);

    // Remove from pending list
    setBookings((prev) => prev.filter((b) => b.id !== id));

    // 🟢 In real backend:
    // await API.post("/bookings/approve", booking);
  };

  const deleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="content-wrapper">
      <h2 style={{ color: "#7b5c2f", marginBottom: "20px" }}>
        Manage Hall Bookings
      </h2>

      {bookings.length === 0 ? (
        <p style={{ color: "#9c8b6a" }}>No pending bookings available.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hall</th>
              <th>Booked By</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.hall}</td>
                <td>{b.bookedBy}</td>
                <td>{b.date}</td>
                <td>
                  <button
                    className="approve-btn"
                    onClick={() => approve(b.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Approve
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteBooking(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {approvedBookings.length > 0 && (
        <>
          <h3 style={{ marginTop: "30px", color: "#7b5c2f" }}>
            ✅ Approved / Booked Halls
          </h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hall</th>
                <th>Booked By</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {approvedBookings.map((a, i) => (
                <tr key={i}>
                  <td>{a.hall}</td>
                  <td>{a.bookedBy}</td>
                  <td>{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManageEvents;
