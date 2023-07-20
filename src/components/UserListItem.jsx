import React, { useState } from "react";
import EditableField from "./EditableField";
import DeleteDialog from "./DeleteDialog";
import { PencilIcon, ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@heroicons/react/outline";

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const genderOptions = [
    "Male",
    "Female",
    "Transgender",
    "Rather not say",
    "Other",
  ];

  const handleAccordionToggle = () => {
    if (!isEditing) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleCountryChange = (e) => {
    // Ensure that the input contains only letters, spaces, and hyphens
    const regex = /^[A-Za-z -]+$/;
    if (regex.test(e.target.value) || e.target.value === "") {
      setCountry(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditToggle = () => {
    // Disable edit mode if the user is below 18
    if (calculateAge(user.dob) >= 18) {
      setIsEditing((prev) => !prev);
    }
  };

  const handleSave = () => {
    // Save changes here, you can call the API or perform any other actions
    console.log('Name:', name);
    console.log('Gender:', gender);
    console.log('Country:', country);
    console.log('Description:', description);

    // Close edit mode
    setIsEditing(false);
  };

  const handleDeleteToggle = () => {
    setIsDeleteDialogOpen((prev) => !prev);
  };

  const handleDelete = () => {
    // Handle the delete functionality here
    console.log(`Deleting user with ID ${user.id}`);
    // Close the delete dialog
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="user-item">
      <div className="user-header">
        <div className="user-info">
          <div className="user-image">
            <img src={user.picture} alt={user.first} />
          </div>
          <div>
            <div className="user-name">
              {isOpen ? (
                <EditableField
                  initialValue={name}
                  onSave={handleSave}
                  isEditing={isEditing}
                  onChange={handleNameChange}
                />
              ) : (
                name
              )}
            </div>
          </div>
        </div>
        <div className="user-icons">
          {isOpen ? (
            <>
              <ArrowUpIcon className="icon" onClick={handleAccordionToggle} />
            </>
          ) : (
            <ArrowDownIcon className="icon" onClick={handleAccordionToggle} />
          )}
        </div>
      </div>
      <div className={`user-details ${isOpen ? "open" : ""}`}>
        {isOpen && (
          <>
          <div className="user-info">
              <div className="user-age">
                {/* Make the age field editable and disable input */}
                {isEditing ? (
                  <input
                    type="text"
                    value={calculateAge(user.dob)}
                    disabled
                  />
                ) : (
                  `Age: ${calculateAge(user.dob)}`
                )}
              </div>
              <div className="user-gender">
                <label>Gender:</label>
                {isEditing ? (
                  <select value={gender} onChange={handleGenderChange}>
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  gender
                )}
              </div>
              <div className="user-country">
                <label>Country:</label>
                <EditableField
                  initialValue={country}
                  onSave={handleSave}
                  isEditing={isEditing}
                  onChange={handleCountryChange}
                />
              </div>
            </div>
             <div className="user-description">
              <label>Description:</label>
              {isEditing ? (
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  rows="5" // Set the rows attribute to make it multiline
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
            {isDeleteDialogOpen ? (
              <DeleteDialog
                onCancel={handleDeleteToggle}
                onDelete={handleDelete}
              />
            ) : (
              <TrashIcon className="delete-icon" onClick={handleDeleteToggle} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListItem;
