import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import CoinInfo from "./components/coinInfo";
import { Input } from "semantic-ui-react";

import "./App.css";
import { useRoutes } from "react-router-dom";
import DetailView from "../routes/DetailView";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY
      );
      const json = await response.json();
      console.log(json);
      setList(json);
    };

    fetchAllCoinData().catch(console.error);
  }, []);


   let element = useRoutes([
     {
       path: "/",
       element: <CoinInfo />,
    },
     {
       path: "/coinDetail/:symbol",
      element: <DetailView />,
    },
    ]);

  
  return (
    

    <div className="whole-page">
           <div>
 {element}
</div>
 
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      <ul>
        
        {searchInput.length > 0
          ? filteredResults.map((coin) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                <CoinInfo
                
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
                
              ) : null
            )
          : list &&
            Object.entries(list.Data).map(([coin]) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                <CoinInfo
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
              ) : null
            )}
      </ul>
    </div>
  );
}

export default App;
