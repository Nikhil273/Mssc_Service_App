import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Complaint = () => {
  const [unResolvedData, setUnResolvedData] = useState([]);
  const [resolvedData, setResolvedData] = useState([]);



  async function getUser() {
    try {

      const response = await axios.get('http://localhost:3000/api/add');
      const resolved = response.data.filter((item) => item.status == "Done");
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


  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-4">All Complaints</h1>
      <div className="w-full text-center mb-4">
        <Link to="/Complaint-Registration" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Register Complaint
        </Link>
      </div>

      {/* Completed Complaints Table */}
      <div className="relative overflow-x-auto shadow-lg rounded-lg">
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
                <td className='px-6 py-4 text-green-400'><Link to={item.image}>View</Link></td>
                <td className="px-6 py-4 text-green-400">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending Complaints Table */}
      <div className="mt-8 relative overflow-x-auto shadow-lg rounded-lg">
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
            </tr>
          </thead>
          <tbody>
            {unResolvedData.map((item, index) => (
              <tr key={index} className="border-b border-gray-700 bg-gray-800 hover:bg-gray-700">
                <td className="px-6 py-4">{item.username}</td>
                <td className="px-6 py-4">{item.ward}</td>
                <td className="px-6 py-4">{item.lighttype}</td>
                <td className="px-6 py-4">{item.landmark}</td>
                <td className="px-6 py-4">{item.address}</td>
                <td className="px-6 py-4">{item.poleno}</td>
                <td className="px-6 py-4">{item.areatype}</td>
                <td className="px-6 py-4">{item.fullDescription}</td>
                <td className='px-6 py-4 text-green-400'><Link to={item.image}>View</Link></td>
                <td className="px-6 py-4 text-red-400">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaint;
