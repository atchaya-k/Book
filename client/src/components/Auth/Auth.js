import React, { useState } from 'react'
import {Avatar,Button,Paper,Grid,Typography,Container, TextField} from '@material-ui/core'
import {GoogleLogin} from 'react-google-login'
import  {useDispatch} from 'react-redux'
import Input from './Input'
import { useHistory } from 'react-router-dom'
import {signin,signup} from '../../actions/auth'

const initialState={firstName : '',email : '',password : '',confirmPassword : ''}

const Auth=()=> {
    const [isSignup,setIsSignup]=useState(false)
    const [formData,setFormData]=useState(initialState)
    const history=useHistory()
    const dispatch = useDispatch()
    const handleSubmit=(e)=>{
        e.preventDefault()
        // console.log(formData)
        if(isSignup){
        dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }
    }
    const handleChange=(e)=>{
       setFormData({...formData,
    [e.target.name]: e.target.value
    })
    }
    const switchMode=()=>{
       setIsSignup ((prev)=>!prev)
    }
     const googleSuccess=async(res)=>{
         //direct use of . gives error so use ?.
        const result=res?.profileObj
        const token=res?.tokenId
        try {
            dispatch({
                type : 'AUTH',
                data : {
                    result,
                    token
                }
            })
            history.push('/')
        } catch (error) {
          console.log(error)  
        }
    }
    const googleFailure=()=>{
        console.log('google fail')
    }
    //609214847635-cc7737sjnth2luhb33r4f80ghmj4ogu4.apps.googleusercontent.com
    //PZLoxXK1u9ceOqgWzOCNVpHZ
    return (
        <Container>
            <Paper>
                <Avatar>

                </Avatar>
                <Typography>
               {isSignup ? 'Sign up': 'Sign IN'}
                </Typography>
                <form onSubmit={handleSubmit}>
                 <Grid container>
                   {
                       isSignup && (
                           <><Input name='firstName' 
                           label='First name' autoFocus
                           handleChange={handleChange} half/>
                           </>
                       )
                   }
                   <Input name="email" label="mail"  handleChange={handleChange} type='email'/>
                   <Input name="password" label="password" handleChange={handleChange} type='password'/>
                     {isSignup && 
                     <Input name="confirmPassword" label="repeatPassword" handleChange={handleChange} type='password'/>
                     }
                       </Grid>
                       <Button type='submit' color='primary'>
                         {isSignup ? 'Sign Up' : 'Sign in'}
                     </Button>
                       <GoogleLogin
                       clientId='609214847635-cc7737sjnth2luhb33r4f80ghmj4ogu4.apps.googleusercontent.com'
                       render={(renderProps)=>(
                           <Button color='primary'
                            onClick={renderProps.onClick}
                           disabled={renderProps.disabled}>
                               Google sign in
                           </Button>
                       )}
                       onSuccess={googleSuccess}
                       onFailure={googleFailure}
                       cookiePolicy="single_host_origin"
                       />
                 <Grid container>
                  <Grid>
                    <Button onClick={switchMode}>
                        {isSignup  ? 'Already have an account?Sign in' :  'Sign up'}
                    </Button>
                  </Grid>
                 </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
