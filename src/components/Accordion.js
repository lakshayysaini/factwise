import React, { useState } from 'react';
import UserList from './UserList';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="accordion-container">
      <UserList activeIndex={activeIndex} onAccordionToggle={handleAccordionToggle} />
    </div>
  );
};

export default Accordion;
