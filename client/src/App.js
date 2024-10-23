import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ListingDetail from './ListingDetail';
import BookingConfirmation from './BookingConfirmation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/listings/:id' element={<ListingDetail />} />
        <Route path='/booking-confirmation' element={<BookingConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
