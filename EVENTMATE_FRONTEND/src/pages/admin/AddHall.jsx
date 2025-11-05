// import axios from "axios";
// import React, { useState } from "react";

// const AddHall = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [venueData, setVenueData] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVenueData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit =async (e) => {
//     e.preventDefault();

//     const response = await axios.post("http://localhost:8080/venue/add", venueData);
//     // Validate URL format
//     // if (!venueData.image || !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(venueData.image)) {
//     //   alert("Please paste a valid public image link ending with .jpg, .png, etc.");
//     //   return;
//     // }

//     console.log("Hall Added:", venueData);
//     alert("Hall added successfully!");
//     setOpenModal(false);
//     setVenueData({});
//   };

//   return (
//     <>
//       {/* Add Hall Card */}
//       <div className="add-card" onClick={() => setOpenModal(true)}>
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/482/482469.png"
//           alt="Hall"
//         />
//         <h3>Add Hall</h3>
//       </div>

//       {/* Modal */}
//       {openModal && (
//         <div className="modal-overlay" onClick={() => setOpenModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h3 style={{ color: "#7b5c2f" }}>Add Hall</h3>

//             <form onSubmit={handleSubmit} className="add-form">
//               <label>
//                 Name:{" "}
//                 <input
//                   type="text"
//                   name="venueName"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 City:{" "}
//                 <input
//                   type="text"
//                   name="venueCity"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 Budget:{" "}
//                 <input
//                   type="number"
//                   name="venueBudget"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 Rating:{" "}
//                 <input
//                   type="number"
//                   step="0.1"
//                   name="venueRating"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 Min Guests:{" "}
//                 <input
//                   type="number"
//                   name="venueMinGuests"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 Max Guests:{" "}
//                 <input
//                   type="number"
//                   name="venueMaxGuests"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               {/* Changed section */}
//               <label>
//                 Paste Public Image Link:{" "}
//                 <input
//                   type="text"
//                   name="venueImageLink"
//                   placeholder="https://example.com/image.jpg"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               {/* Optional live preview */}
//               {venueData.venueImageLink && (
//                 <div style={{ textAlign: "center", marginTop: "10px" }}>
//                   <img
//                     src={venueData.venueImageLink}
//                     alt="Preview"
//                     style={{
//                       width: "100px",
//                       height: "100px",
//                       borderRadius: "8px",
//                       objectFit: "cover",
//                       border: "1px solid #ccc",
//                     }}
//                     onError={(e) => (e.target.style.display = "none")}
//                   />
//                 </div>
//               )}

//               <div className="form-buttons">
//                 <button type="submit" className="approve-btn">
//                   Add Hall
//                 </button>
//                 <button
//                   type="button"
//                   className="delete-btn"
//                   onClick={() => setOpenModal(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AddHall;

import axios from "axios";
import React, { useState } from "react";

const stateCityMap = {
  Telangana: ["Hyderabad"],
  TamilNadu: ["Chennai"],
  Karnataka: ["Bengaluru"],
  Maharashtra: ["Mumbai"],
  Delhi: ["Delhi"]
};


const AddHall = () => {
  const [openModal, setOpenModal] = useState(false);
  const [venueData, setVenueData] = useState({
    venueName: "",
    venueState: "",
    venueCity: "",
    venueBudget: "",
    venueRating: "",
    venueMinGuests: "",
    venueMaxGuests: "",
    venueImageLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setVenueData((prev) => ({
      ...prev,
      venueState: selectedState,
      venueCity: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/venue/add", venueData);

    console.log("Hall Added:", venueData);
    alert("Hall added successfully!");
    setOpenModal(false);
    setVenueData({});
  };

  return (
    <>
      {/* Add Hall Card */}
      <div className="add-card" onClick={() => setOpenModal(true)}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/482/482469.png"
          alt="Hall"
        />
        <h3>Add Hall</h3>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="modal-overlay" onClick={() => setOpenModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: "#7b5c2f" }}>Add Hall</h3>

            <form onSubmit={handleSubmit} className="add-form">
              <label>
                Name:{" "}
                <input
                  type="text"
                  name="venueName"
                  onChange={handleChange}
                  required
                />
              </label>

              {/* ✅ State Dropdown */}
              <label>
                State:{" "}
                <select
                  name="venueState"
                  value={venueData.venueState || ""}
                  onChange={handleStateChange}
                  required
                >
                  <option value="">-- Select State --</option>
                  {Object.keys(stateCityMap).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>

              {/* ✅ City Dropdown */}
              <label>
                City:{" "}
                <select
                  name="venueCity"
                  value={venueData.venueCity || ""}
                  onChange={handleChange}
                  required
                  disabled={!venueData.venueState}
                >
                  <option value="">-- Select City --</option>
                  {stateCityMap[venueData.venueState]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Budget:{" "}
                <input
                  type="number"
                  name="venueBudget"
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Rating:{" "}
                <input
                  type="number"
                  step="0.1"
                  name="venueRating"
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Min Guests:{" "}
                <input
                  type="number"
                  name="venueMinGuests"
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Max Guests:{" "}
                <input
                  type="number"
                  name="venueMaxGuests"
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Paste Public Image Link:{" "}
                <input
                  type="text"
                  name="venueImageLink"
                  placeholder="https://example.com/image.jpg"
                  onChange={handleChange}
                  required
                />
              </label>

              {/* Image Preview */}
              {venueData.venueImageLink && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <img
                    src={venueData.venueImageLink}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}

              <div className="form-buttons">
                <button type="submit" className="approve-btn">
                  Add Hall
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddHall;
