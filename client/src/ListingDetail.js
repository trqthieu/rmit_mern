import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ListingDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    clientName: '',
    email: '',
    mobilePhone: '',
    postalAddress: '',
    homeAddress: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/listings/${id}`)
      .then(response => setListing(response.data))
      .catch(error => console.error('Error fetching listing details:', error));
  }, [id]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const bookingData = { listingId: id, ...formData };

    axios
      .post('http://localhost:5000/api/bookings', bookingData)
      .then(response => {
        console.log('Booking successful:', response.data);
        setFormData({
          startDate: '',
          endDate: '',
          clientName: '',
          email: '',
          mobilePhone: '',
          postalAddress: '',
          homeAddress: '',
        });
        navigate('/booking-confirmation');
      })
      .catch(error => {
        console.error('Error creating booking:', error);
        alert('Error creating booking, please try again.');
      });
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  const formStyle = {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div>
      <h2>{listing.name}</h2>
      <img
        src={listing.picture_url}
        alt={listing.name}
        style={{ maxWidth: '100%' }}
      />
      <p>{listing.neighborhood_overview}</p>
      <p>
        <strong>Price:</strong> {listing.price}
      </p>
      <p>
        <strong>Review Score:</strong> {listing.review_scores_rating}
      </p>
      <p>
        <strong>Host Name:</strong> {listing.host_name}
      </p>
      <p>
        <strong>Property Type:</strong> {listing.property_type}
      </p>
      <p>
        <strong>Room Type:</strong> {listing.room_type}
      </p>
      <p>
        <strong>Accommodates:</strong> {listing.accommodates}
      </p>
      <p>
        <strong>Bathrooms:</strong> {listing.bathrooms_text}
      </p>
      <p>
        <strong>Amenities:</strong> {listing.amenities.join(', ')}
      </p>

      <form style={formStyle} onSubmit={handleSubmit}>
        <h3
          style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}
        >
          Booking Information
        </h3>
        <label style={labelStyle} htmlFor='startDate'>
          Check In
        </label>
        <input
          style={inputStyle}
          type='date'
          name='startDate'
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />

        <label style={labelStyle} htmlFor='endDate'>
          Check Out
        </label>
        <input
          style={inputStyle}
          type='date'
          name='endDate'
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />

        <label style={labelStyle} htmlFor='clientName'>
          Your Name
        </label>
        <input
          style={inputStyle}
          type='text'
          name='clientName'
          value={formData.clientName}
          onChange={handleInputChange}
          required
        />

        <label style={labelStyle} htmlFor='email'>
          Email Address
        </label>
        <input
          style={inputStyle}
          type='email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label style={labelStyle} htmlFor='mobilePhone'>
          Your Mobile No
        </label>
        <input
          style={inputStyle}
          type='tel'
          name='mobilePhone'
          value={formData.mobilePhone}
          onChange={handleInputChange}
          required
        />

        <label style={labelStyle} htmlFor='postalAddress'>
          Postal Address
        </label>
        <input
          style={inputStyle}
          type='text'
          name='postalAddress'
          value={formData.postalAddress}
          onChange={handleInputChange}
          required
        />

        <label style={labelStyle} htmlFor='homeAddress'>
          Residential Address
        </label>
        <input
          style={inputStyle}
          type='text'
          name='homeAddress'
          value={formData.homeAddress}
          onChange={handleInputChange}
          required
        />

        <button
          type='submit'
          style={buttonStyle}
          onMouseEnter={e =>
            (e.currentTarget.style.backgroundColor =
              buttonHoverStyle.backgroundColor)
          }
          onMouseLeave={e =>
            (e.currentTarget.style.backgroundColor = '#007bff')
          }
        >
          Book Now
        </button>
      </form>
    </div>
  );
}

export default ListingDetail;
