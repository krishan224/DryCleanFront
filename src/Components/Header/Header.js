import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';


const Header = () => {
  return (
    <div>
      <div className="Header-Container"> 
        <img src="logo" alt="WASHMART SAHARNPUR" className="logo-image" />
        <div className="new-orderclick">
            <span className="Nameorderclick">New Order</span>
            <span className="ChevronDownIcon" style={{ marginLeft: '7px' }}><FontAwesomeIcon icon={faChevronDown} /></span>
        
        </div>
        <div className="OrderSearchinput">
          <input className="SearchBar" placeholder="Order Id / Phone / Name" />
         <span className="searchIcon"> <FontAwesomeIcon className="" icon={faSearch} /></span>
        
        </div>
      </div>
    
   </div>
  )
}


export default Header

