import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const DogDetail = () => {
  let params = useParams().symbol;
  console.log(params);
  const [fullDetails, setFullDetails] = useState(null);
  useEffect(() => {
    const getCoinDetail = async () => {
      const details = await fetch(
        `https://api.thedogapi.com/v1/images/search?api_key=${API_KEY}&id=${params}`
      );
      console.log(params);
      const detailsJson = await details.json();
      console.log(detailsJson);
      setFullDetails({
        name: detailsJson[0].breeds[0].name,
        lifespan: detailsJson[0].breeds[0].life_span,
        weight: detailsJson[0].breeds[0].weight.metric,
        image: detailsJson[0].url,
        temperament: detailsJson[0].breeds[0].temperament,
      });

      return () => {
        console.log("clear up");
      };
    };
    getCoinDetail().catch(console.error);
  }, []);
  // console.log(detailsJson);
  // console.log(descripJson);

  if (!fullDetails) return <div>Loading...</div>;
  return (
    <div className="dog-detail-container">
      <img src={fullDetails.image} alt={`Dog's image`} />
      <div className="dog-detail-content">
        <h1>{fullDetails.name}</h1>
        <span>Age: {fullDetails.lifespan}</span>
        <span>Weight: {fullDetails.weight}</span>
        <span>Temperament: {fullDetails.temperament}</span>
      </div>
    </div>
  );
};

export default DogDetail;
