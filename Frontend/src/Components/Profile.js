import React,{useEffect,useContext,useState} from 'react'
import {UserContext} from '../App'
import './Profile.css'

function Profile() {
  const {state,dispatch} = useContext(UserContext)
  const[pics,setPics] = React.useState([]);
  const[myuser,setUser] = React.useState('');
  const [followers,setFollowers] = useState([])
  const [following,setFollowing]  = useState([])
    useEffect(()=>{
      fetch('/api/posts/myposts',{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
      }).then(res=>res.json()).then(result=>{
        console.log(result)
        setPics(result.myposts);
        setUser(result.user);
        setFollowers(result.user.followers);
        setFollowing(result.user.following);
      }).catch(error=>{
        console.log(error)
      })
    },[])
  return (
    <div className="profile" style={{maxWidth:"600px",margin:"0px auto"}}>
        <div style={{display:"flex",justifyContent: 'space-around',margin:"18px 0px", borderBottom:"1px solid grey"}}>
          <div>
            <img style={{width:"160px",height:"160px",borderRadius:"80px"}} src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=1000&q=60"></img>
          </div>
          <div style={{marginTop:"40px"}}>
            <h3>{state?state.name:"loading..."}</h3>
            <div style={{display: 'flex',justifyContent: 'space-between',width: '108%',color:"grey"}}>
              <h5>{followers.length} followers</h5>
              <h5>{following.length} following</h5>
              <h5>{pics.length} posts</h5>
            </div>
          </div>
        </div>
        <div className="gallery" >
          {
            pics.map(item=>{
              return(
                <img key = {item._id} className="item" src={item.pic} alt="img1"></img>
              )
            })
          }
            
            
        </div>
    </div>
  )
}

export default Profile