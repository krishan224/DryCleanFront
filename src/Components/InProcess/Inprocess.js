import React, { useState, useEffect } from "react";
import invoicesData from './invoices'; // Assuming invoices are in a JSON file
import "./inprocess.css";

const InProcess = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch(invoicesData)
      .then((response) => response.json())
      .then((data) => setInvoices(data));
  

    setInvoices(invoicesData); // Use local data if no API is used
  }, []);

  const handleRowClick = (invoice) => {
    // Handle row click event to show full order details (implementation pending)
    console.log("Clicked invoice:", invoice); // Placeholder for now
  };

  return (
    <div className="dashboard-container">
      <table>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Customer Phone No</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Delivery Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} onClick={() => handleRowClick(invoice)}>
              <td>{invoice.invoiceNo}</td>
              <td>{new Date(invoice.date).toLocaleDateString()}</td> {/* Handle date formatting */}
              <td>{invoice.customerName}</td>
              <td>{invoice.customerPhoneNo}</td>
              <td>{invoice.totalAmount}</td> {/* Assuming a 'totalAmount' property exists */}
              <td>{invoice.status}</td>
              <td>{invoice.deliveryDate}</td>
              <td>
                <a href={`whatsapp://send?phone=${invoice.customerPhoneNo}`}>WhatsApp</a> {/* Direct WhatsApp link */}
                <a href={`sms:${invoice.customerPhoneNo}`}>SMS</a> {/* Direct SMS link (may require device support) */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default InProcess;