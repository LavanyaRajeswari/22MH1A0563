const express = require("express");
const router = express.Router();
const { Log } = require("./logger");

const shortLinks = {}; 

router.post("/shorturls", async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || typeof url !== "string") {
    await Log("backend", "error", "handler", "Missing or invalid URL");
    return res.status(400).json({ message: "Invalid URL" });
  }

  const code = shortcode || Math.random().toString(36).substr(2, 6);
  const expiry = new Date(Date.now() + validity * 60 * 1000).toISOString();
  shortLinks[code] = { url, expiry };

  await Log("backend", "info", "service", `Shortened URL created: ${code}`);
  res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry,
  });
});

router.get("/shorturls/:code", async (req, res) => {
  const { code } = req.params;
  const entry = shortLinks[code];

  if (!entry) {
    await Log("backend", "warn", "service", `Shortcode ${code} not found`);
    return res.status(404).json({ message: "Short link not found" });
  }

  res.status(200).json({
    url: entry.url,
    expiry: entry.expiry,
  });
});

module.exports = router;
