const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse the body of the request
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/analyze", (req, res) => {
  const name = req.body.name;
  res.render("loading", { name });
});
app.get("/results", (req, res) => {
  const name = req.query.name;
  const analysisResult = analyzeClient(name);
  res.render("result", { name, analysisResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function analyzeClient(name) {
  // Generate a bunch of random data
  const data = {
    name: name,
    randomNumbers: Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100)
    ),
    randomWords: Array.from({ length: 10 }, () =>
      Math.random().toString(36).substring(7)
    ),
    randomDates: Array.from({ length: 5 }, () =>
      new Date(
        +new Date() - Math.floor(Math.random() * 10000000000)
      ).toDateString()
    ),
    // ... add more types of data as needed
  };

  return data;
}
