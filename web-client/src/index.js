import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Contact from "./Contact";
import About from "./About";
import Promotion from "./Promotion";
import Jewelry from "./Jewelry";


import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },

    {
      path: "Promotion",
      element: <Promotion/>,
    },

    {
      path: "Jewelry",
      element: <Jewelry/>,
    },

    {
        path: "Contact",
        element: <Contact/>,
      },

      {
        path: "About",
        element: <About/>,
      },


  ]);

const root = ReactDOM.createRoot(document.getElementById
    ('root'))
    root.render(<RouterProvider router={router}/>)