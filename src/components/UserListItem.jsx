import React, { useState } from "react";
import EditableField from "./EditableField";
import {
  PencilIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/outline";

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }
  return age;
};

const UserListItem = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.first);
  const [gender, setGender] = useState(user.gender);
  const [country, setCountry] = useState(user.country);
  const [description, setDescription] = useState(user.description);

  const handleAccordionToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNameChange = (newValue) => {
    setName(newValue);
  };

  const handleGenderChange = (newValue) => {
    setGender(newValue);
  };

  const handleCountryChange = (newValue) => {
    setCountry(newValue);
  };

  const handleDescriptionChange = (newValue) => {
    setDescription(newValue);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    // Save changes here, you can call the API or perform any other actions
    console.log("Name:", name);
    console.log("Gender:", gender);
    console.log("Country:", country);
    console.log("Description:", description);

    // Close edit mode
    setIsEditing(false);
  };

  return (
    <div className="user-item">
      <div className="user-header">
        <div className="user-info">
          <img src={user.picture} alt={user.first} />
          <div>
            <div className="user-name">
              {isOpen ? (
                <EditableField
                  initialValue={name}
                  onSave={handleNameChange}
                  isEditing={isEditing}
                />
              ) : (
                name
              )}
            </div>
            <div className="user-age">{calculateAge(user.dob)}</div>
          </div>
        </div>
        <div className="accordion-icon" onClick={handleAccordionToggle}>
          {isOpen ? (
            <ArrowUpIcon className="icon" />
          ) : (
            <ArrowDownIcon className="icon" />
          )}
        </div>
      </div>
      <div className={`user-details ${isOpen ? "open" : ""}`}>
        {isOpen && (
          <>
            <div className="user-gender">
              <label>Gender:</label>
              {isEditing ? (
                <EditableField
                  initialValue={gender}
                  onSave={handleGenderChange}
                  isEditing={isEditing}
                />
              ) : (
                gender
              )}
            </div>
            <div className="user-country">
              <label>Country:</label>
              {isEditing ? (
                <EditableField
                  initialValue={country}
                  onSave={handleCountryChange}
                  isEditing={isEditing}
                />
              ) : (
                country
              )}
            </div>
            <div className="user-description">
              <label>Description:</label>
              {isEditing ? (
                <EditableField
                  initialValue={description}
                  onSave={handleDescriptionChange}
                  isEditing={isEditing}
                />
              ) : (
                description
              )}
            </div>
          </>
        )}
        {isOpen && (
          <div className="edit-button-container">
            {isEditing ? (
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            ) : (
              <PencilIcon className="edit-icon" onClick={handleEditToggle} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListItem;
