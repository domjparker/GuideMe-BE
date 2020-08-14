// * Server Setup
// Dependencies
const express = require("express");
const cors=require('cors');
const session = require("express-session")
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
const { MemoryStore } = require("express-session");

// Express App Setup
const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger("dev"));

// Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin:["http://localhost:3000"],
  credentials:true
}));

// Session Setup
app.use(session({
  secret: "dimma stealth",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 7200000},
  store: new MemoryStore({checkPeriod: 7200000})
}))

// Connects with MongoDB via Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/guideme", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(routes);

// Starts Express Server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});