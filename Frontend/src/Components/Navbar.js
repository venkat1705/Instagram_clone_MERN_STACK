import React,{useContext} from 'react'
import { Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import './Navbar.css'

function Navbar() {
    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();
    const renderList = ()=>{
        if(state){
            return [
                <>
                <div className="navbar__center">
        <i class="fa-solid fa-magnifying-glass"></i>
            <input className = "navbar__input" placeholder="Search"></input>
        </div>
                <div className="navbar__option">
                <Link className = "navbar__link" to="/"><i class="fa-solid fa-house fa-lg"></i></Link>
            </div>
            <div className="navbar__option">
                <Link className = "navbar__link" to="/createpost"><i class="fa-solid fa-file-circle-plus fa-lg"></i></Link>
            </div>
            <div className="navbar__option">
                <Link className = "navbar__link" to="/reels"><i class="fa-solid fa-compass fa-lg"></i></Link>
            </div>
            <div className="navbar__option">
                <Link className = "navbar__link" to="/favourite"><i class="fa-solid fa-heart fa-lg"></i></Link>
            </div>
            <div className="navbar__option">
                <Link className = "navbar__link" to="/profile"><i class="fa-solid fa-circle-user fa-lg"></i></Link>
            </div>
            <div className="navbar__option">
                <Link to="" className = "navbar__link" onClick={()=>{
                    localStorage.clear();
                    dispatch({type: 'CLEAR'})
                    history.push('/login')
                }}>Logout</Link>
            </div>
            </>
            ]
        }
        else{
            return [
            <>
            <div className="navbar__option">
                <Link className = "navbar__link" to="/login">Login</Link>
            </div>
            
            </>
            ]
        }
    }
  return (

    <div className="navbar">
        <div className="navbar__left">
        <i class="fa-brands fa-instagram fa-2xl"></i>
            <Link to="/" className="navbar__logo">Instagram</Link>
        </div>
        
        <div className="navbar__right">
            {renderList()}
            
        </div>
    </div>

  )
}

export default Navbar