import React,{useEffect} from 'react'
import {useHistory} from 'react-router-dom'
function Createpost() {
  const history = useHistory();
  const[title,setTitle] = React.useState('');
  const[body,setBody] = React.useState('');
  const[image,setImage] = React.useState('');
  const[url,setUrl] = React.useState('');

  useEffect(()=>{
    if(url){
    fetch('/api/posts/createPost',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        title,
        body,
        pic:url
      }),
    }).then(res=>res.json()).then(result=>{
      console.log(result);
      if(result.error){
      }
      else{
        history.push('/')
      }
    }).catch(err=>{
      console.log(err);
    })
  }
  },[url])

  const Postdata = ()=>{
    const data = new FormData();
    data.append("file",image);
    data.append("upload_preset","insta-clone");
    data.append("cloud_name","bunny1705");
    fetch("https://api.cloudinary.com/v1_1/bunny1705/image/upload",{
      method: "POST",
      body: data
    }).then(res=>res.json()).then(data=>{
      setUrl(data.url);
    }).catch(err=>{
      console.log(err);
    })
    
  }
  return (
    <>
    <div id="wrapper">
    <div className="main-content">
      <div className="header">
        <img src="http://shimmeringsoul.weebly.com/uploads/1/3/0/3/13031044/1-xkmi4fb5vws6-my7b22lza_1.png" alt = "img1" />
      </div>
      <div className="l-part">
        <input type="text" placeholder="Title" className="input-1" value = {title} onChange={(e)=>setTitle(e.target.value)}/>
        <div className="overlap-text">
          <input type="text" placeholder="Body" className="input-2" value={body} onChange={(e)=>setBody(e.target.value)}/>
        </div>
        <div className="overlap-text">
          <input type="file" placeholder="Image" className="input-2" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <input type="button" value="CreatePost" className="btn" onClick={()=>Postdata()}/>
      </div>
    </div>
  </div>
  </>
  )
}

export default Createpost