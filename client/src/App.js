import React from 'react'
import {BrowserRouter,Switch,Route, Link} from 'react-router-dom'
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core'
import ChatBot from './components/chatbot'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'


const App=() =>{
 
    return (
        // <>
        // <ChatBot/>
        // </>
        <BrowserRouter>
         <Container maxWidth='lg'>
             <Navbar/>
             <Switch>
                 <Route path='/' exact component={Home}/>
                 <Route path ='/auth' exact component={Auth}/>
             </Switch>
         </Container>
         </BrowserRouter>
    )
}

export default App
