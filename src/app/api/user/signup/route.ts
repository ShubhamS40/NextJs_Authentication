import { NextRequest,NextResponse } from "next/server";
import {connect} from '@/db/dbconfig'
import User from '@/model/user.model'
import { error } from "console";
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helper/mailer";


connect()
export async function POST(request:NextRequest) {
    try {
        const body= await request.json()
        const {username,email,password}=body
        console.log(body);
      const user=  await User.findOne({email})
      if(user){
       return NextResponse.json({error:"user already exists"},{status:400})
      }

      const hashpassword=await bcrypt.hash(password,10)
    const newUser=  new User({
        username,
        email,
        password:hashpassword
      })

      const savedUser= await newUser.save()
      console.log(savedUser);
      
    //   send verification mail 

   await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
 return  NextResponse.json(
    {message:"User registered sucessfully",
     sucess:true,
     savedUser   
    }
   
)


        
    } catch (error:any) {
       return NextResponse.json({error:error.message},{status:500})
    }
}