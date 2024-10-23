import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchRandomListings = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/random-listings'
        );
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching random listings:', error);
      }
    };

    fetchRandomListings();
  }, []);

  const propertyTypes = [
    'Barn',
    'Boat',
    'Camper/RV',
    'Casa particular',
    'Earthen home',
    'Entire cabin',
    'Entire chalet',
    'Entire condo',
    'Entire guest suite',
    'Entire guesthouse',
    'Entire home',
    'Entire loft',
    'Entire place',
    'Entire rental unit',
    'Entire serviced apartment',
    'Entire townhouse',
    'Entire vacation home',
    'Entire villa',
    'Private room',
    'Private room in bed and breakfast',
    'Private room in boat',
    'Private room in camper/rv',
    'Private room in casa particular',
    'Private room in chalet',
    'Private room in condo',
    'Private room in cottage',
    'Private room in dome',
    'Private room in floor',
    'Private room in guest suite',
    'Private room in guesthouse',
    'Private room in home',
    'Private room in hostel',
    'Private room in loft',
    'Private room in rental unit',
    'Private room in serviced apartment',
    'Private room in tiny home',
    'Private room in townhouse',
    'Private room in vacation home',
    'Private room in villa',
    'Room in aparthotel',
    'Room in bed and breakfast',
    'Room in boutique hotel',
    'Room in hostel',
    'Room in hotel',
    'Room in serviced apartment',
    'Shared room in bed and breakfast',
    'Shared room in boutique hotel',
    'Shared room in condo',
    'Shared room in floor',
    'Shared room in guest suite',
    'Shared room in guesthouse',
    'Shared room in home',
    'Shared room in hostel',
    'Shared room in hotel',
    'Shared room in loft',
    'Shared room in rental unit',
    'Shared room in serviced apartment',
    'Shared room in villa',
    'Tiny home',
    'Yurt',
  ];

  const bedroomsOptions = [
    { value: 0, label: 'Studio' },
    { value: 1, label: '1 Bedroom' },
    { value: 2, label: '2 Bedrooms' },
    { value: 3, label: '3 Bedrooms' },
    { value: 4, label: '4 Bedrooms' },
    { value: 5, label: '5 Bedrooms' },
    { value: 6, label: '6 Bedrooms' },
    { value: 7, label: '7 Bedrooms' },
    { value: 8, label: '8 Bedrooms' },
    { value: 9, label: '9 Bedrooms' },
    { value: 10, label: '10 Bedrooms' },
    { value: 11, label: '11 Bedrooms' },
    { value: 12, label: '12 Bedrooms' },
    { value: 15, label: '15 Bedrooms' },
    { value: 16, label: '16 Bedrooms' },
    { value: 18, label: '18 Bedrooms' },
    { value: 50, label: '50+ Bedrooms' },
  ];

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
          {propertyTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select value={bedrooms} onChange={e => setBedrooms(e.target.value)}>
          <option value=''>Select Number of Bedrooms</option>
          {bedroomsOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
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
