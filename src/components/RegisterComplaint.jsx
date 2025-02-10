import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { wardData, LightType, AreaType } from '../assets/Data';
import 'react-toastify/dist/ReactToastify.css';

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [lighttype, setLighttype] = useState("");  // Updated casing
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");  // Updated casing
  const [ward, setWard] = useState("");
  const [poleno, setPoleno] = useState("");  // Updated casing
  const [areatype, setAreatype] = useState("");  // Updated casing
  const [fullDescription, setDescription] = useState("");  // Fixed spelling
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      console.log("Response:", response);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred in submitting the complaint");
      console.error("Error submitting complaint:", error);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-1">
      <h2 className="text-2xl font-bold text-center text-[#fe6119] mb-2">Register Complaint</h2>
      <form method="post" onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-bold mb-1" htmlFor="username">Full Name</label>
          <input className="w-full p-2 border rounded focus:ring-2 focus:ring-[#fe6119]" id="username" type="text" placeholder="Enter your name" value={username} onChange={(e) => setName(e.target.value)} required />
        </div>

        {/* LED Type */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">Select LED Type:</label>
          <select className="w-full p-2 border rounded focus:ring-2 focus:ring-[#fe6119]" value={lighttype} onChange={(e) => setLighttype(e.target.value)} required>
            <option value="">Select a Light Type</option>
            {LightType.map((Light) => (
              <option key={Light.value} value={Light.value}>{Light.label}</option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-bold mb-1" htmlFor="address">Full Address</label>
          <input className="w-full p-2 border rounded focus:ring-2 focus:ring-[#fe6119]" id="address" type="text" placeholder="Enter Full Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        {/* Landmark */}
        <div>
          <label className="block text-gray-700 font-bold mb-1" htmlFor="landmark">Landmark</label>
          <input className="w-full p-2 border rounded focus:ring-2 focus:ring-[#fe6119]" id="landmark" type="text" placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} required />
        </div>

        {/* Ward */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">Select a Ward:</label>
          <select className="w-full p-2 border rounded focus:ring-2 focus:ring-[#fe6119]" value={ward} onChange={(e) => setWard(e.target.value)} required>
            <option value="">Select a Ward</option>
            {wardData.map((wardItem) => (
              <option key={wardItem.value} value={wardItem}>{wardItem}</option>
            ))}
          </select>
        </div>

        {/* Pole No */}
        <div>
          <label className="block text-gray-700 font-bold mb-1" htmlFor="poleno">Pole Number</label>
          <input className="w-full p-2 border rounded focus:ring-2 focus:ring-[#fe6119]" id="poleno" type="text" placeholder="Enter Pole Number" value={poleno} onChange={(e) => setPoleno(e.target.value)} required />
        </div>

        {/* Area Type */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">Select Area Type:</label>
          <select className="w-full p-2 border rounded focus:ring-2 focus:ring-[#fe6119]" value={areatype} onChange={(e) => setAreatype(e.target.value)} required>
            <option value="">Select Area Type</option>
            {AreaType.map((area) => (
              <option key={area.value} value={area.value}>{area.label}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-bold mb-1" htmlFor="fullDescription">Description</label>
          <textarea className="w-full p-2 border rounded focus:ring-2 focus:ring-[#fe6119]" id="fullDescription" placeholder="Enter your description" value={fullDescription} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">Upload Image</label>
          <input className="w-full p-2 border rounded focus:ring-2 focus:ring-[#fe6119]" onChange={(e) => setImage(e.target.files[0])} type="file" id="img" />
        </div>

        <button className="w-full bg-[#fe6119] hover:bg-[#d45415] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#fe6119]">Register Complaint</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterComplaint;
