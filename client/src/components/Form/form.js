import React,{useEffect, useState} from 'react'
import {TextField,Button,Typography,Paper} from '@material-ui/core'
import { useDispatch,useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'

const Form=({currentId,setCurrentId})=> {
    const [postData,setPostData]=useState({
        creator : '',
        title  : '',
        tags : ''
    })
    const post=useSelector((state)=>currentId ? state.posts.find((p)=>p._id === currentId)  :null)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(post){
            setPostData(post)
        }
    },[post])
    const handleSubmit=(e)=>{
          e.preventDefault()
          if(currentId){
         dispatch(updatePost(currentId,postData))  
        }
          else{dispatch(createPost(postData))}
          clear()
    }
   
    const clear=()=>{
        setCurrentId(null)
        setPostData({ creator : '',
        title  : '',
        tags : ''})
    }
    return (
    //  <div>hi</div>
        //to only change that field ...postData
       <Paper>
           <form
           autoComplete='off'
           noValidate
            onSubmit={handleSubmit}
            >
                <TextField name='creator' label='creator'
                value={postData.creator}
                onChange={(e)=>setPostData({
                    ...postData,
                    creator : e.target.value
                })}/>
                <TextField name='title' label='title'
                value={postData.title}
                onChange={(e)=>setPostData({
                    ...postData,
                    title : e.target.value
                })}/>
                <TextField name='tags' label='tags'
                value={postData.tags}
                onChange={(e)=>setPostData({
                    ...postData,
                    tags : e.target.value.split(',')
                })}/>
                <Button color='primary' variant='container' type='submit'>
                    {currentId ? 'update' : 'Submit'}</Button>
                <Button color='secondary' onClick={clear}>clear</Button>
           </form>
       </Paper>
    )
}

export default Form
