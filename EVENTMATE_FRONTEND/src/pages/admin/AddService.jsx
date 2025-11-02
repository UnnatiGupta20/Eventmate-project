import React, { useState } from "react";


const AddHall = () => {
  const [openModal, setOpenModal] = useState(null); // 'Hall' | 'Music System' | 'Photographer' | null
  const [formData, setFormData] = useState({});

  // handle change for text/number/file
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Added:", openModal, formData);
    alert(`${openModal} added successfully!`);
    setOpenModal(null);
    setFormData({});
  };

  // render form fields dynamically based on modal type
  const renderFormFields = () => {
    switch (openModal) {
      case "Hall":
        return (
          <>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Budget:
              <input
                type="number"
                name="budget"
                value={formData.budget || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Rating:
              <input
                type="number"
                name="rating"
                step="0.1"
                value={formData.rating || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Minimum Guests:
              <input
                type="number"
                name="minGuests"
                value={formData.minGuests || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Maximum Guests:
              <input
                type="number"
                name="maxGuests"
                value={formData.maxGuests || ""}
                onChange={handleInputChange}
                required
              />
            </label>
          </>
        );

      case "Music System":
      case "Photographer":
        return (
          <>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Rating:
              <input
                type="number"
                name="rating"
                step="0.1"
                value={formData.rating || ""}
                onChange={handleInputChange}
                required
              />
            </label>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="content-wrapper">
      <h2 style={{ color: "#7b5c2f", marginBottom: "20px" }}>
        Add New Resources
      </h2>

      {/* ==== Cards ==== */}
      <div className="add-card-container">
        <div className="add-card" onClick={() => setOpenModal("Hall")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/482/482469.png"
            alt="Hall"
          />
          <h3>Add Hall</h3>
        </div>

        <div className="add-card" onClick={() => setOpenModal("Music System")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
            alt="Music"
          />
          <h3>Add Music System</h3>
        </div>

        <div className="add-card" onClick={() => setOpenModal("Photographer")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
            alt="Photographer"
          />
          <h3>Add Photographer</h3>
        </div>
      </div>

      {/* ==== Modal ==== */}
      {openModal && (
        <div className="modal-overlay" onClick={() => setOpenModal(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // stop close on click inside
          >
            <h3 style={{ color: "#7b5c2f" }}>Add {openModal}</h3>
            <form onSubmit={handleSubmit} className="add-form">
              {renderFormFields()}

              <label>
                Upload Image:
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  required
                />
              </label>

              <div className="form-buttons">
                <button type="submit" className="approve-btn">
                  Add {openModal}
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => setOpenModal(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddHall;
