import { NextRequest,NextResponse } from "next/server";
import {connect} from '@/db/dbconfig'
import jwt from "jsonwebtoken"
import User from '@/model/user.model'
import { error } from "console";
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helper/mailer";
import { cookies } from "next/headers";
import { GetDataFromToken } from "@/helper/datafromtoken";


connect()

export async function POST(request:NextRequest) {
  const id=await  GetDataFromToken(request)
  const user=await User.findOne({_id:id}).select("-password")
  if(!user){
   return NextResponse.json({message:"User Profile data Not found"})
  }

  return NextResponse.json({message:"User  Found Successfully",data:user})
}