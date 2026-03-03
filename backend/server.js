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

// Test route
app.get("/", (req, res) => {
  res.send("Backend working");
});

// Signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.send("User already exists");

  await User.create({
    email: email.toLowerCase(),
    password,
    water: 0,
    lastUpdated: new Date().toDateString()
  });

  res.send("Signup successful");
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) return res.status(401).send("User not found");
  if (user.password !== password) return res.status(401).send("Wrong password");

  res.send("Login successful");
});

// ✅ UPDATE WATER
app.post("/update-water", async (req, res) => {
  const { email, amount } = req.body;

  console.log("UPDATE WATER:", email, amount);

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) return res.status(404).send("User not found");

  user.water = Math.max(0, (user.water || 0) + Number(amount));
  await user.save();

  console.log("NEW WATER:", user.water);

  res.json({ water: user.water });
});

// ✅ GET WATER
app.post("/get-water", async (req, res) => {
  const { email } = req.body;

  console.log("GET WATER:", email);

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) return res.status(404).send("User not found");

  const today = new Date().toDateString();

  if (user.lastUpdated !== today) {
    user.water = 0;
    user.lastUpdated = today;
    await user.save();
  }

  res.json({ water: user.water });
});

// ✅ RESET WATER
app.post("/reset-water", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) return res.status(404).send("User not found");

  user.water = 0;
  user.lastUpdated = new Date().toDateString();

  await user.save();

  res.json({ water: 0 });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});