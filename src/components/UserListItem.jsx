import React, { useState } from 'react';
import EditableField from './EditableField';

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

  const handleAccordionToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`user-item ${isOpen ? 'open' : ''}`}>
      <div className="user-header" onClick={handleAccordionToggle}>
        <div className="user-info">
          <img src={user.picture} alt={user.first} />
          <div>
            <div className="user-name">{`${user.first} ${user.last}`}</div>
            <div className="user-age">{calculateAge(user.dob)}</div>
          </div>
        </div>
        <div className="accordion-icon">{isOpen ? '-' : '+'}</div>
      </div>
      {isOpen && (
        <div className="user-details">
          <div className="user-gender">
            <label>Gender:</label>
            <EditableField
              initialValue={user.gender}
              onSave={(newValue) => console.log(newValue)}
            />
          </div>
          <div className="user-country">
            <label>Country:</label>
            <EditableField
              initialValue={user.country}
              onSave={(newValue) => console.log(newValue)}
            />
          </div>
          <div className="user-description">
            <label>Description:</label>
            <EditableField
              initialValue={user.description}
              onSave={(newValue) => console.log(newValue)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListItem;
