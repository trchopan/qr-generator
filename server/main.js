const express = require("express");
// const QRCord = require("qrcode");

const app = express();
const port = 3000;

app.use(express.json());

const indexHandler = (req, res) => {
  console.log(req.body);
  res.status(200).send("hello");
};

app.get("/", indexHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));
