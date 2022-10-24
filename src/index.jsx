import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import './global.css'

import RootLayout, { loader as rootLayoutLoader } from "./routes/rootLayout";
import ErrorPage from "./error";
import Contact from "./routes/contact";
import Support from "./routes/support";
import Mainnet, { loader as mainnetLoader } from "./routes/mainnet";
import Testnet, { loader as testnetLoader } from "./routes/testnet";
import Local from "./routes/local";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Navigate to="/mainnet" replace={true} />,
      },
      {
        path: 'contacts/:contactId',
        element: <Contact />,
      },
      {
        path: 'mainnet',
        loader: mainnetLoader,
        element: <Mainnet />,
      },
      {
        path: 'testnet',
        loader: testnetLoader,
        element: <Testnet />,
      },
      {
        path: 'local',
        loader: async () => {
          return localStorage.getItem('rpc')
        },
        element: <Local />,
      },
      {
        path: 'support',
        element: <Support />,
      },
    ],
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)