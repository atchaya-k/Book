import mongoose from "mongoose";
import postMessage from "../models/postMessage.js"

export const getPosts=async (req,res)=>{
    try {
        const postmessage= await postMessage.find();
        console.log(postmessage)
        res.status(200).json(postmessage)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}
export const createPost=async (req,res)=>{
    const post=req.body;
    const newPost =new postMessage(post)
    try {
      await  newPost.save()
      res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
    
}

export const updatePost=async(req,res)=>{
    const {id : _id}=req.params
    const post=req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('no post with that id')
    }
    const updatedPost=await postMessage.findByIdAndUpdate(_id,post,{new : true})
    res.json(updatedPost)
}

export const deletePost=async(req,res)=>{
    const {id : _id}=req.params
  
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('no post with that id')
    }
    await postMessage.findByIdAndDelete(_id)
    res.json({message :'post deleted'})
}

export const likePost=async(req,res)=>{
    const {id}=req.params
 if(!req.userId){
     return res.json({message : 'no auth'})
 }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('no post with that id')
    }
    const post=await postMessage.findById(id)
    const index=post.likes.findIndex((id)=>id === String(req.userId))
    //only if not in there then it is equa to -1
    if(index === -1){
      //like--push his id
      post.likes.push(req.userId)
    }
    else{
      //dislike---remove the id---gives other post except that id
      post.likes=post.likes.filter((id)=>id !== String(req.userId))
    }
    const updatedPost= await postMessage.findByIdAndUpdate(id,post,{new : true})
    res.json(updatedPost)
}