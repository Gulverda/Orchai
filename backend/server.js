const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mockDB';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    seedDatabase();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

const seedDatabase = async () => {
  try {
    const itemCount = await Item.countDocuments();
    if (itemCount === 0) {
      console.log('Database is empty. Seeding with mock data...');
      await Item.create([
        { name: 'Laptop', quantity: 15 },
        { name: 'Monitor', quantity: 32 },
        { name: 'Keyboard', quantity: 50 },
      ]);
      console.log('Mock data successfully seeded.');
    } else {
      console.log('Database already contains data. Skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};


app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching items.', error });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'The "name" field is required.' });
    }
    const newItem = new Item({ name, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the item.', error });
  }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item with the specified ID was not found.' });
        }
        res.json({ message: 'Item successfully deleted.', item });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the item.', error });
    }
});


app.listen(PORT, () => {
  console.log(`Backend server (MongoDB) is running on http://localhost:${PORT}`);
});