import express from "express";
import fs from "fs";
import path from "path";

const validator = require("../middleware/influencer");

const router = express.Router();

const rawData = fs.readFileSync(
    path.resolve(__dirname, "../../mocks/influencers.json"),
    "utf-8"
  );
  const influencers = JSON.parse(rawData);
  
  router.get("/:id", (req, res) => {
    const influencer = influencers.find(
      (f: any) => f.id === parseInt(req.params.id)
    );
  
    if (!influencer)
      return res.status(404).send("Influencer with specified id not found");
  
    res.send(influencer);
  });

  router.post("/", validator, (req: any, res: any) => {
    const last = influencers[influencers.length - 1].id;
    const {
      igFollow,
      igID,
      fbID,
      fbFollow,
      ytFollow,
      ytID,
      fullName,
      email,
      phone,
      ownPromocode,
      refPromoCode,
      refName
    } = req.body;
    const influencer = {
      id: last + 1,
      igFollow,
      igID,
      fbID,
      fbFollow,
      ytFollow,
      ytID,
      fullName,
      email,
      phone,
      ownPromocode,
      refPromoCode,
      refName
    };
  
    influencers.push(influencer);
  
    fs.writeFile(
      path.resolve(__dirname, "../../mocks/influencers.json"),
      JSON.stringify(influencers, null, 2),
      "utf8",
      err => {
        if (err) throw err;
        res.send(influencers);
      }
    );
  });

  module.exports = router;