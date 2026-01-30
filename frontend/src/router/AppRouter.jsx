import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoute from '../components/PublicRoute';
import AuthLayout from '../layout/authLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import HomeLayout from '../layout/HomeLayout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/AuthSlice';

const AppRouter = () => {
     const dispatch=useDispatch()

    useEffect(() => {
  (async () => {
    try {
      let res = await axios.get(
        "http://localhost:3000/api/cur-user",
        { withCredentials: true }
      );

      if (res) {
        dispatch(setUser(res.data.user));
      }
      if(!res){
        console.log("api hi glt hai bhai")
      }
    } catch (error) {
      console.log("error in cur-api", error);
    }
  })();
}, []);

  const router=createBrowserRouter([
    {
        path:"",
        element:<PublicRoute />,
        children:[
            {
              path:"",
              element:<AuthLayout />
            }
        ]
    },
    {
        path:'/home',
        element:<ProtectedRoute />,
        children:[{
           path:"/home",
           element:<HomeLayout />
        }]
    }
  ])

  return <RouterProvider router={router} />;
}

export default AppRouter
