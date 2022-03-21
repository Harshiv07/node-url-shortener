const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost/urlShortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app.get("/", async (req, res) => {
  let shortUrls;
  try {
    shortUrls = await ShortUrl.find();
  } catch (error) {
    res.render(error);
  }
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  try {
    await ShortUrl.create({ full: req.body.fullURL });
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  let shortUrl;
  try {
    shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    shortUrl.clicks++;
    shortUrl.save();
  } catch (error) {
    res.render(error);
  }
  if (shortUrl == null) return res.sendStatus(404);

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000);
