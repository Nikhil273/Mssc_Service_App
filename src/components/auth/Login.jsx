import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      }, { withCredentials: true });

      toast.success(response.data.message);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.log(error);
      toast.error(error.response || "Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="text-gray-300 block mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="text-gray-300 block mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold py-3 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don&rsquo;t have an account?{" "}
          <a href="/register" className="text-orange-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
