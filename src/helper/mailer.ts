import nodemailer from "nodemailer"
import User from "@/model/user.model"
import bcrypt from "bcryptjs"

export async function sendEmail({email,emailType,userId}:any){

   try {
   const hashedToken=await bcrypt.hash(userId.toString(),10)
   if(emailType=="VERIFY"){
    await User.findByIdAndUpdate(userId,{
      $set: {
            VerifyToken:hashedToken,
            VerifyTokenExpiry:Date.now()+3600000
        }
      }
    )
   }
   else if(emailType==="RESET"){
    await User.findByIdAndUpdate(userId,
     {$set:
        {
            forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry:Date.now()+3600000
        }
      }
      )
   } 

    

   let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5bb0692ba55668",
      pass: "a2d95b2752fcce"
    }
  });

      const mailOption={
        from: 'shubham.0202.in@gmail.com', // sender address
        to: email, // list of receivers
        subject: emailType=="VERIFY" ? "Verify your email":"Reset your password", // Subject line
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to
        ${emailType==="VERIFY"?"VERIFY YOUR EMAIL":"RESET YOUR PASSWORD"}
        or copy and paste the link below in your browser 
        <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>` // html body
      }
      
      const mailResponse=await transporter.sendMail(mailOption)
      return mailResponse
   } catch (error:any) {

     throw new Error(error.message)
    
   }
  

}