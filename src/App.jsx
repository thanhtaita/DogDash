import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import DogInfo from "./components/DogInfo";
import { Input } from "semantic-ui-react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import DetailView from "../routes/DetailView";
import Layout from "../routes/Layout";
import DogDetail from "./components/DogDetail";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [height, setHeight] = useState([]);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    if (searchValue !== "") {
      const filteredData = list.filter((obj) => {
        return obj.breeds[0].name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      console.log(filteredData);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  };

  const calculateHeight = (jsonObj) => {
    let objList = [];
    let tempObj = {};
    for (let i = 0; i < jsonObj.length; i++) {
      const myString = jsonObj[i].breeds[0].height.metric;
      const myNumbers = myString.split(" - ").map(Number);
      const myAverage =
        myNumbers.reduce((sum, num) => sum + num, 0) / myNumbers.length;
      const myRoundedAverage = Math.round(myAverage);
      tempObj = {
        name: jsonObj[i].breeds[0].name,
        height: myRoundedAverage,
      };
      objList.push(tempObj);
    }
    setHeight(objList);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetch(
        `https://api.thedogapi.com/v1/images/search?api_key=${API_KEY}&has_breeds=${true}&limit=10`
      );
      const json = await response.json();
      console.log(json);
      setList(json);
      calculateHeight(json);
    };

    fetchAllData().catch(console.error);
  }, []);

  return (
    <div className="whole-page">
      <div className="dog-list">
        <h1>Puppy Collection</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <ul>
          {searchInput.length > 0
            ? filteredResults.map((dog) => (
                <DogInfo
                  name={dog.breeds[0].name}
                  image={dog.url}
                  lifespan={dog.breeds[0].life_span}
                  weight={dog.breeds[0].weight.metric}
                  symbol={dog.id}
                />
              ))
            : list &&
              list.map((dog) => (
                <DogInfo
                  name={dog.breeds[0].name}
                  image={dog.url}
                  lifespan={dog.breeds[0].life_span}
                  weight={dog.breeds[0].weight.metric}
                  symbol={dog.id}
                />
              ))}
        </ul>
      </div>
      <BarChart
        width={800}
        height={500}
        data={height}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="height" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default App;
