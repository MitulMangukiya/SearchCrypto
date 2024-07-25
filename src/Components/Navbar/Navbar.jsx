import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow from '../../assets/arrow_icon.png'
import {Coincontext} from '../../context/Coincontext'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const {setcurrency} = useContext(Coincontext)

  const currencyHandler = (e) => {
    switch(e.target.value){
      case 'usd':{
        setcurrency({name: 'usd', symbol: '$'} )
        break
      }
      case 'eur':{
        setcurrency({name: 'eur', symbol: '€'} )
        break
      }
      case 'inr':{
        setcurrency({name: 'inr', symbol: '₹'} )
        break
      }
      default:{
        setcurrency({name: 'usd', symbol: '$'} )
        break
      }
    }
  }

  return (
    <div className='navbar'>
        <Link to='/'><img src={logo} alt='image'></img></Link>
        <ul className='nav-ul'>
        <Link style={{color:'white', textDecoration:'none'}} to='/'><li>Home</li></Link>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className="nav-right">
            <select onChange={currencyHandler}> 
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='inr'>INR</option>
            </select>
            {/* <button>Sign up <img src={arrow}></img></button> */}
        </div>
    </div>
  )
}

export default Navbar
