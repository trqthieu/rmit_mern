import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [listings, setListings] = useState([]);

  const handleSearch = e => {
    e.preventDefault();
    axios
      .get('http://localhost:5000/api/listings', {
        params: {
          location,
          propertyType,
          bedrooms,
        },
      })
      .then(response => setListings(response.data))
      .catch(error => console.error('Error fetching listings:', error));
  };

  return (
    <div>
      <h1>Property Listings</h1>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          placeholder='Location'
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />
        <select
          value={propertyType}
          onChange={e => setPropertyType(e.target.value)}
        >
          <option value=''>Select Property Type</option>
          <option value='Private room'>Private Room</option>
          <option value='Entire place'>Entire Place</option>
          <option value='Shared room'>Shared Room</option>
        </select>
        <select value={bedrooms} onChange={e => setBedrooms(e.target.value)}>
          <option value=''>Select Number of Bedrooms</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
        <button type='submit'>Search</button>
      </form>
      <div>
        {listings.map(listing => (
          <div key={listing._id}>
            <Link to={`/listings/${listing._id}`}>{listing.name}</Link>
            <p>{listing.summary}</p>
            <p>Daily Price: {listing.price}</p>
            <p>Rating: {listing.review_scores_rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
