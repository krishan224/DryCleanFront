import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddNewPopup.css';

const AddNewPopup = ({ isOpen, closePopUp,}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerArea, setCustomerArea] = useState('');

  const handleNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setCustomerPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setCustomerAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCustomerCity(event.target.value);
  };

  const handleAreaChange = (event) => {
    setCustomerArea(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the handleAddNewItem function passed from Main component

    // Reset the form inputs
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setCustomerCity('');
    setCustomerArea('');

    // Close the popup
    closePopUp();
  };

  return (
    <Modal
      className="container"
      isOpen={isOpen}
      onRequestClose={closePopUp}
    >
      <div className='MainHeading'>Add New Customer</div>
      <form className='formContainer' onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input className='nameInput' type="text" value={customerName} onChange={handleNameChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input className='phoneInput' type="text" value={customerPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <label>Address:</label>
          <input className='addressInput' type="text" value={customerAddress} onChange={handleAddressChange} />
        </div>
        <div>
          <label>City:</label>
          <input className='cityInput' type="text" value={customerCity} onChange={handleCityChange} />
        </div>
        <div>
          <label>Area:</label>
          <input className='areaInput' type="text" value={customerArea} onChange={handleAreaChange} />
        </div>
        <button className='SaveBtn' type="submit">Add Customer</button>
        <button className='closePopupBtn' onClick={closePopUp}>Close</button>
      </form>
    </Modal>
  );
};

export default AddNewPopup;
