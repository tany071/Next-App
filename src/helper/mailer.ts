import nodemailer from 'nodemailer'
import User from '@/model/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email,emailType,userId}:any)=>{
    try {
        //create a hashed token 
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
         
        await User.findByIdAndUpdate(
            userId,
            {
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            }
        )

        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken:hashedToken,
                    verifyTokenExpiry:Date.now()+3600000
                }
            )
        } else if(emailType==="RESET"){
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken:hashedToken,
                    forgotPasswordTokenExpiry:Date.now()+3600000
                }
            )
        }

        //create transporter 
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "8a198e6e6d7ce3",
              pass: "35a251db805efb"
            }
        })

        const mailOptions = {
            from: 'tanyasinha7u@gmail.com',
            to: email,
            subject: emailType 
        }
         
        
    } catch (error:any) {
        throw new Error(error.message);
    }
}