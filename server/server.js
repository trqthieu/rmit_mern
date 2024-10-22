const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error('MongoDB connection error:', error));

// MongoDB Listing schema and model
const listingSchema = new mongoose.Schema(
  {},
  { collection: 'listingsAndReviews' }
);
const Listing = mongoose.model('Listing', listingSchema);

// Endpoint to filter listings based on query parameters
app.get('/api/listings', async (req, res) => {
  const { location, propertyType, bedrooms } = req.query;
  let filter = {};

  if (location) filter['neighbourhood'] = new RegExp(location, 'i');
  if (propertyType) filter['property_type'] = propertyType;
  if (bedrooms) filter['bedrooms'] = parseInt(bedrooms);

  try {
    const listings = await Listing.find(filter)
      .limit(10)
      .select('name summary price review_scores_rating');
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Endpoint to get listing details by ID
app.get('/api/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
