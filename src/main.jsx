import { createRoot } from 'react-dom/client'
import Complaint from './components/Complaint'
import RegisterComplaint from './components/RegisterComplaint'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Complaint />} />
      <Route path="Complaint-Registration" element={<RegisterComplaint />} />
    </>
  )
);
createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />
)
