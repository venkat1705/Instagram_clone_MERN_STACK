import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../App'
import {useParams} from 'react-router-dom'
import './Profile.css'

function Profile() {
  const {state,dispatch} = useContext(UserContext)
  const[pics,setPics] = useState([]);
  const[myuser,setUser] = useState('');
  const [followers,setFollowers] = useState([])
  const [following,setFollowing]  = useState([])
  const [follow,setFollow] = useState(true)
  const{userid} = useParams();
  console.log(userid);
    useEffect(()=>{
      fetch(`/api/users/user/${userid}`,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
      }).then(res=>res.json())
      .then(result=>{
        console.log(result.user);
        setPics(result.posts);
        setUser(result.user);
        setFollowers(result.user.followers);
        setFollowing(result.user.following)
      }).catch(error=>{
        console.log(error)
      })
    },[])

    const followUser = ()=>{
      fetch('/api/users/follow',{
        method: 'put',
        headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        body: JSON.stringify({
          followId:userid
        })
      }).then(res=>res.json()).then(data=>{
        console.log(data);
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        setUser((prevState)=>{
          return {
            ...prevState,
            user:data
          }
        })
        setFollow(false)

      })
    }
    const unfollowUser = ()=>{
      fetch('/api/users/follow',{
        method: 'put',
        headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        body: JSON.stringify({
          unfollowId:userid
        })
      }).then(res=>res.json()).then(data=>{
        console.log(data);
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        setUser((prevState)=>{
          return {
            ...prevState,
            user:data
          }
        })
      })
    }
  return (
    <>
    {myuser
    ?<div className="profile" style={{maxWidth:"600px",margin:"0px auto"}}>
    <div style={{display:"flex",justifyContent: 'space-around',margin:"18px 0px", borderBottom:"1px solid grey"}}>
      <div>
        <img style={{width:"160px",height:"160px",borderRadius:"80px"}} src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=1000&q=60"></img>
      </div>
      <div style={{marginTop:"40px"}}>
        <h3>{myuser.name}</h3>
        <div style={{display: 'flex',justifyContent: 'space-between',width: '108%',color:"grey"}}>
          <h5>{followers.length} followers</h5>
          <h5>{following.length} followings</h5>
          <h5>{pics.length} posts</h5>
        </div>
        <input type="button" value="follow" className="btn" onClick={()=>followUser()}/>
        
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
    :<h2>Loading...</h2>}
    
    </>
  )
}

export default Profile