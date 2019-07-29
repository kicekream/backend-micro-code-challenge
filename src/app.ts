import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";

const influencer = require("./routes/influencer");

const limiter = new rateLimit({
  windowMs: 15 * 60 * 100,
  max: 100
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(limiter);
app.use("/", influencer);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server started on port 3000"));
