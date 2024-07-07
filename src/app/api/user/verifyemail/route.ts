import { NextRequest,NextResponse } from "next/server";
import {connect} from '@/db/dbconfig'
import User from '@/model/user.model'
import { error } from "console";
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helper/mailer";


connect()


export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json()
        const {token}=reqBody
        console.log(token);

      const user=await  User.findOne({VerifyToken:token,
         VerifyTokenExpiry: {$gt:Date.now()},

        })

     if(!user){
        return NextResponse.json({error:"Invalid token"},{status:400})
     }   

     console.log(user);
     user.isVerified=true
     user.VerifyToken=undefined
     user.VerifyTokenExpiry=undefined

     await user.save()
     
  return   NextResponse.json({message:"email verification sucessfully"},{status:200}) 

        
    } catch (error:any) {
       NextResponse.json({error:error.message},{status:404}) 
    }

    
}