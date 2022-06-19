const path = require("path");
const { forecast } = require("./utils/forecast");
const { geoCode } = require("./utils/geocode");
const express = require("express");
const hbs = require("hbs");

const app = express();

//Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Chase",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Chase Callahan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is where you can get help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide an address!",
    });
  }
  const { address } = req.query;
  geoCode(address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error: "Could not find your location",
      });
    }
    forecast({ lat, long }, (error, { forecast, location }) => {
      if (error) {
        return res.send(`Could not retrieve the forecast for ${location}`);
      }
      return res.send({
        forecast,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("not-found", {
    title: "Not Found",
    message: "Help article was not found",
  });
});

app.get("*", (req, res) => {
  res.render("not-found", {
    title: "Not found",
    message: "Page was not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000!");
});
