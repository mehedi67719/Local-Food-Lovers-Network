import React, { useContext } from 'react';
import { Navigate, useLocation} from 'react-router';
import { Authcontext } from './Authcontext';

const Privaterouter = ({children}) => {

    const location=useLocation();
    const {user,loading}=useContext(Authcontext);
   

    if(loading){
           return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
            </div>
        );
    }


    if(user){
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default Privaterouter;