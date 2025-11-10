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
        Component:Addreview
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
        Component:Editreview
      },
      {
        path:'/myreview',
        Component:Myreview
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
