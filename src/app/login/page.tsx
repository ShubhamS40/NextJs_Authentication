"use client"


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

 function page() {
const router=  useRouter()
const [data,setData]=useState({
  email:"",
  password:""
})

const [buttonEnable,setbuttonEnable]=useState(false)
const [loading,setloading]=useState(false)

const onLogin=async()=>{
try {
  setloading(true)

const response= await axios.post("api/user/login",data)
console.log("Signup Success",response.data);
router.push("/profile")

} catch (error:any) {
console.log("the onlogin  function give some error");
}

}
useEffect(()=>{
  if(data.email.length>0 && data.password.length>0 ){
    setbuttonEnable(true)

  }else{
    setbuttonEnable(false)
  }

},[data])

  return (
    <div className='space-y-6 text-3xl text-center m-32'>
      {loading?   <div className="text-white bg-blue-400">
  <h3 className='animate-pulse'>Login In Process....</h3>
  <p>Red often indicates a dangerous or Login Sucessfull</p>
</div>: 
       <div className="text-white bg-red-600">
  <h3 className='animate-pulse'>All Field is Mandatory to Fill</h3>
  <p>Red often indicates a dangerous or Fill Complete Form</p>
</div>}
      <p>{loading?"process":"Login"}</p>
  
      <div className='space-x-5'>
        <span>email........</span>
        <input className='text-black' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} type="text" placeholder='enter email' />
      </div>

      <div className='space-x-5'>
        <span>password</span>
        <input className='text-black' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} type="text" placeholder='enter password' />
      </div>

      
        {
        buttonEnable?<button className=' bg-blue-600 p-2 rounded-xl' onClick={onLogin} > Login </button>:  <button className='bg-red-500 p-2 rounded-lg text-lg' >No Login</button>
        }
       <div className='text-lg'>
        <span>Not Register ?</span>
        <span onClick={()=>router.push("/")} className='cursor-pointer'>Click On Signup</span>
       </div>
      
    </div>
  )
}

export default page
