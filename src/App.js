import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Coin from "./Coin";

import { DEFAULT_URL } from "./constants";

function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    axios
      .get(DEFAULT_URL)
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setFilteredCoins(() =>
      coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [setFilteredCoins, coins, search]);

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            className="coin-input"
            placeholder="Search"
            value={search}
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.length > 0 &&
        filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          );
        })}
    </div>
  );
}

export default App;
