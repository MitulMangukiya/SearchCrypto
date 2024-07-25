import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { Coincontext } from '../../context/Coincontext'
import Linechart from '../../Components/Navbar/Chart/Linechart'

const Coin = () => {

  const {coinId} = useParams()
  const [coindata, setcoindata] = useState()
  const [historicaldata, sethistoricaldata] = useState()
  const {currency} = useContext(Coincontext)

  const fetchcoindata = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-A6ET3ntxsssdqmekESYx1L8s'}
    };
  
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
    .then(response => response.json())
    .then(response => setcoindata(response))
    .catch(err => console.error(err));
  }

  const fetchhistoricaldata = async ()=> {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-A6ET3ntxsssdqmekESYx1L8s'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=5&interval=daily`, options)
      .then(response => response.json())
      .then(response => sethistoricaldata(response))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchcoindata()
    fetchhistoricaldata()
  },[currency])


  if(coindata, historicaldata){
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coindata.image.large}></img>
          <p><b>{coindata.id} - {coindata.symbol}</b></p>
        </div>
        <div className="coin-chart">
          <Linechart historicaldata={historicaldata}/>
        </div>
        <div className='coin-info'>
          <ul>
            <li>Coin Market Rank</li>
            <li>{coindata.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coindata.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Coin Market Cap</li>
            <li>{currency.symbol} {coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24H High</li>
            <li>{currency.symbol} {coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24H Low</li>
            <li>{currency.symbol} {coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    )}
    else{
      return(
      <div className="spin">
        <div className="spinner"></div>
      </div>
      )
    }
}

export default Coin
