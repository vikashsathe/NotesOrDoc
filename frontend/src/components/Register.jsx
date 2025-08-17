import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const msg = await res.text();

       if (res.ok) {
        setMessage("Login successful");
        navigate("/login");  
         
      } else {
        setMessage(msg);
      }




      setMessage(msg);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
  

  <div className="bg-zinc-700 registerDiv w-full h-screen relative">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-1/2 max-w-md bg-zinc-600 p-6 rounded-xl shadow-lg">
      <h2 className="text-5xl text-center py-5 mb-4">Register</h2>

      <form onSubmit={handleSubmit}>
         <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mt-4 mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <button type="submit" className="p-2 w-1/2 cursor-pointer text-xl rounded bg-zinc-700">Register</button>
        

<p className="text-xs mt-3 px-2">
  Already have an account?{" "}
  <Link to="/login" className="text-blue-500 text-sm cursor-pointer">

    Login
  </Link>
</p>
      </form>
      <p>{message}</p>
    </div>

  </div>
  );
};

export default Register;


