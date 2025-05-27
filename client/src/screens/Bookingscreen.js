import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Card, Typography, Divider, Button, Image, Spin, Result } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import { Rate } from "antd";

const { Title, Text } = Typography;

function BookingScreen() {
  const navigate = useNavigate();
  const { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const totaldays =
    moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"), "days") + 1;
  const totalamount = room ? totaldays * room.rentperday : 0;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/rooms/getroombyid",
          { roomid }
        );
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomid]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const [reviews, setReviews] = useState([]);

useEffect(() => {
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/${roomid}`);
      console.log("Fetched reviews:", data);
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err.response?.data || err.message || err);
    }
  };

  if (roomid) {
    fetchReviews();
  }
}, [roomid]);

  async function bookRoom() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please log in to book a room.");
      return;
    }
  
    if (!room || !totalamount || !fromdate || !todate) {
      alert("Missing booking information.");
      return;
    }
  
    try {
      // 1. Get Razorpay key from backend
      const { data: keyData } = await axios.get("/api/bookings/get-key");
      const razorpayKey = keyData.key;
  
      // 2. Create Razorpay order
      const { data: order } = await axios.post("/api/bookings/create-order", {
        amount: totalamount,
      });
  
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "HappyStay",
        description: `Booking room: ${room.name}`,
        order_id: order.id,
  
        handler: async function (response) {
          try {
            const verifyRes = await axios.post("/api/bookings/verify", {
              razorpay_order_id: order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
        
            if (verifyRes.data.success) {
              const bookingDetails = {
                room,
                userid: currentUser._id,
                fromdate: moment(fromdate, "DD-MM-YYYY").format("DD-MM-YYYY"),
                todate: moment(todate, "DD-MM-YYYY").format("DD-MM-YYYY"),
                totalamount,
                totaldays,
              };
        
              const bookingResponse = await axios.post("/api/bookings/bookroom", bookingDetails);
              const bookingId = bookingResponse.data.bookingId || bookingResponse.data._id;
        
              setPaymentSuccess(true);
              navigate(`/review/${room._id}`)
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("BOOKING ERROR:", err.response?.data || err.message || err);
            alert("Something went wrong during payment or booking.");
          }
        },
  
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Payment or booking error:", err);
      alert("Something went wrong during payment.");
    }
  }
  
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {loading && <Spin size="large" className="d-block mx-auto" />}
        {error && <Error />}
        
        {/* ✅ Unique Booking Success Message */}
        {paymentSuccess ? (
          <Result
            status="success"
            title="Payment Successful!"
            subTitle={`Your room (${room?.name}) has been booked from ${fromdate} to ${todate}.`}
            icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
            extra={[
              <Button type="primary" key="dashboard" href="/">
                Go to Dashboard
              </Button>,
              <Button key="bookings" href="/profile">
                View My Bookings
              </Button>,
            ]}
          />
        ) : (
          !loading &&
          !error &&
          room && (
            <Card className="shadow-lg p-4" style={{ maxWidth: "800px" }}>
              <Title level={3}>{room.name}</Title>
              <Divider />

              <div className="row">
                {/* ✅ Left Side - Room Image */}
                <div className="col-md-6">
                  <Image
                    src={room.imageurls[0]}
                    alt={room.name}
                    width="100%"
                    style={{ borderRadius: "10px" }}
                  />
                </div>

                {/* ✅ Right Side - Booking Details */}
                <div className="col-md-6">
                  <div style={{ textAlign: "right" }}>
                    <Title level={4}>Booking Details</Title>
                    <Divider />
                    <Text>
                      <b>Room:</b> {room.name}
                    </Text>
                    <br />
                    <Text>
                      <b>From Date:</b> {fromdate}
                    </Text>
                    <br />
                    <Text>
                      <b>To Date:</b> {todate}
                    </Text>
                    <br />
                    <Text>
                      <b>Max Guests:</b> {room.maxcount}
                    </Text>
                    <br />
                  </div>
                  <Divider />

                  <div style={{ textAlign: "right" }}>
                    <Title level={4}>Amount</Title>
                    <Divider />
                    <Text>
                      <b>Total Days:</b> {totaldays}
                    </Text>
                    <br />
                    <Text>
                      <b>Rent per Day:</b> ₹{room.rentperday}
                    </Text>
                    <br />
                    <Text>
                      <b>Total Amount:</b> ₹{totalamount}
                    </Text>
                    <br />
                  </div>
                  <Divider />

                  {/* ✅ Payment Button */}
                  <div className="text-right">
                    <Button type="primary" size="large" onClick={bookRoom}>
                      Pay Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        )}
      </div>
      <Divider />
<Title level={4}>What others are saying</Title>
{reviews.length === 0 ? (
  <Text type="secondary">No reviews yet.</Text>
) : (
  reviews.map((review, index) => (
    <Card key={index} className="mb-3">
      <Text strong>{review.userId?.name || "Anonymous"}</Text>
      <br />
      <Rate disabled value={review.rating} />
      <p>{review.comment}</p>
    </Card>
  ))
)}

    </div>
  );
}

export default BookingScreen;
