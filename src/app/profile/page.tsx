"use client"
import { useRouter } from "next/navigation";
import axios from 'axios'
import React, { useState } from 'react'


function page() {
    const router=useRouter()
    const [username, setusername] = useState("")
    const [email, setEmail] = useState("")
    const [click, setClick] = useState(false);
    const [loading, setloading] = useState(false)
    const [id, setId] = useState("")
    // const [token, setToken] = useState("$2a$10$yCYR.XL50thzK2x1CL2edOEOhGbQ82a9aZejv2RIQrOFGrPc0m5Ea")
   
    const handeClick=()=>{
        setClick(true)
        userDetail()
    }

    const userDetail = async () => {
        const user = await axios.post("api/user/me")
        setusername(user.data.data.username)
        setEmail(user.data.data.email)
        setId(user.data.data._id)
        setTimeout(() => {
            setloading(true)
        }, 2000)
    }
    

    const handleLogout=async()=>{
        try {
            const user = await axios.get("api/user/logout");
            if (user) {
              router.push("/login")
            }
          } catch (error) {
            console.error("Error logging out:", error);
          }
    }

    return (
        <div className='text-3xl text-center flex flex-col justify-around space-y-10 items-center'>
            <h1>Welcome to the User Page</h1>
          
            {(() => {
        if (!click) {
          return <button onClick={handeClick} className="bg-blue-500 p-2 text-lg rounded-lg">Get the User Detail</button>;
        } else if (click && !loading) {
          return (
            <h1>Loading.........</h1>
          );
        } else if (click && loading) {
          return (
            <div className='text-2xl'>
              <h1>User ID is: {id}</h1>
              <h1>Username is: {username}</h1>
              <h1>Email is: {email}</h1>
            </div>
          );
        } else {
          return null;
        }
      })()}

            <button className="bg-red-500 text-lg rounded-lg p-2" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default page
