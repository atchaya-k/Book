import React, { useEffect, useState } from 'react'
import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core'
import { Link, useHistory,useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Navbar=()=> {
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')))
    console.log(user)
    const history=useHistory()
    const dispatch = useDispatch()
    const location=useLocation()
    const logout=()=>{
         dispatch({
             type : 'LOGOUT'
         })
         history.push('/')
         setUser(null)
    }
    useEffect(()=>{
      const token=user?.token
      setUser(JSON.parse(localStorage.getItem('profile')))     
    },[location])
    return (
        <AppBar position='static' color='inherit'>
        <Typography variant='h2' align='center'>
           Memories
        </Typography>
        <Toolbar>
            {user ? (
            <div><Avatar alt={user.result.name}>{user.result.name[0]}</Avatar>
            <Typography>{user.result.name}</Typography>
            <Button onClick={logout}>Logout</Button>
            </div>) 
            : (<Button component={Link} to='/auth'>Sign in</Button>)}
        </Toolbar>
        </AppBar>
    )
}

export default Navbar
