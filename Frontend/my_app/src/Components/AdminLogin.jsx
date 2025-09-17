import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://amayasoul-ar-powered-handcrafted-store.onrender.com//admin/login", formData, {
        withCredentials: true,
      });

      alert(res.data.message);

      // Save admin info in localStorage
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      nav("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
