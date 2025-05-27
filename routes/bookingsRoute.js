// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/booking");
// const Room = require("../models/room"); // ✅ Import Room model
// const moment = require("moment");
// const Razorpay = require("razorpay");

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// router.post("/create-order", async (req, res) => {
//   const { amount } = req.body;

//   const options = {
//     amount: amount * 100, // Razorpay works in paisa
//     currency: "INR",
//     receipt: `receipt_order_${Math.random().toString(36).slice(2)}`,
//   };

//   try {
//     const order = await razorpayInstance.orders.create(options);
//     res.status(200).json(order);
//   } catch (err) {
//     console.error("Error creating Razorpay order:", err);
//     res.status(500).json({ error: "Razorpay order creation failed" });
//   }
// });


// async function bookRoom() {
//   const currentUser = localStorage.getItem("currentUser")
//     ? JSON.parse(localStorage.getItem("currentUser"))
//     : null;

//   if (!currentUser) {
//     alert("Please log in to book a room.");
//     return;
//   }

//   try {
//     // 1. Create Razorpay Order
//     const { data: order } = await axios.post("/api/payments/create-order", {
//       amount: totalamount,
//     });

//     const options = {
//       key: "rzp_test_iicY1ZqsBx3QED", // replace with your Razorpay public key
//       amount: order.amount,
//       currency: order.currency,
//       name: "Hotel Booking",
//       description: `Booking room: ${room.name}`,
//       order_id: order.id,
//       handler: async function (response) {
//         const bookingDetails = {
//           room,
//           userid: currentUser._id,
//           fromdate: moment(fromdate, "DD-MM-YYYY").format("DD-MM-YYYY"),
//           todate: moment(todate, "DD-MM-YYYY").format("DD-MM-YYYY"),
//           totalamount,
//           totaldays,
//         };
      
//         try {
//           await axios.post("/api/bookings/bookroom", bookingDetails);
//           setPaymentSuccess(true);
//         } catch (err) {
//           console.error("Booking failed after payment:", err);
//           alert("Booking failed.");
//         }
//       },
//       prefill: {
//         name: currentUser.name,
//         email: currentUser.email,
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   } catch (err) {
//     console.error("Error initiating payment:", err);
//     alert("Payment failed. Try again.");
//   }
// }
// router.post("/getbookingsbyuserid", async (req, res) => {
//   const { userid } = req.body;

//   try {
//     console.log("Fetching bookings for user:", userid); // ✅ Debug log

//     const bookings = await Booking.find({ userid });

//     console.log("Fetched bookings:", bookings); // ✅ Debug log

//     res.json(bookings);
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     res.status(400).json({ message: "Failed to fetch bookings", error });
//   }
// });


// // router.post("/cancelbooking" , async(req , res) => {
// //   const {bookingid , roomid} = req.body

// //   try{

// // const bookingitem = await Booking.findOne({_id : bookingid})

// // bookingitem.status = 'cancelled'
// // await bookingitem.save()

// // const  room = await Room.findOne({_id : roomid})

// // const bookings = room.currentbookings

// // const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
// // room.currentbookings = temp

// // await room.save()
// // res.send('Your booking cancelled successfully!')

// //   }catch(error){
// // return res.status(400).json({error});
// //   }
// // });

// router.post("/cancelbooking", async (req, res) => {
//   const { bookingid, roomid } = req.body;

//   try {
//     const bookingitem = await Booking.findOne({ _id: bookingid });

//     if (!bookingitem) {
//       return res.status(404).json({ message: "Booking not found!" });
//     }

//     // Mark booking as cancelled
//     bookingitem.status = "cancelled";
//     await bookingitem.save();

//     // Find the room and update bookings
//     const room = await Room.findOne({ _id: roomid });

//     if (room) {
//       room.currentbookings = room.currentbookings.filter(
//         (booking) => booking.bookingid.toString() !== bookingid
//       );

//       // Save the updated room document
//       await room.save();
//     }

//     res.send("Your booking has been cancelled successfully!");
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// });

// router.get("/getallbookings" , async(req, res) => {

//     try{
//       const bookings = await Booking.find()
//       res.send(bookings)
//     }catch(error){
//       return res.status(400).json({error});
//     }
// });
// module.exports = router;

// router.post("/delete", async (req, res) => {
//   const { bookingId } = req.body;

//   try {
//     const booking = await Booking.findById(bookingId);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     // Remove booking from the room's current bookings
//     const room = await Room.findById(booking.roomid);
//     if (room) {
//       room.currentbookings = room.currentbookings.filter(
//         (b) => b.bookingid.toString() !== bookingId
//       );
//       await room.save();
//     }

//     // Delete the booking
//     await Booking.findByIdAndDelete(bookingId);
//     res.json({ message: "Booking deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting booking:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// router.post("/adminadd", async (req, res) => {
//   const { userid, room, fromdate, todate } = req.body;
//   try {
//     const newBooking = new Booking({
//       userid,
//       room,
//       fromdate,
//       todate,
//       status: "Booked"
//     });
//     await newBooking.save();
//     res.send("Booking added successfully");
//   } catch (err) {
//     res.status(500).send("Error adding booking");
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
// ✅ Razorpay Key Route (Add this here)
router.get("/get-key", (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});
// ✅ Create Razorpay order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_order_${Math.random().toString(36).slice(2)}`,
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ error: "Razorpay order creation failed" });
  }
});

// ✅ Verify Razorpay payment
router.post("/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

// ✅ Book room after successful payment
router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;

  try {
    const newBooking = new Booking({
      room,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      status: "Booked",
    });

    const booking = await newBooking.save();

    const roomId = typeof room === "object" ? room._id : room;
    const bookedRoom = await Room.findById(roomId);

    bookedRoom.currentbookings.push({
      bookingid: booking._id,
      fromdate,
      todate,
      userid,
      status: "Booked",
    });

    await bookedRoom.save();
    res.status(200).json({ message: "Room booked successfully", bookingId: booking._id });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed", error });
  }
});

// Get bookings by user ID
router.post("/getbookingsbyuserid", async (req, res) => {
  const { userid } = req.body;

  try {
    console.log("Fetching bookings for user:", userid);
    const bookings = await Booking.find({ userid });
    console.log("Fetched bookings:", bookings);
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(400).json({ message: "Failed to fetch bookings", error });
  }
});

// Cancel booking
router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });

    if (!bookingitem) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    bookingitem.status = "cancelled";
    await bookingitem.save();

    const room = await Room.findOne({ _id: roomid });

    if (room) {
      room.currentbookings = room.currentbookings.filter(
        (booking) => booking.bookingid.toString() !== bookingid
      );
      await room.save();
    }

    res.send("Your booking has been cancelled successfully!");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Get all bookings
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Delete a booking
router.post("/delete", async (req, res) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const room = await Room.findById(booking.roomid);
    if (room) {
      room.currentbookings = room.currentbookings.filter(
        (b) => b.bookingid.toString() !== bookingId
      );
      await room.save();
    }

    await Booking.findByIdAndDelete(bookingId);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Admin add booking
router.post("/adminadd", async (req, res) => {
  const { userid, room, fromdate, todate } = req.body;
  try {
    const newBooking = new Booking({
      userid,
      room,
      fromdate,
      todate,
      status: "Booked",
    });
    await newBooking.save();
    res.send("Booking added successfully");
  } catch (err) {
    res.status(500).send("Error adding booking");
  }
});

module.exports = router;
