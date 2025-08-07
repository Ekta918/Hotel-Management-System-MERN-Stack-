# 🏨 Hotel Management System - MERN Stack

This is a full-stack **Hotel Management System** built with the **MERN** stack (MongoDB, Express.js, React.js, and Node.js). It includes complete **user authentication**, **online payments via Razorpay**, and a powerful **Admin Dashboard** for managing rooms and users.

---

## ✨ Features

### 🔐 User Side
- Register & Login (with secure authentication)
- Browse available rooms
- Book rooms
- Pay using **Razorpay** payment gateway
- View booking history
- Cancel booking

### 🛠️ Admin Panel
- Add / Edit / Delete Rooms
- Add / Edit / Delete Users
- View all bookings
- Full control over room inventory
- User management with delete/edit functionality

---

## 💻 Tech Stack

| Tech       | Description                  |
|------------|------------------------------|
| MongoDB    | Database                     |
| Express.js | Backend Framework            |
| React.js   | Frontend Library             |
| Node.js    | Server Environment           |
| Razorpay   | Payment Gateway Integration  |
| JWT        | Authentication & Authorization |
| Redux      | State Management (if used)   |
| Bootstrap  | UI Styling (or Tailwind/CSS) |

---

## 🧑‍💻 How to Run Locally

### 🚀 Backend Setup
```bash
cd HappyStay
cd Client
nodemon server.js

### 🌐 Frontend Setup

cd HappyStay
npm start

## 📁 Project Structure

📦 root
├── 📁 client
│   ├── 📁 public
│   └── 📁 src
│       ├── 📁 components
│       └── 📁 screens
├── 📁 models
│   ├── booking.js
│   ├── review.js
│   ├── room.js
│   └── user.js
├── 📁 routes
│   ├── bookingsRoute.js
│   ├── reviewRoute.js
│   ├── roomsRoute.js
│   └── usersRoute.js
├── .env
├── db.js
├── server.js

## 🔑 Environment Variables

Create a `.env` file in the root of your backend with the following:

```
MONGO_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

---

🙋‍♀️ Author
Ekta Vaghasia
💼 MERN Stack Developer
📫 ektavaghasiya9@gmail.com
🔗 www.linkedin.com/in/ekta-vaghasiya-32b12a320

--

## ⭐️ Support

If you like this project, give it a star ⭐ and consider following for more!
