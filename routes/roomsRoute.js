const express=require("express");
const router = express.Router();
const Room = require('../models/room')


router.get("/getallrooms", async(req, res) => {

    try{
        const rooms = await Room.find({})
        res.send(rooms)
    }catch(error){
        return res.status(400).json({message: error});
    }

});

router.post("/getroombyid", async (req, res) => {
    const roomid = req.body.roomid;
    try {
        const room = await Room.findOne({ _id: roomid });
        res.send(room); // Send the correct variable here
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/addroom", async(req,res) => {
    try{
        const newroom = new Room(req.body)
        await newroom.save()

        res.send('New Room Added Successfully')
    }catch(error){
        return res.status(400).json({ error });
    }
});

router.post("/delete", async (req, res) => {
  const { roomId } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await Room.findByIdAndDelete(roomId);
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ EDIT ROOM
router.post("/edit", async (req, res) => {
    const { roomId, name, type, rentperday, maxcount, phonenumber } = req.body;
  
    try {
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      // ✅ Update all fields
      room.name = name;
      room.type = type;
      room.rentperday = rentperday;
      room.maxcount = maxcount;
      room.phonenumber = phonenumber;
  
      await room.save();
  
      res.json({ message: "Room updated successfully" });
    } catch (error) {
      console.error("Error updating room:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
module.exports = router;