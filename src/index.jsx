import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';
import './index.css';

import RootLayout, { loader as rootLayoutLoader } from "./routes/rootLayout";
import ErrorPage from "./error-page";
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
    loader: rootLayoutLoader,
    children: [
      {
        path: "contacts/:contactId",
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
        element: <Local />,
      },
      {
        path: 'support',
        element: <Support />,
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)