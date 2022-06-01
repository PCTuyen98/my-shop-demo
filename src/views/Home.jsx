import React, { useEffect, useState } from "react";
import ProductCard from "../components/product-card";
import "../assets/home.css";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((dt) => setData(dt));
  }, []);

  return (
    <div className="home">
      <div className="list-products">
        {data.map((item, index) => (
          <ProductCard
            key={index}
            id={item?.id}
            imageSrc={item?.small_image?.url}
            productName={item?.name}
            currency={item?.price?.regularPrice?.amount?.currency}
            productPrice={item?.price?.regularPrice?.amount?.value}
            ratingSummary={item?.rating_summary}
            isFavorite={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
