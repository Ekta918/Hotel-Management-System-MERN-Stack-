const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Correct model import
const bcrypt = require("bcryptjs");

// router.post("/register", async (req, res) => {
//     const { name, email, password } = req.body;

//     const newUser = new User({ name, email, password });

//     try {
//         const savedUser = await newUser.save();
//         res.send('User registered successfully!');
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Registration failed" });
//     }
// });

// router.post("/register", async (req, res) => {
//   const { name, email, password, isAdmin } = req.body;

//   try {
//       // 🔒 Hash the password before saving
//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newUser = new User({
//           name,
//           email,
//           password: hashedPassword, // ✅ Store hashed password
//           isAdmin: isAdmin || false, // Ensure isAdmin is correctly set
//       });

//       await newUser.save();
//       res.send("User registered successfully!");
//   } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: "Registration failed" });
//   }
// });

const nodemailer = require("nodemailer");

router.post("/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
      status: "Active", // ✅ new field
    });

    await newUser.save();

    // ✉️ Send email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or any SMTP service you use
      auth: {
        user: "ektavaghasiya9@gmail.com", // replace with your email
        pass: "meag dibi mkgo gxlb", // or use environment variables!
      },
    });

    const mailOptions = {
      from: "ektavaghasiya9@gmail.com",
      to: email,
      subject: "Welcome to Our HappyStay!",
      text: `Hello ${name},\n\nThank you for registering! We’re excited to have you on board.\n\n- The Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("User registered successfully!");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Registration failed" });
  }
});

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email, password }); // Fixed case
//         if (user) {
//             res.send(user);
//         } else {
//             return res.status(400).json({ message: "Login failed" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Login error" });
//     }
// });

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//       const user = await User.findOne({ email });

//       if (user && user.password === password) {
//         res.json({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin, // Ensure this is sent in the response
//         });
//       } else {
//         res.status(401).json({ message: "Invalid credentials" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "Server error" });
//     }
//   });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin, // ✅ Ensure this is returned
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// ✅ DELETE USER
// router.post("/deleteuser", async (req, res) => {
//   const { userId } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     await User.findByIdAndDelete(userId);
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ message: "Failed to delete user", error });
//   }
// });

// ✅ GET ALL USERS
// router.get("/getallusers", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// });

// ✅ ADD NEW USER
router.post("/adduser", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const newUser = new User({ name, email, password, isAdmin });
    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to add user" });
  }
});
router.put("/updateprofile", async (req, res) => {
  const { _id, name, email } = req.body;

  try {
    const user = await User.findById(_id);
    if (user) {
      user.name = name;
      user.email = email;
      await user.save();
      res.send("Profile updated");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// ✅ EDIT USER
router.post("/edituser", async (req, res) => {
  const { userId, name, email, isAdmin } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name;
    user.email = email;
    user.isAdmin = isAdmin;

    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

// ✅ DELETE USER
router.post("/deleteuser", async (req, res) => {
  const { userId } = req.body;

  try {
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
