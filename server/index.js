const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: ['https://air-cnc-588ed.web.app', 'http://localhost:5173'],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kqr4p9m.mongodb.net/?retryWrites=true&w=majority&connectTimeoutMS=5000&maxPoolSize=10`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
const usersCollection = client.db('aircncDb').collection('users');
const roomsCollection = client.db('aircncDb').collection('rooms');
const bookingsCollection = client.db('aircncDb').collection('bookings');

    // save user email and role in DB
    app.put('/users/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options,
      );
      res.send(result);
    });

    // post room api for host
    app.post('/post-rooms', async (req, res) => {
      const roomData = req.body;
      console.log(roomData);
      const result = await roomsCollection.insertOne(roomData);
      res.send(result);
    });

    // get booking data for guest
    app.get('/bookings', async (req, res) => {
      const email = req.query.email;
      if (!email) {
        res.send([{ error: 'Forbidden' }]);
      }
      const query = { 'guest.email': email };
      const result = await bookingsCollection.find(query).toArray();
      res.send(result);
    });

    // delete booking
    app.delete('/bookings/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingsCollection.deleteOne(query);
      res.send(result);
    });

    // delete host rooms
    app.delete('/rooms/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await roomsCollection.deleteOne(query);
      res.send(result);
    });

    // save booking on database
    app.post('/bookings', async (req, res) => {
      const booking = req.body.bookingData;
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });

    // update status of room weather it is booked or not
    app.patch('/rooms/status/:id', async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;
      const filter = { _id: new ObjectId(id) };
      const booking = {
        $set: {
          booked: status,
        },
      };
      const update = await roomsCollection.updateOne(filter, booking);
      res.send(update);
    });

    // get user role
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    // get all rooms data
    app.get('/rooms', async (req, res) => {
      const result = await roomsCollection.find().toArray();
      res.send(result);
    });

    // get host rooms
    app.get('/rooms/:email', async (req, res) => {
      const email = req.params.email;
      const query = { 'host.email': email };
      const result = await roomsCollection.find(query).toArray();
      res.send(result);
    });

    // get individual room data
    app.get('/room/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await roomsCollection.findOne(query);
      res.send(result);
    });

app.get('/', (req, res) => {
  res.send('AirCNC Server is running..');
});

app.listen(port, () => {
  console.log(`AirCNC is running on port ${port}`);
});

module.exports = app;
