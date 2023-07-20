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

  const handleAccordionToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
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
              <div className="user-age">Age: {calculateAge(user.dob)}</div>
              <div className="user-gender">
                <label>Gender:</label>
                <EditableField
                  initialValue={gender}
                  onSave={handleSave}
                  isEditing={isEditing}
                  onChange={handleGenderChange}
                />
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
              <EditableField
                initialValue={description}
                onSave={handleSave}
                isEditing={isEditing}
                onChange={handleDescriptionChange}
              />
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
