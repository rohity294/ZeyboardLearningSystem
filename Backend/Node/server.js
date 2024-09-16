const express = require("express");
const mongoose = require("mongoose");
const { getData } = require("./services/initialDataReaderService");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDBAtlas
let username = "zeyboard";
let password = "zeyboard";
let connectionString = `mongodb+srv://${username}:${password}@mymongodbcluster1.y5gyqp0.mongodb.net/zeyboard?retryWrites=true&w=majority&appName=MyMongoDBCluster1`;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Define schema and model
const modulesSchema = new mongoose.Schema(
  {
    name: String,
  },
  { collection: "modules" }
);

const modulesModel = mongoose.model("modulesModel", modulesSchema);

// Define routes or other middleware here

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// GET endpoint reading from MongoDB Atlas
/*
app.get('/api/v1/initializeModulesAndSubmodules', async (req, res) => {
  //console.log('********hello from node backend');
  let response;
  try {
    let documents;
    const data = await modulesModel.find({}) //MongoDBAtlas Call
    .then(docs => {
      // console.log(docs.length);
      // console.log('Documents:', docs);
      documents = docs;
    })
    .catch(err => {
      console.error('Error retrieving documents:', err);
    });
    return res.json(documents);
  } catch (error) {
    console.error('Error fetching samples:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
*/

// GET endpoint reading from data file
// Define a GET endpoint to fetch users
app.get('/api/data', (req, res) => {
  const data = getData();
  if (data) {
      res.json(data);
  } else {
      res.status(500).json({ error: 'Failed to read data.' });
  }
});
