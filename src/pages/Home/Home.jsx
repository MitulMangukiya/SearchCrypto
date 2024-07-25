import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Coincontext } from '../../context/Coincontext'
import { Link } from 'react-router-dom'

const Home = () => {

    const {allcoin, currency} = useContext(Coincontext) 
    const [displaycoin, setdisplaycoin] = useState([])
    const [input, setinput] = useState('')    

    const inputhandler = (e) => {
      setinput(e.target.value)
      if(e.target.value === ''){
        setdisplaycoin(allcoin)
      }
    }

    const searchhandler = (e) => {
      e.preventDefault()
      const coin = allcoin.filter((item)=>{
        return item.name.toLowerCase().includes(input.toLowerCase())
      })
      setdisplaycoin(coin)
    }

    useEffect(()=>{
        setdisplaycoin(allcoin)
    },[allcoin]) 

  return (
    <div className='homepage'>
      <div className="home-head">
        <h1>Largest<br/> Crypto MarketPlace</h1>
        <h3>Welcome to the World's largest Crypto MarketPlace. Here, You can get information about any crypto currency.</h3>
        <form className='home-form' onSubmit={searchhandler}>
            <input onChange={inputhandler} list='coinlist' value={input} type='text' placeholder='Search Crypto Here...' required></input>

            <datalist id='coinlist'>
                {allcoin.map((item)=>(<option value={item.name}/>))}
            </datalist>

            <button type='submit'>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
            <p>Rank</p>
            <p className='crypto-img'>Image</p>
            <p>Coin Name</p>
            <p>Price</p>
            <p>24H Change(%)</p>
            <p className='market-cap'>Market Cap</p>
        </div>
        {
            displaycoin.slice(0,15).map((item, index)=>(
                <Link style={{color:'white', textDecoration:'none'}} to={`/coin/${item.id}`} className="table-layout" key={index}>
                    <p>{item.market_cap_rank}</p>
                    <img src={item.image} width='40px'></img>
                    <p>{item.id} - {item.symbol}</p>
                    <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                    <p className={item.price_change_percentage_24h>0 ? 'green' : 'red'}>
                        {Math.floor(item.price_change_percentage_24h*100)/100}
                    </p>
                    <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                </Link>
            ))
        }
      </div>
    </div>
  )
}

export default Home
