import { createRoot } from 'react-dom/client'
import Complaint from './components/Complaint'
import RegisterComplaint from './components/RegisterComplaint'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Complaint />} />
      <Route path="/login" element={<Login />} />
      <Route path="Complaint-Registration" element={<RegisterComplaint />} />
      <Route path="/register" element={<Register />} />

    </>
  )
);
createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />
)
