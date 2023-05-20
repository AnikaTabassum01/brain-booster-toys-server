const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//  middleware
app.use(cors());
app.use(express.json());


console.log(process.env.DB_PASS)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.00cx3qd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toyCollection = client.db('toyDB').collection('Toys')


    app.get('/allToy', async (req, res)=>{
      const cursor = toyCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.post('/allToy', async (req, res) => {
      const toyInfo = req.body;
      console.log(toyInfo);
      const result = await toyCollection.insertOne(toyInfo);
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Toys are Loading')
})

app.listen(port, () => {
    console.log(`Brain Booster Toys is running on port: ${port}`)
})