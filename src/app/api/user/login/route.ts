import { NextRequest,NextResponse } from "next/server";
import {connect} from '@/db/dbconfig'
import jwt from "jsonwebtoken"
import User from '@/model/user.model'
import { error } from "console";
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helper/mailer";


connect()

export async function POST(request:NextRequest) {
   try {
    const reqBody=await request.json()
    const {email,password}=reqBody
    const user=await User.findOne({email})
    if(!user){
        return NextResponse.json({message:"User does not exists"},{status:400})
    } 
   
 const validPassword=  await bcrypt.compare(password,user.password)
 if(!validPassword){
    return NextResponse.json({message:"Invalid Creadintials"},{status:404})
 }
 
 const tokenData={
    id:user._id,
    email:user.email,
    username:user.username
 }
// jwt sign first we passed the data then second argument jwtSecret key
 const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1h'})
 const response=NextResponse.json(
    {
        message:"Successfully Login",
        success:true
    },
)

response.cookies.set("token",token,{
    httpOnly:true
})

return response
  

   } catch (error:any) {
    return NextResponse.json({error:error.message},{status:404})
   }
    
}