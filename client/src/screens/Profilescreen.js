// import React, { useEffect, useState } from "react";
// import { Tabs, Card, Typography, Divider, Tag, Button, Spin } from "antd";
// import axios from "axios";
// import Swal from "sweetalert2";

// const { TabPane } = Tabs;
// const { Title, Text } = Typography;

// function Profilescreen() {
//   const user = JSON.parse(localStorage.getItem("currentUser"));

//   useEffect(() => {
//     if (!user) {
//       window.location.href = "/login";
//     }
//   }, [user]);

//   return (
//     <div className="container mt-4">
//       <Card className="shadow-lg p-3">
//         <Tabs defaultActiveKey="1">
//           {/* ✅ Profile Tab */}
//           <TabPane tab="Profile" key="1">
//             <Card className="shadow-sm p-3">
//               <Title level={3}>My Profile</Title>
//               <Divider />
//               <p>
//                 <b>Name:</b> {user?.name}
//               </p>
//               <p>
//                 <b>Email:</b> {user?.email}
//               </p>
//               <p>
//                 <b>Admin:</b>{" "}
//                 <Tag color={user?.isAdmin ? "green" : "red"}>
//                   {user?.isAdmin ? "YES" : "NO"}
//                 </Tag>
//               </p>
//             </Card>
//           </TabPane>

//           {/* ✅ Bookings Tab */}
//           <TabPane tab="Bookings" key="2">
//             <MyBookings />
//           </TabPane>
//         </Tabs>
//       </Card>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Tabs, Card, Typography, Divider, Tag, Button, Spin, Modal, Input, message } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

function Profilescreen() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [editVisible, setEditVisible] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, name: editName, email: editEmail };
      const res = await axios.put("/api/users/updateprofile", updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditVisible(false);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to update profile.");
    }
  };

  return (
    <div className="container mt-4">
      <Card className="shadow-lg p-3">
        <Tabs defaultActiveKey="1">
          {/* ✅ Profile Tab */}
          <TabPane tab="Profile" key="1">
            <Card className="shadow-sm p-3">
              <div className="d-flex justify-content-between">
                <Title level={3}>My Profile</Title>
                <Button type="primary" onClick={() => setEditVisible(true)}>Edit Profile</Button>
              </div>
              <Divider />
              <p><b>Name:</b> {user?.name}</p>
              <p><b>Email:</b> {user?.email}</p>
              <p>
                <b>Admin:</b>{" "}
                <Tag color={user?.isAdmin ? "green" : "red"}>
                  {user?.isAdmin ? "YES" : "NO"}
                </Tag>
              </p>
            </Card>
          </TabPane>

          {/* ✅ Bookings Tab */}
          <TabPane tab="Bookings" key="2">
          <MyBookings />
          </TabPane>
        </Tabs>
      </Card>

      {/* ✏️ Edit Modal */}
      <Modal
        title="Edit Profile"
        open={editVisible}
        onOk={handleSave}
        onCancel={() => setEditVisible(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="mb-3">
          <label>Full Name</label>
          <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <Input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
}

export default Profilescreen;


export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/bookings/getbookingsbyuserid",
          { userid: user?._id }
        );
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(true);
        setLoading(false);
      }
    }

    if (user) fetchBookings();
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      const result = (
        await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })
      ).data;
      console.log(result);
      setLoading(false);
      Swal.fire("Success", "Your booking has been cancelled", "success").then(
        () => window.location.reload()
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Error", "Something went wrong", "error");
    }
  }

  return (
    <div className="mt-3">
      <Title level={3}>My Bookings</Title>
      <Divider />

      {loading && <Spin size="large" className="d-block mx-auto" />}
      {error && <Text type="danger">Error fetching bookings</Text>}

      {!loading && !error && bookings.length === 0 && (
        <Text>No bookings found</Text>
      )}

      {!loading &&
        !error &&
        bookings.map((booking) => (
          <Card
            key={booking._id}
            className="shadow-sm p-3 mt-3"
            style={{ borderLeft: "5px solid #1890ff" }}
          >
            <Title level={4}>{booking.room}</Title>
            <Text>
              <b>Booking ID:</b> {booking._id}
            </Text>
            <br />
            <Text>
              <b>Check-In:</b> {booking.fromdate}
            </Text>
            <br />
            <Text>
              <b>Check-Out:</b> {booking.todate}
            </Text>
            <br />
            <Text>
              <b>Total Amount:</b> ₹{booking.totalamount}
            </Text>
            <br />
            <Text>
              <b>Status:</b>{" "}
              <Tag color={booking.status === "cancelled" ? "red" : "green"}>
                {booking.status.toUpperCase()}
              </Tag>
            </Text>
            <Divider />
            {booking.status !== "cancelled" && (
              <Button
                type="primary"
                danger
                onClick={() => cancelBooking(booking._id, booking.roomid)}
              >
                Cancel Booking
              </Button>
            )}
          </Card>
        ))}
    </div>
  );
}
