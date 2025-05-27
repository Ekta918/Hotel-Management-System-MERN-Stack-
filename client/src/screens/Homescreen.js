import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import "antd/dist/antd.css";
import Error from "../components/Error";
import moment from "moment";
import { DatePicker } from "antd";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaInfoCircle,
  FaPhoneAlt,
  FaQuestionCircle,
  FaFileContract,
  FaLifeRing,
} from "react-icons/fa";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromdate, setFromDate] = useState(null);
  const [todate, setToDate] = useState(null);
  const [duplicaterooms, setDuplicateRooms] = useState([]);

  const [searchkey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  // ✅ Fetch Rooms (Runs Once)
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
          "http://localhost:5000/api/rooms/getallrooms"
        );
        setRooms(response.data);
        setDuplicateRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // ✅ Filter by Date (Optimized)
  const filterByDate = useCallback(
    (dates) => {
      if (!dates || dates.length < 2) {
        console.log("Invalid date range");
        return;
      }

      const startDate = moment(dates[0]).format("DD-MM-YYYY");
      const endDate = moment(dates[1]).format("DD-MM-YYYY");

      setFromDate(startDate);
      setToDate(endDate);

      const availableRooms = duplicaterooms.filter((room) => {
        return !room.currentbookings.some((booking) => {
          const bookingStart = moment(booking.fromdate, "DD-MM-YYYY");
          const bookingEnd = moment(booking.todate, "DD-MM-YYYY");

          return (
            moment(startDate, "DD-MM-YYYY").isBetween(
              bookingStart,
              bookingEnd,
              null,
              "[]"
            ) ||
            moment(endDate, "DD-MM-YYYY").isBetween(
              bookingStart,
              bookingEnd,
              null,
              "[]"
            ) ||
            moment(startDate, "DD-MM-YYYY").isSame(bookingStart) ||
            moment(endDate, "DD-MM-YYYY").isSame(bookingEnd)
          );
        });
      });

      setRooms(availableRooms);
    },
    [duplicaterooms]
  );

  // ✅ Filter by Search (Optimized)
  const filterBySearch = useCallback(
    (e) => {
      const searchValue = e.target.value.toLowerCase();
      setSearchKey(searchValue);
      setRooms(
        duplicaterooms.filter((room) =>
          room.name.toLowerCase().includes(searchValue)
        )
      );
    },
    [duplicaterooms]
  );

  // ✅ Filter by Type (Optimized)
  const filterByType = useCallback(
    (selectedType) => {
      setType(selectedType);
      setRooms(
        selectedType === "all"
          ? duplicaterooms
          : duplicaterooms.filter(
              (room) => room.type.toLowerCase() === selectedType.toLowerCase()
            )
      );
    },
    [duplicaterooms]
  );

  return (
    <>
      {/* 🔵 Secondary Navbar goes here */}
      <nav className="navbar navbar-expand-lg secondary-navbar">
        <div className="container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/about">
                <FaInfoCircle className="me-2" />
                About Us
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/contact">
                <FaPhoneAlt className="me-2" />
                Contact Us
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/faq">
                <FaQuestionCircle className="me-2" />
                FAQ
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/terms">
                <FaFileContract className="me-2" />
                Terms & Conditions
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/support">
                <FaLifeRing className="me-2" />
                Support
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* 👇 Keep the existing content */}
      <div className="container mt-4">
        <Carousel className="shadow rounded" style={{ overflow: "hidden" }}>
          {duplicaterooms.slice(0, 3).map((room) => (
            <Carousel.Item key={room._id}>
              <img
                className="d-block w-100"
                src={room.imageurls[0]}
                alt={room.name}
                style={{
                  height: "400px",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
              />
              <Carousel.Caption>
                <h3>{room.name}</h3>
                <p>{room.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="row mt-4 p-3 shadow-sm bg-light rounded">
          <div className="col-md-3">
            <label className="fw-bold">Select Date Range:</label>
            <RangePicker format={"DD-MM-YYYY"} onChange={filterByDate} />
          </div>
          <div className="col-md-5">
            <label className="fw-bold">Search Room:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter room name"
              value={searchkey}
              onChange={filterBySearch}
            />
          </div>
          <div className="col-md-3">
            <label className="fw-bold">Filter by Type:</label>
            <select
              className="form-control"
              value={type}
              onChange={(e) => filterByType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="deluxe">Deluxe</option>
              <option value="standard">Standard</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        </div>

        <div className="row justify-content-center align-items-center mt-5">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && rooms.length === 0 && (
            <h3>No rooms available</h3>
          )}
          {!loading &&
            !error &&
            rooms.map((room) => (
              <div className="col-md-9 mt-3" key={room._id}>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            ))}
        </div>
        {/* ✅ Footer */}
        <footer className="bg-dark text-light mt-5 p-4 text-center">
          <div className="row">
            <div className="col-md-6">
              <h5>About Us</h5>
              <p>
                Welcome to our hotel booking platform, where comfort meets
                convenience. Our mission is to provide you with the best hotel
                experience at affordable rates.
              </p>
            </div>
            <div className="col-md-6">
              <h5>Contact Us</h5>
              <p>Email: support@hotelbooking.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Address: 123, Hotel Street, Mumbai, India</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Homescreen;
