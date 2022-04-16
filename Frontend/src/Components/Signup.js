import React from 'react'
import { Link ,useHistory} from 'react-router-dom'
import './Signup.css'
function Signup() {
  const history = useHistory();
  const[name,setName] = React.useState('');
  const[email,setEmail] = React.useState('');
  const[password,setPassword] = React.useState('');
  const[error,setError] = React.useState('');

  const Postdata = ()=>{
    fetch('/api/users/signup',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name,
        email,
        password
      }),
    }).then(res=>res.json()).then(result=>{
      if(result.error){
        setError(result.error);
      }
      else{
        history.push('/login')
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <>
    <p style={{color:"red",marginLeft:"500px"}}>{error}</p>
    <div id="wrapper">
    <div className="main-content">
      <div className="header">
        <img src="http://shimmeringsoul.weebly.com/uploads/1/3/0/3/13031044/1-xkmi4fb5vws6-my7b22lza_1.png" alt = "img1" />
      </div>
      <div className="l-part">
        <input type="text" placeholder="Username" className="input-1" value={name} onChange={(e)=>setName(e.target.value)}/>
        <div className="overlap-text">
          <input type="email" placeholder="Email" className="input-2" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="overlap-text">
          <input type="password" placeholder="Password" className="input-2" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <input type="button" value="SignUp" className="btn" onClick={()=>Postdata()}/>
      </div>
    </div>
    <div className="sub-content">
      <div className="s-part">
        Already have an account?<Link to="/login">Login</Link>
      </div>
    </div>
  </div>
  </>
  )
}

export default Signup