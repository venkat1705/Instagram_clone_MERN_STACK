import React ,{useEffect,createContext,useReducer,useContext}from 'react'
import Navbar from './Components/Navbar'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './Components/Home'
import Createpost from './Components/Createpost'
import Reels from './Components/Reels'
import Favourite from './Components/Favourite'
import Profile from './Components/Profile'
import Login from './Components/Login'
import Signup from './Components/Signup'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './Components/UserProfile'

export const UserContext = createContext();

const Routing = ()=>{
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type: 'USER',payload: user});
    }
    else{
      history.push('/login')
    }
  },[])
  return (
    <Switch>
     <Route exact path="/">
       <Home/>
     </Route>
     <Route  path="/createpost">
       <Createpost/>
     </Route>
     <Route  path="/reels">
       <Reels/>
     </Route>
     <Route  path="/favourite">
       <Favourite/>
     </Route>
     <Route exact path="/profile">
       <Profile/>
     </Route>
     <Route  path="/login">
       <Login/>
     </Route>
     <Route  path="/signup">
       <Signup/>
     </Route>
     <Route path="/profile/:userid">
       <UserProfile/>
     </Route>
     </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
     <Navbar/>
     <Routing/>
     </BrowserRouter>
     </UserContext.Provider>
  )
}

export default App
