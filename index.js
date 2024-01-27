const express = require('express')
const app = express()
const cors = require('cors')
require("dotenv").config();
const port = process.env.PORT || 3000;

//  


app.use(cors())
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.xifd9dy.mongodb.net/?retryWrites=true&w=majority`;

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


    const eventServicesCollection = client.db("event360").collection("services")


    app.get("/services", async(req,res) =>{
      const result = await eventServicesCollection.find().toArray();
      res.send(result)
    })

  //   app.post("/services" , async(req, res) => {
  //     const items =  req.body;
  //     const result =  await eventServicesCollection.insertOne(items);
  //     res.send(result)
  // })


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
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



