import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Musers from '../models/user.js'

export const signin=async(req,res)=>{
   const {email,password}=req.body
   try {
       const existingUser=await Musers.findOne({email})
       if(!existingUser){
           return res.status(404).json({message : "doesn't exist"})
       }
       //if user alread there check password
       const isPasswordmatch=await bcrypt.compare(password,existingUser.password)
       if(!isPasswordmatch){
           res.status(400).json({message : 'invalid credential'})
       }
       //if both correct get its json web token to send it to front end
       //in sign provide data to store in token
       const token=jwt.sign({email :  existingUser.email,
       id : existingUser._id},'secret',{expiresIn : "1h"})

       res.status(200).json({result : existingUser,token})
   } catch (error) {
       res.status(500).json({message : 'wrong'})
   }
}

export const signup=async(req,res)=>{
    const {email,password,firstName,confirmPassword}=req.body
    try {
        //to prevent creating account already there
        const existingUser=await Musers.findOne({email})
     
        if(existingUser){
            return res.status(400).json({message : 'user already exists'})
        }
        //check password and confirm password
        if(password !== confirmPassword){
            return res.status(400).json({message : "password doesn't match"})
        }
        //finaally create  ..before create hash pass word
        const hashPassword=await bcrypt.hash(password,12)
        
        // name : `${fname} ${lnane}`
        const result=await Musers.create({email,password : hashPassword,name : firstName})
        // console.log(result)
        //create token
        const token=jwt.sign({email :  result.email,
            id : result._id},'secret',{expiresIn : "1h"})
        // console.log(result,'gjg',token)
            res.status(200).json({
            id : result._id,
            email : result.email,
            password : result.password,
            token : token,
            name : result.name
            })
    } catch (error) {
        res.status(500).json({message : 'wrong'})
    }
}