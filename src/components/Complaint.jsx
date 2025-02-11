/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Complaint = () => {
  const navigate = useNavigate();
  const [unResolvedData, setUnResolvedData] = useState([]);
  const [resolvedData, setResolvedData] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");

  async function getUser() {
    try {
      const response = await axios.get('http://localhost:3000/api/get-complaints');
      toast.success(response.data.message);
      const resolved = response.data.filter((item) => item.status === "Done");
      const unResolved = response.data.filter((item) => item.status === "Pending");
      setResolvedData(resolved);
      setUnResolvedData(unResolved);

    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  // Function to toggle status
  const toggleStatus = async (id) => {
    console.log("Toggling Status for ID:", id); // Check if function is being called
    try {
      const response = await axios.put(`http://localhost:3000/api/update/${id}`, { status: "Done" });

      toast.success(response.data.message); // Check API response

      const updatedUnResolved = unResolvedData.filter((item) => item._id !== id);
      const updatedItem = unResolvedData.find((item) => item._id === id);
      if (updatedItem) {
        updatedItem.status = "Done";
        setUnResolvedData(updatedUnResolved);
        setResolvedData([...resolvedData, updatedItem]);
      }

    } catch (error) {
      console.error("Error updating status:", error);
      if (error.response) console.log("Server Error:", error.response.data);
    }
  };

  const deleteHandler = async (id) => {
    console.log("Delete Status for ID:", id); // Check if function is being called
    try {
      const response = await axios.delete(`http://localhost:3000/api/delete/${id}`);
      toast.success(response.data.message);
      setUnResolvedData(unResolvedData.filter((item) => item._id !== id));
      // Refresh or update state to remove deleted item
    } catch (error) {
      toast.error("Failed <fn/>>to delete complaint", error);
    }
  };

  const uniqueUsernames = [...new Set(unResolvedData.map(item => item.username))];
  const filteredUnresolved = selectedUsername
    ? unResolvedData.filter(item => item.username === selectedUsername)
    : unResolvedData;

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-4">All Complaints</h1>
      <div className="w-full text-center mb-4">
        <Link to="/Complaint-Registration" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Register Complaint
        </Link>
      </div>

      {/* Filter by Username */}
      <div className="mb-4 text-center">
        <label className="mr-2 text-lg font-medium">Filter by Username:</label>
        <select
          className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600"
          value={selectedUsername}
          onChange={(e) => setSelectedUsername(e.target.value)}
        >
          <option value="">All Users</option>
          {uniqueUsernames.map((username, index) => (
            <option key={index} value={username}>
              {username}
            </option>
          ))}
        </select>
      </div>

      {/* Pending Complaints Table */}
      {
        (filteredUnresolved.length > 0) ? (<div className="relative overflow-x-auto shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-red-400 mb-2">Pending Complaints</h2>
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-200 uppercase bg-gray-800">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Ward</th>
                <th className="px-6 py-3">Light Type</th>
                <th className="px-6 py-3">Landmark</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Pole No</th>
                <th className="px-6 py-3">Area Type</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnresolved.map((item, index) => (
                <tr key={index} className="border-b border-gray-700 bg-gray-800 hover:bg-gray-700">
                  <td className="px-6 py-4">{item.username}</td>
                  <td className="px-6 py-4">{item.ward}</td>
                  <td className="px-6 py-4">{item.lighttype}</td>
                  <td className="px-6 py-4">{item.landmark}</td>
                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4">{item.poleno}</td>
                  <td className="px-6 py-4">{item.areatype}</td>
                  <td className="px-6 py-4">{item.fullDescription}</td>
                  <td className="px-6 py-4 text-green-400">
                    <Link className='text-[#fe6119]' to={item.image}>View</Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      // item._id is the unique id of the complaint comes from MongoDB
                      onClick={() => toggleStatus(item._id)}
                      className="bg-red-500 hover:bg-green-500 text-white font-bold py-1 px-3 rounded transition-all cursor-pointer"
                    >
                      {item.status}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button

                      onClick={() => deleteHandler(item._id)}
                      className="bg-red-500 hover:bg-white hover:text-red-600 text-white font-bold py-1 px-3 rounded transition-all cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ) : (<h2 className="text-2xl font-semibold text-center text-red-400 mb-2">No Pending Complaints</h2>)

      }
      {/* Completed Complaints Table */}
      <div className="mt-8 relative overflow-x-auto shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-green-400 mb-2">Completed Complaints</h2>
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-200 uppercase bg-gray-800">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Ward</th>
              <th className="px-6 py-3">Light Type</th>
              <th className="px-6 py-3">Landmark</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Pole No</th>
              <th className="px-6 py-3">Area Type</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {resolvedData.map((item, index) => (
              <tr key={index} className="border-b border-gray-700 bg-gray-800 hover:bg-gray-700">
                <td className="px-6 py-4">{item.username}</td>
                <td className="px-6 py-4">{item.ward}</td>
                <td className="px-6 py-4">{item.lighttype}</td>
                <td className="px-6 py-4">{item.landmark}</td>
                <td className="px-6 py-4">{item.address}</td>
                <td className="px-6 py-4">{item.poleno}</td>
                <td className="px-6 py-4">{item.areatype}</td>
                <td className="px-6 py-4">{item.fullDescription}</td>
                <td className="px-6 py-4 text-green-400">
                  <Link className='text-[#fe6119]' to={item.image}>View</Link>
                </td>
                <td className="px-3 py-1 text-green-500  ">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Complaint;
