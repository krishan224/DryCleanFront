import React, { useState } from 'react';
import './CartBox.css';

const CartBox = ({ cartItems }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleResetBtn = (e) => {
    e.refresh();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
   
    setName('');
    setPhoneNumber('');
    setArea('');
    setCity('');
    setState('');
    // Close the popup
    setShowPopup(false);
  };

 

  return (
    <div className="Cart-container">
      
      <button className="CartResetBtn" onClick={handleResetBtn}>
        RESET
      </button>

      {showPopup && (
        <div className="Popup">
          <h3>Create New Customer</h3>
          <form onSubmit={handleCustomerSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <label>
              Phone Number:
              <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
            </label>
            <label>
              Area:
              <input type="text" value={area} onChange={handleAreaChange} />
            </label>
            <label>
              City:
              <input type="text" value={city} onChange={handleCityChange} />
            </label>
            <label>
              State:
              <input type="text" value={state} onChange={handleStateChange} />
            </label>
            <button type="submit" className="">
              Create
            </button>
          </form>
        </div>
      )}

      {
        
      }

      {/* <div className="TotalAmount">Total: ₹{getTotalAmount()}</div> */}
    </div>
  );
};

export default CartBox;
