import { createContext, useEffect, useState } from "react";

export const Coincontext = createContext()

const CoincontextProvider = (props) => {

    const [allcoin, setAllcoin] = useState([])
    const [currency, setcurrency] = useState({
        name : 'usd',
        symbol : '$'
    })

    const fetchcoins = () =>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-A6ET3ntxsssdqmekESYx1L8s'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllcoin(response))
            .catch(err => console.error(err));
    }

    useEffect(()=>{
        fetchcoins()
    },[currency])

    const contextvalue ={
        allcoin, currency, setcurrency
    }

    return(
        <Coincontext.Provider value={contextvalue}>
            {props.children}
        </Coincontext.Provider>
    )
}

export default CoincontextProvider;