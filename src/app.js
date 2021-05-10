const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", templatePath);

hbs.registerPartials(partialPath);

// use static path
app.use(express.static(staticPath));

//Routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("*", (req, res) => {
  res.render("404error", {
    errorMsg: "Opps! Page not Found",
  });
});

app.listen(port, () => {
  console.log(`Listening To The Port At ${port}`);
});
