import React, { useState, useEffect } from 'react';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleHalfStroke,
  faBriefcase,
  faTruck,
  faWallet,
  faTableColumns,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { MdOutlineInventory } from 'react-icons/md';
import Inprocess from '../InProcess/Inprocess';

const icons = [
  { name: 'Inprocess', icon: faCircleHalfStroke },
  { name: 'Ready', icon: faBriefcase },
  { name: 'Delivery', icon: faTruck },
  { name: 'Expenses', icon: faWallet },
  { name: 'Inventory', icon: MdOutlineInventory },
  { name: 'Insights', icon: faTableColumns },
  { name: 'Setting', icon: faGear },
];

const SideBar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemHover = (itemName) => {
    setHoveredItem(itemName);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  // Implement a custom hook (or separate component) to manage blocking
  const useBlockPage = (isActive) => {
    useEffect(() => {
      if (isActive) {
        // Add logic to block the main page (e.g., modal, overlay)
        document.body.classList.add('page-blocked');
      } else {
        // Unblock the main page
        document.body.classList.remove('page-blocked');
      }
    }, [isActive]);
  };

  useBlockPage(activeItem === 'Inprocess'); // Call the hook to block on Inprocess

  return (
    <div className="body">
      <div className="SideBar-container">
        {icons.map((item) => (
          <div
            key={item.name}
            className={`${item.name.toLowerCase()} icon ${
              hoveredItem === item.name ? 'hovered' : ''
            } ${activeItem === item.name ? 'active' : ''}`}
            onMouseEnter={() => handleItemHover(item.name)}
            onMouseLeave={handleItemLeave}
            onClick={() => handleItemClick(item.name)}
          >
            {hoveredItem === item.name && <span className="Licon">{item.name}</span>}
            {item.icon instanceof Function ? (
              <item.icon className={item.name.toLowerCase()} alt={item.name} />
            ) : (
              <FontAwesomeIcon className={`item.name.toLowerCase()`} icon={item.icon} />
            )}
          </div>
        ))}
      </div>
      {activeItem === 'Inprocess' && <Inprocess/>}
    </div>
  );
};

export default SideBar;