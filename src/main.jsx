import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root.jsx';
import Home from './Home.jsx';
import Allreviews from './Allreviews.jsx';
import Addreview from './Addreview.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Authprovider from './Authprovider.jsx';
import Viewdetels from './Viewdetels.jsx';
import Editreview from './Editreview.jsx';
import Myreview from './Myreview.jsx';
import Privaterouter from './Privaterouter.jsx';
import Myfavorite from './Myfavorite.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
      {
        index:true,
        Component:Home,
       
      },
      {
        path:'/allreviews',
        Component:Allreviews,
        
      },
      {
        path:'/addreview',
        element:<Privaterouter><Addreview></Addreview></Privaterouter>
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path:'/register',
        Component:Register
      },
      {
        path:'/viewdetels/:id',
        Component:Viewdetels
      },
      {
        path:"/editreview/:id",
        element:<Privaterouter><Editreview></Editreview></Privaterouter>
      },
      {
        path:'/myreview',
        element:<Privaterouter><Myreview></Myreview></Privaterouter>
      },
      {
        path:"/favorites",
        element:<Privaterouter><Myfavorite></Myfavorite></Privaterouter>
      }
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Authprovider>
      <RouterProvider router={router} />,
     </Authprovider>
  </StrictMode>,
)
