const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.post("/register", async (req, res) => {
  try {
        const { email, password } = req.body;
        if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
const existingUser = await User.findOne({ email });
if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPasswword = await bcrypt.hash(password, 10);
    const newuser = newuser({
      email, password: hashedPasswword
    });
    await newuser.save();
    res.status(201).json({message : "User registered Successfully"});
   }catch(error){
    res.status(500).json({message : "Server error"});
   }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));


