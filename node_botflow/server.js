// server.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'botflow_tool';

app.use(express.json());

// Home Page Database
app.post('/home-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('home_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-home-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('home_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Busy Page Database
app.post('/busy-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('busy_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-busy-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('busy_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Hello Page Database
app.post('/hello-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('hello_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-hello-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('hello_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Bot Page Database
app.post('/bot-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('bot_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-bot-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('bot_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// CustomA Page Database
app.post('/customA-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('customA_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-customA-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('customA_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// customB Page Database
app.post('/customB-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('customB_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-customB-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('customB_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// customC Page Database
app.post('/customC-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('customC_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-customC-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('customC_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// entityQ Page Database
app.post('/entityQ-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('entityQ_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-entityQ-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('entityQ_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Transfer Page Database
app.post('/transfer-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('transfer_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-transfer-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('transfer_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Intro Page Database
app.post('/intro-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('intro_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-intro-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('intro_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Ni Page Database
app.post('/ni-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('ni_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-ni-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('ni_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Pitch Page Database
app.post('/pitch-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('pitch_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-pitch-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('pitch_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Prev Page Database
app.post('/prev-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('prev_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/get-prev-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('prev_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// BinaryQ Page Database
app.post('/binaryQ-flow', async (req, res) => {
  const { flowId, nodes, edges } = req.body;

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('qq_flows');

    // Assuming you have a unique identifier for the flow (e.g., flowId)
    const filter = { flowId: flowId };

    const updatedFlow = { nodes, edges }; // Remove the $set operator

    // Use replaceOne to replace the existing document or insert if not found
    const result = await collection.replaceOne(filter, updatedFlow, { upsert: true });

    // Close the connection after the operation
    await client.close();

    res.json({ message: 'Flow saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/get-binaryQ-flow', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('qq_flows');

    // Use findOne to retrieve a single document
    const result = await collection.findOne();

    // Close the connection after fetching the data
    await client.close();

    res.json(result || {}); // Return an empty object if no flow data is found
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
