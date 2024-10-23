// BookingConfirmation.js
import React from 'react';
import { Link } from 'react-router-dom';

function BookingConfirmation() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Booking Confirmation</h1>
      <p>Your booking has been successfully confirmed!</p>
      <Link
        to='/'
        style={{ fontSize: '18px', color: '#007bff', textDecoration: 'none' }}
      >
        Return to Homepage
      </Link>
    </div>
  );
}

export default BookingConfirmation;
