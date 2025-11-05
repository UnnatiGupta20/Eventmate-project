// import axios from "axios";
// import React, { useState } from "react";

// const AddPhotographer = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [formData, setFormData] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();

//     const response=await axios.post("http://localhost:8080/photographer/add",formData);
//     // Validate public image link
//     // if (!formData.image || !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(formData.image)) {
//     //   alert("Please paste a valid public image link ending with .jpg, .png, etc.");
//     //   return;
//     // }

//     console.log("Photographer Added:", formData);
//     alert("Photographer added successfully!");
//     setOpenModal(false);
//     setFormData({});
//   };

//   return (
//     <>
//       {/* Card */}
//       <div className="add-card" onClick={() => setOpenModal(true)}>
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
//           alt="Photographer"
//         />
//         <h3>Add Photographer</h3>
//       </div>

//       {/* Modal */}
//       {openModal && (
//         <div className="modal-overlay" onClick={() => setOpenModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h3 style={{ color: "#7b5c2f" }}>Add Photographer</h3>

//             <form onSubmit={handleSubmit} className="add-form">
//               <label>
//                 Name:
//                 <input type="text" name="photographerName" onChange={handleChange} required />
//               </label>

//               <label>
//                 City:
//                 <input type="text" name="photographerCity" onChange={handleChange} required />
//               </label>

//               <label>
//                 Rating:
//                 <input
//                   type="number"
//                   step="0.1"
//                   name="photographerRating"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               {/* Replaced file input with link input */}
//               <label>
//                 Paste Public Image Link:
//                 <input
//                   type="text"
//                   name="photographerImageURL"
//                   placeholder="https://example.com/image.jpg"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               {/* Optional live preview */}
//               {formData.image && (
//                 <div style={{ textAlign: "center", marginTop: "10px" }}>
//                   <img
//                     src={formData.image}
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
//                   Add Photographer
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

// export default AddPhotographer;

import axios from "axios";
import React, { useState } from "react";

// ✅ India State–City Map
const stateCityMap = {
  Telangana: ["Hyderabad"],
  TamilNadu: ["Chennai"],
  Karnataka: ["Bengaluru"],
  Maharashtra: ["Mumbai"],
  Delhi: ["Delhi"]
};


const AddPhotographer = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    photographerName: "",
    photographerState: "",
    photographerCity: "",
    photographerRating: "",
    photographerImageURL: "",
  });

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // ✅ Handle State Change - resets city
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((p) => ({
      ...p,
      photographerState: selectedState,
      photographerCity: "",
    }));
  };

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/photographer/add", formData);
    console.log("Photographer Added:", formData);
    alert("Photographer added successfully!");
    setOpenModal(false);
    setFormData({});
  };

  return (
    <>
      {/* Add Photographer Card */}
      <div className="add-card" onClick={() => setOpenModal(true)}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
          alt="Photographer"
        />
        <h3>Add Photographer</h3>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="modal-overlay" onClick={() => setOpenModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: "#7b5c2f" }}>Add Photographer</h3>

            <form onSubmit={handleSubmit} className="add-form">
              <label>
                Name:
                <input
                  type="text"
                  name="photographerName"
                  onChange={handleChange}
                  required
                />
              </label>

              {/* ✅ State Dropdown */}
              <label>
                State:
                <select
                  name="photographerState"
                  value={formData.photographerState || ""}
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
                City:
                <select
                  name="photographerCity"
                  value={formData.photographerCity || ""}
                  onChange={handleChange}
                  required
                  disabled={!formData.photographerState}
                >
                  <option value="">-- Select City --</option>
                  {stateCityMap[formData.photographerState]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Rating:
                <input
                  type="number"
                  step="0.1"
                  name="photographerRating"
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Paste Public Image Link:
                <input
                  type="text"
                  name="photographerImageURL"
                  placeholder="https://example.com/image.jpg"
                  onChange={handleChange}
                  required
                />
              </label>

              {/* ✅ Live Image Preview */}
              {formData.photographerImageURL && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <img
                    src={formData.photographerImageURL}
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
                  Add Photographer
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

export default AddPhotographer;


