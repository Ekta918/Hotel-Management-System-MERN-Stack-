import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => /^(?=.*\d).{6,}$/.test(password);

  async function login() {
    setError("");
    if (!isValidEmail(email)) return setError("Invalid email format.");
    if (!isValidPassword(password)) return setError("Password must be at least 6 characters and include a number.");

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const result = await axios.post("/api/users/login", { email, password });
      setLoading(false);
      setSuccess(true);

      localStorage.setItem("currentUser", JSON.stringify(result.data));

      window.location.href = result.data.isAdmin ? "/admin" : "/home";
    } catch (error) {
      setLoading(false);
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="container mt-4">
      {loading && <Loader />}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Login</h2>

            {error && <Error message={error} />}
            {success && <Success message="Login Successful! Redirecting..." />}

            <div className="mb-3">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-center mt-3">
              <button className="btn btn-primary px-4" onClick={login}>
                LOGIN
              </button>
            </div>

            <div className="text-center mt-2">
              <a href="/register" className="text-decoration-none">
                Don't have an account? Register here.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
