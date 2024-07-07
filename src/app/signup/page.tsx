"use client"


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

 function page() {
const router=  useRouter()
const [data,setData]=useState({
  username:"",
  email:"",
  password:""
})

const [buttonEnable,setbuttonEnable]=useState(false)
const [loading,setloading]=useState(false)

const onSignup=async()=>{
try {
  setloading(true)

const response= await axios.post("api/user/signup",data)
console.log("Signup Success",response.data);
router.push("/login")

} catch (error:any) {
console.log("the handle change function give some error");
}

}
useEffect(()=>{
  if(data.email.length>0 && data.password.length>0 && data.username.length>0){
    setbuttonEnable(true)

  }else{
    setbuttonEnable(false)
  }

},[data])

  return (
    <div className='space-y-6 text-3xl flex-row text-center'>
      {loading?   <div className="text-white bg-green-600">
  <h3 className='animate-pulse'>Signup In Process....</h3>
  <p>Red often indicates a dangerous or Sigup Sucessfull</p>
</div>:""}
      <p>{loading?"process":"signup"}</p>
   
      <div className='space-x-5'>
        <span>username</span>
        <input className='text-black' value={data.username} onChange={(e)=>setData({...data,username:e.target.value})} type="text" placeholder='enter username' />
      </div>

      <div className='space-x-5'>
        <span>email.........</span>
        <input className='text-black' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} type="text" placeholder='enter email' />
      </div>

      <div className='space-x-5'>
        <span>password</span>
        <input className='text-black' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} type="text" placeholder='enter password' />
      </div>

      <button className='bg-green-600 p-2 rounded-xl' onClick={onSignup} >
        {buttonEnable?"signup":"not signup"}
      </button>
      <div className='text-lg'>
        <span>If you are Register ?</span>
        <span onClick={()=>router.push("/login")} className='cursor-pointer'>Click On Login</span>
       </div>
      
    </div>
  )
}

export default page
