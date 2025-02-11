import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { wardData, LightType, AreaType } from '../assets/Data';
import 'react-toastify/dist/ReactToastify.css';

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [lighttype, setLighttype] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [ward, setWard] = useState("");
  const [poleno, setPoleno] = useState("");
  const [areatype, setAreatype] = useState("");
  const [fullDescription, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("<-------From RegisterComplaint.jsx------->");
    if (!username || !lighttype || !address || !landmark || !ward || !poleno || !areatype || !fullDescription || !image) {
      toast.error("Please fill out all fields");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('lighttype', lighttype);
      formData.append('address', address);
      formData.append('landmark', landmark);
      formData.append('ward', ward);
      formData.append('poleno', poleno);
      formData.append('areatype', areatype);
      formData.append('fullDescription', fullDescription);
      formData.append('image', image);

      const response = await axios.post('http://localhost:3000/api/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(response.data.message);
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred in submitting the complaint");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 shadow-xl rounded-xl mt-6 text-white">
      <h2 className="text-3xl font-semibold text-center text-[#fe6119] mb-4">Register Complaint</h2>
      <form method="post" onSubmit={handleSubmit} className="space-y-6">

        {/* Full Name */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2" htmlFor="username">Full Name</label>
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#fe6119] outline-none"
            id="username" type="text" placeholder="Enter your name"
            value={username} onChange={(e) => setName(e.target.value)} required />
        </div>

        {/* Light Type */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Select LED Type:</label>
          <select className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#fe6119] outline-none"
            value={lighttype} onChange={(e) => setLighttype(e.target.value)} required>
            <option value="">Select a Light Type</option>
            {LightType.map((Light) => (
              <option key={Light.value} value={Light.value}>{Light.label}</option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2" htmlFor="address">Full Address</label>
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#fe6119] outline-none"
            id="address" type="text" placeholder="Enter Full Address"
            value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        {/* Landmark */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2" htmlFor="landmark">Landmark</label>
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#fe6119] outline-none"
            id="landmark" type="text" placeholder="Landmark"
            value={landmark} onChange={(e) => setLandmark(e.target.value)} required />
        </div>

        {/* Ward */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Select a Ward:</label>
          <select className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#fe6119] outline-none"
            value={ward} onChange={(e) => setWard(e.target.value)} required>
            <option value="">Select a Ward</option>
            {wardData.map((wardItem) => (
              <option key={wardItem.value} value={wardItem}>{wardItem}</option>
            ))}
          </select>
        </div>

        {/* Pole No */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2" htmlFor="poleno">Pole Number</label>
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#fe6119] outline-none"
            id="poleno" type="text" placeholder="Enter Pole Number"
            value={poleno} onChange={(e) => setPoleno(e.target.value)} required />
        </div>

        {/* Area Type */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Select Area Type:</label>
          <select className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#fe6119] outline-none"
            value={areatype} onChange={(e) => setAreatype(e.target.value)} required>
            <option value="">Select Area Type</option>
            {AreaType.map((area) => (
              <option key={area.value} value={area.value}>{area.label}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2" htmlFor="fullDescription">Description</label>
          <textarea className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#fe6119] outline-none"
            id="fullDescription" placeholder="Enter your description"
            value={fullDescription} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Upload Image</label>
          <input className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#fe6119] outline-none"
            type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-[#fe6119] hover:bg-[#d45415] transition-all duration-300 text-white font-bold py-3 px-6 rounded-lg focus:ring-2 focus:ring-[#fe6119] shadow-lg">
          Register Complaint
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterComplaint;
