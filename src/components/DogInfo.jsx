import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const DogInfo = ({ image, name, symbol, lifespan, weight }) => {
  return (
    <div>
      {
        <li className="main-list" key={symbol}>
          <img
            className="icons"
            src={image}
            alt={`Small icon for ${name} crypto coin`}
          />
          <Link
            style={{ color: "white", width: "13rem" }}
            to={`/DogDetail/:${symbol}`}
            key={symbol}
          >
            {name}
          </Link>
          <span>{lifespan}</span>
          <span>{weight}</span>
        </li>
      }
    </div>
  );
};

export default DogInfo;
