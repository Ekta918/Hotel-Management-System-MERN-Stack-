import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isValidName = (name) => /^[A-Za-z\s]{1,20}$/.test(name);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => /^(?=.*\d).{6,}$/.test(password);

  async function register() {
    setError("");
    if (!isValidName(name)) return setError("Name must be up to 20 letters.");
    if (!isValidEmail(email)) return setError("Invalid email format.");
    if (!isValidPassword(password)) return setError("Password must be at least 6 characters and include a number.");
    if (password !== cpassword) return setError("Passwords do not match.");

    try {
      setLoading(true);
      setError("");
      setSuccess(false);
      await axios.post("/api/users/register", { name, email, password, isAdmin });
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setIsAdmin(false);
    } catch (error) {
      setLoading(false);
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="container mt-4">
      {loading && <Loader />}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Register</h2>

            {error && <Error message={error} />}
            {success && <Success message="Registration Successful!" />}

            <div className="row">
              {/* Left Side Inputs */}
              
                <div className="mb-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              

              {/* Right Side Inputs */}
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                </div>
              
            </div>

            <div className="mb-3">
              <label>Role</label>
              <select
                className="form-control"
                value={isAdmin ? "Admin" : "User"}
                onChange={(e) => setIsAdmin(e.target.value === "Admin")}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="text-center mt-3">
              <button className="btn btn-primary px-4" onClick={register}>
                REGISTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
