import { NextRequest,NextResponse } from "next/server";
import {connect} from '@/db/dbconfig'
import jwt from "jsonwebtoken"
import User from '@/model/user.model'
import { error } from "console";
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helper/mailer";


connect()

export async function GetDataFromToken(request:NextRequest) {
    try {
     const token=   await request.cookies.get("token")?.value || ""
     const decodedtoken:any=await jwt.verify(token,process.env.TOKEN_SECRET!)
     return decodedtoken.id

    } catch (error:any) {
     return  NextResponse.json({error:error.message})
    }
}