import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  HomeOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Table, Typography } from "antd";
import { MessageOutlined } from "@ant-design/icons";


const moment = require("moment");

const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("Admin Check:", currentUser); // Debugging output

    if (!currentUser || !currentUser.isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "40px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <>
              <HomeOutlined />
              Bookings
            </>
          }
          key="1"
        >
          <Bookings />
        </TabPane>
        <TabPane
          tab={
            <>
              <AppstoreAddOutlined />
              Rooms
            </>
          }
          key="2"
        >
          <Rooms />
        </TabPane>
        <TabPane
          tab={
            <>
              <FileAddOutlined />
              Add Room
            </>
          }
          key="3"
        >
          <Addroom />
        </TabPane>
        <TabPane
          tab={
            <>
              <UserOutlined />
              Users
            </>
          }
          key="4"
        >
          <Users />
        </TabPane>
        
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [room, setRoom] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [bookRes, roomRes, userRes] = await Promise.all([
          axios.get("/api/bookings/getallbookings"),
          axios.get("/api/rooms/getallrooms"),
          axios.get("/api/users/getallusers"),
        ]);
        setBookings(bookRes.data);
        setRooms(roomRes.data);
        setUsers(userRes.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diff = (end - start) / (1000 * 60 * 60 * 24) + 1;

      if (diff > 0) {
        setTotalDays(diff);
        const selectedRoom = rooms.find((r) => r.name === room);
        setTotalAmount(selectedRoom ? diff * selectedRoom.rentperday : 0);
      } else {
        setTotalDays(0);
        setTotalAmount(0);
      }
    }
  }, [fromDate, toDate, room, rooms]);

  async function deleteBooking(bookingId) {
    try {
      await axios.post("/api/bookings/delete", { bookingId });
      Swal.fire("Deleted!", "Booking has been removed.", "success");
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (error) {
      Swal.fire("Error!", "Could not delete booking.", "error");
    }
  }

  async function handleAddBooking() {
    if (!userId || !room || !fromDate || !toDate) {
      return Swal.fire("Error!", "All fields are required", "warning");
    }

    try {
      const bookingData = {
        userid: userId,
        room,
        fromdate: fromDate,
        todate: toDate,
        totaldays: totalDays,
        totalamount: totalAmount,
      };

      await axios.post("/api/bookings/adminadd", bookingData);
      Swal.fire("Success!", "Booking added successfully", "success");
      setShowAddBooking(false);
      setUserId("");
      setRoom("");
      setFromDate("");
      setToDate("");
      setTotalDays(0);
      setTotalAmount(0);

      const res = await axios.get("/api/bookings/getallbookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Could not add booking", "error");
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Bookings</h2>

      <div className="text-end mb-3">
        <button className="btn btn-primary" onClick={() => setShowAddBooking(!showAddBooking)}>
          {showAddBooking ? "Close" : "Add Booking"}
        </button>
      </div>

      {showAddBooking && (
        <div className="card p-4 mb-4">
          <h4>Add New Booking</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Select User</label>
              <select className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)}>
                <option value="">Select User</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label>Select Room</label>
              <select className="form-control" value={room} onChange={(e) => setRoom(e.target.value)}>
                <option value="">Select Room</option>
                {rooms.map((r) => (
                  <option key={r._id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label>From Date</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>To Date</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Total Days</label>
              <input type="number" className="form-control" value={totalDays} readOnly />
            </div>

            <div className="col-md-4 mb-3">
              <label>Total Amount</label>
              <input type="number" className="form-control" value={totalAmount} readOnly />
            </div>
          </div>

          <button className="btn btn-success" onClick={handleAddBooking}>
            Submit Booking
          </button>
        </div>
      )}

      {loading && <Loader />}
      {error && <Error message="Failed to load bookings." />}
      {!loading && !error && bookings.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Booking ID</th>
                <th>User ID</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.room}</td>
                  <td>{booking.fromdate}</td>
                  <td>{booking.todate}</td>
                  <td>
                    <span className={`badge ${booking.status === "Booked" ? "bg-success" : "bg-danger"}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Are you sure?",
                          text: "This booking will be deleted permanently!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, delete it!",
                        });

                        if (result.isConfirmed) {
                          deleteBooking(booking._id);
                        }
                      }}
                    >
                      <DeleteOutlined />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 className="text-center">No bookings found</h4>
      )}
    </div>
  );
}



export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        setRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  async function deleteRoom(roomId) {
    try {
      await axios.post("/api/rooms/delete", { roomId });
      Swal.fire("Deleted!", "Room has been removed.", "success");
      setRooms(rooms.filter((r) => r._id !== roomId));
    } catch (error) {
      Swal.fire("Error!", "Could not delete room.", "error");
    }
  }

  async function editRoom(room) {
    const { value: formValues } = await Swal.fire({
      title: "Edit Room Details",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${room.name}">
        <input id="swal-type" class="swal2-input" placeholder="Type" value="${room.type}">
        <input id="swal-rentperday" class="swal2-input" placeholder="Rent per Day" type="number" value="${room.rentperday}">
        <input id="swal-maxcount" class="swal2-input" placeholder="Max Guests" type="number" value="${room.maxcount}">
        <input id="swal-phone" class="swal2-input" placeholder="Phone Number" value="${room.phonenumber}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          roomId: room._id,
          name: document.getElementById("swal-name").value,
          type: document.getElementById("swal-type").value,
          rentperday: document.getElementById("swal-rentperday").value,
          maxcount: document.getElementById("swal-maxcount").value,
          phonenumber: document.getElementById("swal-phone").value,
        };
      },
    });

    if (formValues) {
      try {
        await axios.post("/api/rooms/edit", formValues);
        Swal.fire("Updated!", "Room details have been updated.", "success");

        setRooms(
          rooms.map((r) => (r._id === room._id ? { ...r, ...formValues } : r))
        );
      } catch (error) {
        Swal.fire("Error!", "Could not update room.", "error");
      }
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Rooms</h2>
      {loading && <Loader />}
      {error && <Error message="Failed to load rooms." />}
      {!loading && !error && rooms.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Room ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per Day</th>
                <th>Max Guest</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>₹{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.phonenumber}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => editRoom(room)}
                    >
                      <EditOutlined />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Are you sure?",
                          text: "This Room will be deleted permanently!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, delete it!",
                        });

                        if (result.isConfirmed) {
                          deleteRoom(room._id);
                        }
                      }}
                    >
                      <DeleteOutlined />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 className="text-center">No rooms found</h4>
      )}
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await axios.get("/api/users/getallusers");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // ✅ DELETE USER FUNCTION
  async function deleteUser(userId) {
    try {
      await axios.post("/api/users/deleteuser", { userId });
      Swal.fire("Deleted!", "User has been removed.", "success");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      Swal.fire("Error!", "Could not delete user.", "error");
    }
  }

  // ✅ EDIT USER FUNCTION
  async function editUser(user) {
    const { value: formValues } = await Swal.fire({
      title: "Edit User",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${
          user.name
        }">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${
          user.email
        }">
        <select id="swal-isAdmin" class="swal2-input">
          <option value="true" ${user.isAdmin ? "selected" : ""}>Admin</option>
          <option value="false" ${!user.isAdmin ? "selected" : ""}>User</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          userId: user._id,
          name: document.getElementById("swal-name").value,
          email: document.getElementById("swal-email").value,
          isAdmin: document.getElementById("swal-isAdmin").value === "true",
        };
      },
    });

    if (formValues) {
      try {
        await axios.post("/api/users/edituser", formValues);
        Swal.fire("Updated!", "User details have been updated.", "success");

        setUsers(
          users.map((u) => (u._id === user._id ? { ...u, ...formValues } : u))
        );
      } catch (error) {
        Swal.fire("Error!", "Could not update user.", "error");
      }
    }
  }

  // ✅ ADD USER FUNCTION
  async function addUser() {
    const { value: formValues } = await Swal.fire({
      title: "Add New User",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name">
        <input id="swal-email" class="swal2-input" placeholder="Email">
        <input id="swal-password" class="swal2-input" placeholder="Password" type="password">
        <select id="swal-isAdmin" class="swal2-input">
          <option value="false" selected>User</option>
          <option value="true">Admin</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          email: document.getElementById("swal-email").value,
          password: document.getElementById("swal-password").value,
          isAdmin: document.getElementById("swal-isAdmin").value === "true",
        };
      },
    });

    if (formValues) {
      try {
        const res = await axios.post("/api/users/adduser", formValues);
        Swal.fire("Added!", "New user has been added.", "success");
        setUsers([...users, res.data.user]);
      } catch (error) {
        Swal.fire("Error!", "Could not add user.", "error");
      }
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Users</h2>
      <button className="btn btn-success mb-3" onClick={addUser}>
        Add User
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Failed to load users.</p>}
      {!loading && !error && users.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Is Admin</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.isAdmin ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "Active" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => editUser(user)}
                    >
                      <EditOutlined />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Are you sure?",
                          text: "This User will be deleted permanently!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, delete it!",
                        });

                        if (result.isConfirmed) {
                          deleteUser(user._id);
                        }
                      }}
                    >
                      <DeleteOutlined />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 className="text-center">No users found</h4>
      )}
    </div>
  );
}

export function Addroom() {
  const [name, setName] = useState("");
  const [rentperday, setRentPerDay] = useState("");
  const [maxcount, setMaxCount] = useState("");
  const [description, setDescription] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [imageurl1, setImageUrl1] = useState("");
  const [imageurl2, setImageUrl2] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation Function
  const validateInputs = () => {
    let newErrors = {};

    if (!name.trim() || name.length > 30) {
      newErrors.name = "Room name is required (max 30 chars).";
    }
    if (!/^\d+(\.\d{1,2})?$/.test(rentperday)) {
      newErrors.rentperday = "Rent per day must be a valid number.";
    }
    if (!/^\d+$/.test(maxcount) || maxcount < 1) {
      newErrors.maxcount = "Max count must be a valid positive number.";
    }
    if (!description.trim() || description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }
    if (!/^\d{10}$/.test(phonenumber)) {
      newErrors.phonenumber = "Phone number must be exactly 10 digits.";
    }
    if (!type.trim()) {
      newErrors.type = "Room type is required.";
    }
    if (!imageurl1.trim() || !imageurl2.trim()) {
      newErrors.imageurls = "At least two image URLs are required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function addRoom() {
    if (!validateInputs()) return;

    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2],
    };

    try {
      setLoading(true);

      await axios.post("/api/rooms/addroom", newroom);

      Swal.fire("Success!", "Room added successfully!", "success").then(() => {
        window.location.href = "/admin";
      });

      setName("");
      setRentPerDay("");
      setMaxCount("");
      setDescription("");
      setPhoneNumber("");
      setType("");
      setImageUrl1("");
      setImageUrl2("");
      setErrors({});
    } catch (error) {
      console.error("Error adding room:", error);
      Swal.fire("Error!", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Add New Room</h2>

            <div className="row">
              {/* Left Side Inputs */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label>Room Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label>Rent Per Day (₹)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={rentperday}
                    onChange={(e) => setRentPerDay(e.target.value)}
                  />
                  {errors.rentperday && (
                    <small className="text-danger">{errors.rentperday}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label>Max Count</label>
                  <input
                    type="text"
                    className="form-control"
                    value={maxcount}
                    onChange={(e) => setMaxCount(e.target.value)}
                  />
                  {errors.maxcount && (
                    <small className="text-danger">{errors.maxcount}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <small className="text-danger">{errors.description}</small>
                  )}
                </div>
              </div>

              {/* Right Side Inputs */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phonenumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {errors.phonenumber && (
                    <small className="text-danger">{errors.phonenumber}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label>Room Type</label>
                  <select
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Standard">Standard</option>
                    <option value="Suite">Suite</option>
                  </select>
                  {errors.type && (
                    <small className="text-danger">{errors.type}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label>Image URL 1</label>
                  <input
                    type="text"
                    className="form-control"
                    value={imageurl1}
                    onChange={(e) => setImageUrl1(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Image URL 2</label>
                  <input
                    type="text"
                    className="form-control"
                    value={imageurl2}
                    onChange={(e) => setImageUrl2(e.target.value)}
                  />
                  {errors.imageurls && (
                    <small className="text-danger">{errors.imageurls}</small>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <button
                className="btn btn-success px-4"
                onClick={addRoom}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Room"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
