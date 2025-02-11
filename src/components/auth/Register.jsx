import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", formData);
      toast.success("Registration Successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error(error.response.data.message || "Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-[#fe6119] mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#fe6119]"
            type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#fe6119]"
            type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button className="w-full bg-[#fe6119] hover:bg-[#d45415] transition-all text-white font-bold py-3 rounded-lg">
            Register
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account? <Link to="/login" className="text-[#fe6119]">Login</Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
