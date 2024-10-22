import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/listings/${id}`)
      .then(response => setListing(response.data))
      .catch(error => console.error('Error fetching listing details:', error));
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

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
      {/* Add more fields as needed */}
    </div>
  );
}

export default ListingDetail;
