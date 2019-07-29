import express from "express";
import fs from "fs";
import path from "path";

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

  module.exports = router;