const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log(err));

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  water: { type: Number, default: 0 },
  lastUpdated: { type: String }
});

const User = mongoose.model("User", userSchema);

// ✅ Routes
app.get("/", (req, res) => {
  console.log("Server hit!");
  res.send("Backend working");
});

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) res.send("Login successful");
  else res.status(401).send("Invalid credentials");
});

app.post("/update-water", async (req, res) => {
  const { email, amount } = req.body;

  const user = await User.findOne({ email });

  user.water += amount;
  await user.save();

  res.json({ water: user.water });
});

app.post("/get-water", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  const today = new Date().toDateString();

  if (user.lastUpdated !== today) {
    user.water = 0;
    user.lastUpdated = today;
    await user.save();
  }

  res.json({ water: user.water });
});

// ✅ IMPORTANT FOR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});