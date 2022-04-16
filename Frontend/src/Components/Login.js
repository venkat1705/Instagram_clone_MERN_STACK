import React,{useContext} from 'react'
import {UserContext} from '../App'
import { Link ,useHistory} from 'react-router-dom'
import './Login.css'
function Login() {
  const {state,dispatch} = useContext(UserContext);
  const history = useHistory();
  const[email,setEmail] = React.useState('');
  const[password,setPassword] = React.useState('');
  const[error,setError] = React.useState('');

  const Postdata = ()=>{
    fetch('/api/users/login',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email,
        password
      }),
    }).then(res=>res.json()).then(result=>{
      console.log(result);
      if(result.error){
        setError(result.error);
      }
      else{
        localStorage.setItem("jwt",result.token);
        localStorage.setItem("user",JSON.stringify(result.user));
        dispatch({type:"USER",payload:result.user})
        history.push('/')
      }
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <>
    <p style={{color:"red",marginLeft:"500px"}}>{error}</p>
    <div id="wrapper">
    <div class="main-content">
      <div class="header">
        <img src="http://shimmeringsoul.weebly.com/uploads/1/3/0/3/13031044/1-xkmi4fb5vws6-my7b22lza_1.png" alt = "img1" />
      </div>
      <div class="l-part">
        <input type="email" placeholder="Username" class="input-1" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <div class="overlap-text">
          <input type="password" placeholder="Password" class="input-2" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <input type="button" value="Log in" class="btn" onClick={()=>Postdata()}/>
      </div>
    </div>
    <div class="sub-content">
      <div class="s-part">
        Don't have an account?<Link to="/signup">Sign up</Link>
      </div>
    </div>
  </div>
  </>
  )
}

export default Login