import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import server from "../environment";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const res = await fetch(`${server}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Try to parse JSON response
      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        console.error("Server response not JSON:", text);
        setMessage("Server Error: " + text);
        return;
      }

      if (res.ok) {
        // Login success
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("✅ Login successful");
        navigate("/");
      } else {
        // Login failed
        setMessage(data.message || "❌ Login failed");
      }
    } catch (err) {
      // Network or fetch error
      console.error(err);
      setMessage("Network Error: " + err.message);
    }
  };

  return (
    <div className="bg-zinc-700 w-full h-screen flex justify-center items-center">
      <div className="w-96 bg-zinc-600 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl text-center mb-5">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full p-2 border rounded mb-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="w-full p-2 border rounded mb-3"
          />

          <button
            type="submit"
            className="w-full py-2 bg-zinc-700 text-white rounded mb-2"
          >
            Login
          </button>

          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>

        {message && (
          <p className="text-center mt-3 text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
