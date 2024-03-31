import React, { useState  } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import AddNewPopup from "./AddNewPopup";


import './Main.css';
// import { eventWrapper } from '@testing-library/user-event/dist/utils';

const Main = () => {
  const items = [
    { name: 'T-Shirt', price: 75 },
    { name: 'Pants', price: 79 },
    { name: 'Suit-2pcs', price: 280 },
    { name: 'Suit-3pcs', price: 400 },
    { name: 'Sherwani Set', price: 300 },
    { name: 'Tie', price: 50 },
    { name: 'Achkan', price: 300 },
    { name: 'Jeans', price: 79 },
    { name: 'TrackPant', price: 79 },
    { name: 'Pyjama', price: 79 },
    { name: 'Blazer/Coat', price: 180 },
    { name: 'Safari Suit', price: 250 },
    { name: 'Shorts', price: 69 },
    { name: 'Long Pullover', price: 79 },
    { name: 'Sweater', price: 150 },
    { name: 'High Neck', price: 170 },
    { name: 'Vest', price: 59 },
    { name: 'Underwear', price: 59 },
    { name: 'Sweat Pants', price: 99 },
  ];

  const [quantities, setQuantities] = useState(items.map(() => 1));
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [isOpen, setIsOpen] = useState(false)


  const handleQuantityChange = (index, value) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = parseInt(value, 10);
    setQuantities(updatedQuantities);
  };

  const addToCart = (item, index) => {

    const itemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);

    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity += quantities[index];
      setCartItems(updatedCartItems);
    } else {
      const newItem = { ...item, quantity: quantities[index] };
      setCartItems([...cartItems, newItem]);
    }

  
  };

  const handleClearCart = () => {
    setCartItems([]);
    setDiscount(0);
    
  };

  const handleRowClick = (item, event) => {
    if (event.target.closest('.CartItem-options')) {
      return; 
    }
  
    setSelectedItem((prevSelectedItem) => (prevSelectedItem === item ? null : item));
  };
  
  

  const handleDeleteItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  const handlePlusClick = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
     setCartItems(updatedCartItems);

    };

  const handleMinusClick = (index) => {
    if (cartItems[index].quantity > 1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
    }
  };
  const handleInputValueQuantity = (event, index) => {
    const inputValue = event.target.value.trim();
    const parsedValue = parseInt(inputValue, 10);
    const updatedCartItems = [...cartItems];
    
    if (isNaN(parsedValue) || parsedValue <= 0) {
      updatedCartItems[index].quantity = 0; // Set quantity to 0 if input value is NaN or less than or equal to 0
    } else {
      updatedCartItems[index].quantity = parsedValue; // Otherwise, update the quantity with the parsed value
    }
    
    setCartItems(updatedCartItems);
  };
  const handleInputValuePrice = (event, index) => {
    const inputValue = event.target.value.trim();
    const parsedValue = parseInt(inputValue, 10);
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].price = parsedValue

    setCartItems(updatedCartItems);
  };
  const totalBillAmount = () => {
    let totalBill = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalBill += parseInt(cartItems[i].quantity * cartItems[i].price);
    }
    return totalBill;
  };

  ;
  const calculateDiscountedAmount = () => {
    const totalAmount = totalBillAmount();
    const discountAmount = (totalAmount * parseInt(discount, 10)) / 100;
    
    // Check if discount is NaN or negative before setting it
    if (isNaN(discount) || discount < 0) {
      setDiscount(0);
    }

    const discountedAmount = totalAmount - discountAmount;
    return discountedAmount;
    
  };


  const openPopUp = () => {
    setIsOpen(true);
  };
  const closePopUp = ()=>{
    setIsOpen(false);
  }
  return (
    <div className="Main-container">
      <Router className="allCategoryLinks">
        <Link to="#" className="style-non DryClean">
          DRY CLEAN
        </Link>
        <Link to="#" className="style-non laundry">
          LAUNDRY
        </Link>
        <Link to="#" className="style-non shoeCleaning">
          SHOE CLEANING
        </Link>
        <Link to="#" className="style-non sofaCleaning">
          SOFA CLEANING
        </Link>
        <Link to="#" className="style-non addOns">
          ADD ONS
        </Link>
      </Router>
      <div className="Men-container">
        {items.map((item, index) => (
          <div key={index}>
            <div className="itemName">{item.name}</div>
            <input
              className="Quantity"
              type="text"
              value={quantities[index]}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
            />
            <span className="price">₹{item.price}</span>
            <button onClick={() => addToCart(item, index)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="Cart-container">
        <div className='Upperbar'> 
            <input className='SelectCustomer' placeholder='Select Customer by Phone / Name'/>
            <button className="AddNewCustomer" onClick={openPopUp} >
            ADD NEW
          </button>
          <AddNewPopup isOpen={isOpen} closePopUp={closePopUp} />
        </div>
      
        {cartItems.length === 0 ? (
          <p className="cartDescription">Your cart is empty.</p>
        ) : (
          <div className="Cart-items">
            {cartItems.map((cartItem, index) => (
              <div
                key={index}
                className={`CartItem ${selectedItem === cartItem ? 'selected' : ''}`}
                onClick={(event) => handleRowClick(cartItem, event)}
              >
                <span className="CartItem-name">{cartItem.name}</span>
                <span className="width CartItem-quantity">{cartItem.quantity}</span>
                <span className="width CartItem-price">{cartItem.price}</span>
                <span className="width CartItem-total">{cartItem.price * cartItem.quantity}</span>
            
                {selectedItem === cartItem && (
                  <div className="CartItem-options">
                    <FontAwesomeIcon
                      className="gap deleteBtn"
                      onClick={() => handleDeleteItem(index)}
                      icon={faTrashAlt}
                    />
                    <FontAwesomeIcon className="gap plusBtn" icon={faMinus} onClick={() => handleMinusClick(index)} />
                    <input className="gap UpdateQuantity" type="text" value={cartItem.quantity} onChange={(e)=>handleInputValueQuantity(e, index)} />
                    <FontAwesomeIcon className="gap minusBtn" onClick={() => handlePlusClick(index)} icon={faPlus} />
                    <input className="gap UpdatePrice" type="text" value={cartItem.price} onChange={(e)=>handleInputValuePrice(e, index)} />
                    <input className="gap UpdateTotal" type="text" value={cartItem.price * cartItem.quantity} />
                  </div>
                )}
              </div>
            ))}
            <span className='subTotalBill'>{totalBillAmount()}</span>
            <spna className="persentSign">%</spna>
            <input className='discountInput' value={discount} onChange={(e) => setDiscount(parseInt(e.target.value, 10))}
/>
            <span className='allBillAmount'>{calculateDiscountedAmount(0)}</span>
            <div className='orderSaveBtn'>Save</div>
          </div>
          
        )}
        <button className="ResetBtn" onClick={handleClearCart}>
          RESET
        </button>
    
      </div>
    </div>
  );
};

export default Main;
