const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  water: { type: Number, default: 0 },
  lastUpdated: { type: String }
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Backend working");
});

// Signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.send("User already exists");

  await User.create({
    email,
    password,
    lastUpdated: new Date().toDateString()
  });

  res.send("Signup successful");
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(401).send("User not found");
  if (user.password !== password) return res.status(401).send("Wrong password");

  res.send("Login successful");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});