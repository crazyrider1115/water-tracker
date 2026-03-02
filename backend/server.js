const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  water: { type: Number, default: 0 },
  lastUpdated: { type: String }
});

const User = mongoose.model("User", userSchema);

const express = require("express");
const cors = require("cors");

const app = express();

const cors = require("cors");

app.use(cors()); // ✅ allow all origins
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  console.log("Server hit!");
  res.send("Backend working");
});

// SIGNUP
app.post("/signup", async (req, res) => {
  console.log("BODY:", req.body); // 👈 ADD THIS

  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.send("User already exists");

  await User.create({
    email,
    password,
    lastUpdated: new Date().toDateString() // 👈 ADD THIS
  });

  res.send("Signup successful");
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) res.send("Login successful");
  else res.status(401).send("Invalid credentials");
});

// UPDATE WATER
app.post("/update-water", async (req, res) => {
  const { email, amount } = req.body;

  const user = await User.findOne({ email });

  user.water += amount;
  await user.save();

  res.json({ water: user.water });
});

// GET WATER
app.post("/get-water", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  const today = new Date().toDateString();

  // 🔥 Reset if new day
  if (user.lastUpdated !== today) {
    user.water = 0;
    user.lastUpdated = today;
    await user.save();
  }

  res.json({ water: user.water });
});

// 🔥 THIS IS THE MOST IMPORTANT LINE
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});