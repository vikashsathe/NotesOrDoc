import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Register from "./Register";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const msg = await res.text();

      if (res.ok) {
        setMessage("✅ Login successful");
          // ✅ Save login status (or token if your API sends it)
  localStorage.setItem("isLoggedIn", "true");
        navigate("/"); 
      } else {
        setMessage(msg);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div className="bg-zinc-700 loginDiv w-full h-screen relative">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-1/2 max-w-md bg-zinc-600 p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-5xl text-center py-5 mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <br />
          <br />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <br />
          <br />

          <button
            type="submit"
            className="p-2 w-1/2 cursor-pointer text-xl rounded bg-zinc-700"
          >
            Login
          </button>
          <p className="text-xs mt-3 px-2">
            Already have an account?
           <Link to="/register" className="text-blue-500 text-sm cursor-pointer">
              
            
              Registeration
            </Link>
          </p>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;

