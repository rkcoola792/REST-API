const express = require("express");
const app = express();
require("./db/mongoose")
const MensRanking = require("./models/mens");
// to select the port dynamically while hosting, default is 8000
const port = process.env.PORT || 8000;

// for reading the data from postman in JSON format
app.use(express.json());


app.post("/mens", async (req, res) => {
  try {
    const addingMensRecord = await new MensRanking(req.body);
    console.log(req.body);
    const insertMen = await addingMensRecord.save();
    res.status(201).send(insertMen);
  } catch (err) {
    res.status(400, "Similar data").send(err);
  }
});

// fetching the data from db
app.get("/mens", async (req, res) => {
  try {
    const getMens = await MensRanking.find({}).sort({ ranking: 1 });
    res.status(200).send(getMens);
  } catch (err) {
    res.status(400, "Bad request").send(err);
  }
});

// fetching a particular data
app.get("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getMen = await MensRanking.findById({ _id });
    res.status(200).send(getMen);
  } catch (err) {
    res.status(400, "Bad request").send(err);
  }
});

// updating a particular data
app.patch("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getMen = await MensRanking.findByIdAndUpdate(_id, req.body, {
      // to see the new data
      new: true,
    });
    res.status(200).send(getMen);
  } catch (err) {
    res.status(500, "Bad request").send(err);
  }
});

// delete
app.delete("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getMen = await MensRanking.findByIdAndDelete(_id);
    res.status(200).send(getMen);
  } catch (err) {
    res.status(500, "Bad request").send(err);
  }
});

// inserting data into db

app.listen(port, () => {
  console.log(`Connection is live on port ${port}`);
});
