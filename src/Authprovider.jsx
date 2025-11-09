import React, { useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import { auth } from './firebase.init';
import { createUserWithEmailAndPassword } from 'firebase/auth/cordova';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';


const Authprovider = ({children}) => {

    const [user,setuser]=useState(null)

    const provider=new GoogleAuthProvider();

    const createuser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }


    const logout=()=>{
        return signOut(auth)
    }


    const singinwithgoogle=()=>{
        return signInWithPopup(auth,provider)
    }

    useEffect(()=>{
        const unsuscribe=onAuthStateChanged(auth,currentuser=>{
            setuser(currentuser)
        })

        return ()=>{
            unsuscribe()
        }
    },[])


    // console.log(user)


    const authinfo={
        createuser,
        user,
        logout,
        singinwithgoogle
    }
    return (
        <Authcontext value={authinfo}>
            {
                children
            }
        </Authcontext>
    );
};

export default Authprovider;