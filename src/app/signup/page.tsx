"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "", 
    password: "",
    username: "",
  });

  const [buttonDisabled,setButtonDisabled] = useState(false);
  const [loading,setLoading]=useState(false);

  
  const onSignup = async()=>{
    try {
        setLoading(true);
        const response = await axios.post("/api/users/signup",user); 
        console.log("Signup success",response.data)
        router.push("/login")
    } catch (error:any) {
        console.log("signup failed",error.message)
        toast.error(error.message)
    }finally{
        setLoading(false);
    }


  }

  useEffect(()=>{
    if(user.email.length>0&& user.password.length>0&& user.username.length>0){
        setButtonDisabled(false);
    }else{
        setButtonDisabled(true);
    }
  },[user])




  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-2xl m-5">{loading?"Processing":"Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input className=" text-black"
        id="username"
        type="text"
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">email</label>
      <input className=" text-black"
        id="email"
        type="text"
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input className=" text-black"
        id="password"
        type="password"
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className=" p-2 border border-gray-300 ronded-lg m-4 " onClick={onSignup}>{buttonDisabled?"No Signup":"Signup"}</button>
      <Link href="/login">Visit Login page</Link>
    </div>
  );
}
