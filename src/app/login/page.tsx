"use client";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled,setButtonDisabled] = useState(false);
  const [loading,setLoading]=useState(false);
  
  const onLogin = async()=>{
    try {
        setLoading(true);
        const response = await axios.post("/api/users/login",user)
        console.log("Login successful",response.data)
        toast.success("Login success")
        router.push("/profile")
        
    } catch (error:any) {
        console.log("Login failed",error.message)
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
  },[user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-2xl m-5">{loading?"Processing":"Login"}</h1>
      <hr />
      
      <label htmlFor="email">email</label>
      <input
        className=" text-black"
        id="email"
        type="text"
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        className=" text-black"
        id="password"
        type="password"
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className=" p-2 border border-gray-300 ronded-lg m-4 " onClick={onLogin}>Login</button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  );
}
