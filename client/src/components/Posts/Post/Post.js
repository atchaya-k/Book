import React from 'react'
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from  '@material-ui/core'
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAltIcon'
// import DeleteIcon from '@material-ui/icons/Delete'
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz' 
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost,likePost } from '../../../actions/posts'

const Post=({post,setCurrentId}) =>{
    const dispatch = useDispatch()
    return (
         <Card>
             <div>
                 <Typography variant='h6'>
                  {post.creator}
                 </Typography>
                 <Typography variant ='body2'>
                     {post.title}
                 </Typography>
             </div>
             <div>
                 <Button 
                 onClick={()=>{setCurrentId(post._id)}}>
                   More
                 </Button>
             </div>
             <CardContent>
             <Typography variant ='body2'>
                     {post.tags.map((tag)=>`#${tag}`)}
                 </Typography>
             </CardContent>
             <CardActions>
                 <Button onClick={()=>{dispatch(likePost(post._id))}}>
                 
                   Like
                   {post.likeCount}
                 </Button>
                 <Button onClick={()=>{dispatch(deletePost(post._id))}}>
                    Delete
                 </Button>
             </CardActions>
         </Card>
    )
}

export default Post
