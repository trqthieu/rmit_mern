const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sample_airbnb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error('MongoDB connection error:', error));

const listingSchema = new mongoose.Schema(
  {},
  { collection: 'listingsAndReviews' }
);
const Listing = mongoose.model('Listing', listingSchema);

const bookingSchema = new mongoose.Schema(
  {
    listingId: { type: mongoose.Schema.Types.ObjectId, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    clientName: { type: String, required: true },
    email: { type: String, required: true },
    mobilePhone: { type: String, required: true },
    postalAddress: { type: String, required: true },
    homeAddress: { type: String, required: true },
  },
  { collection: 'bookings' }
);

const Booking = mongoose.model('Booking', bookingSchema);

app.get('/api/random-listings', async (req, res) => {
  try {
    const count = await Listing.countDocuments({
      room_type: { $exists: true },
    });
    const randomIndex = Math.floor(Math.random() * count);

    const randomListings = await Listing.find({ room_type: { $exists: true } })
      .skip(randomIndex)
      .limit(5)
      .exec();

    res.json(randomListings);
  } catch (error) {
    console.error('Error fetching random listings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send({ error: 'Error creating booking' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
