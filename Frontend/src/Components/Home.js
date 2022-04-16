import React,{useEffect,useContext} from 'react'
import { Link } from 'react-router-dom';
import {UserContext} from '../App'

import './Home.css'
function Home() {
  const {state,dispatch} = useContext(UserContext)
  const[data,setData] = React.useState([]);
  useEffect(()=>{
    fetch('/api/posts/allposts',{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(res=>res.json()).then(result=>{
      setData(result.posts);
    })
  },[])

  const likePost = (id)=>{
      fetch('/api/posts/like',{
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        body:JSON.stringify({
          postId:id
        })
        }).then(res=>res.json()).then(result=>{
          const newData = data.map(item=>{
            if(item._id === result._id) {
              return result
            }
            else{
              return item;
            }
          })
          setData(newData)
      })
  }
  const unlikePost = (id)=>{
      fetch('/api/posts/unlike',{
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        body:JSON.stringify({
          postId:id
        })
        }).then(res=>res.json()).then(result=>{
          const newData = data.map(item=>{
            if(item._id === result._id){
              return result;
            }
            else{
              return item;
            }
          })
          setData(newData);
      })
  }

  const Comment = (text,postId)=>{
    fetch('/api/posts/comment',{
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res=>res.json()).then(result=>{
      console.log(result);
      const newData = data.map(item=>{
        if(item._id === result._id){
          return result;
        }
        else{
          return item;
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err);
      
    })
    
  }
  const deletePost = (postid)=>{
      fetch(`/api/posts/delete/${postid}`,{
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
      }).then(res=>res.json()).then(result=>{
        const newData = data.filter(item=>{
          return item._id !==result._id;
        })
        setData(newData);
      })
  }
  return (
    <div>
      {
        data.map(item=>{
          return (
            <div className="post"  key = {item._id}>
            <div className="post__top">
            <img src="https://images.unsplash.com/photo-1528271537-64e11fc31bba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=1000&q=60" alt=""></img>
              <div className="post__info">
                
                <h3 style={{textdecoration: "none"}}><Link to={item.postedBy._id != state._id ?"/profile/"+item.postedBy._id:"/profile" }>{item.postedBy.name}</Link> {item.postedBy._id == state._id 
                ?
                <i className="fa-solid fa-trash" style={{marginLeft:"600px" ,cursor:"pointer",color:"red"}} onClick={()=>{deletePost(item._id)}}></i>
                :""
              }
                 
                </h3>
                
                <p>{new Date(item.createdAt).toLocaleString("en-US",{timeZone:'Asia/Kolkata'})}</p>
            </div>
            </div>
            <div className="post__image">
                
                <img  src={item.pic} alt={item.title}/>
                <p><strong>{item.postedBy.name}</strong> {item.body}</p>
                
            </div>
            <div className="post__options">
              {
                item.likes.includes(state._id)
                ?
                <div className="post__option">
                <i class="fa-solid fa-heart fa-lg" onClick={()=>{unlikePost(item._id)}} style={{color:"red"}}></i>
                <p>{item.likes.length}</p>
                </div>
                :
                <div className="post__option">
                <i class="fa-solid fa-heart fa-lg" onClick={()=>{likePost(item._id)}}></i>
                <p>{item.likes.length}</p>
                </div>
              }
                
                <div className="post__option">
                <i class="fa-solid fa-comment fa-lg" ></i>
                </div>
                <div className="post__option">
                <i class="fa-brands fa-telegram fa-lg"></i>
                </div>
            </div>
            <div className="post__comment">
            <p><span style={{color:"grey",marginLeft:"10px"}} >Comments</span></p>
            {
              item.comments.map(record =>{
                return (
                  <h6><span style={{fontWeight:"500" ,marginLeft:"10px"}}>{record.postedBy.name}</span>:{record.text}</h6>
                )
              })
            }
              <form onSubmit={(e)=>{
                e.preventDefault();
                Comment(e.target[0].value,item._id);
              }}>
              <input type="text" placeholder="Add Comment"></input>
              </form>
              
            </div>
            </div>
          )
        })
      }
      
    </div>
  )

}

export default Home