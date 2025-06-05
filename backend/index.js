require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { analyzeTweet } = require("./controllers/analyzeController");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", analyzeTweet);
app.get("/", (req, res) => {
  res.send(" API is up and running!"); 
});


app.listen(3001, () => console.log("Backend 3001 portunda çalışıyor."));
