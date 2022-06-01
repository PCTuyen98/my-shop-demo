import React, { useCallback } from "react";
import "./product-card.css";
import { formatter } from "../../utils/formatter";
import { Rating, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  id,
  productName,
  productPrice,
  imageSrc,
  currency,
  ratingSummary,
  isFavorite,
}) => {
  const navigate = useNavigate();

  const renderLongName = () => {
    if (productName.length > 30) {
      return productName.split("").splice(0, 30).join("") + "...";
    } else return productName;
  };

  const handleRoute = useCallback(() => {
    navigate(`/products/${id}`);
  }, []);

  return (
    <div className="card-container">
      <div onClick={handleRoute}>
        <div className="image-container">
          <img src={imageSrc} alt="" className="image" />
        </div>
        <div className="product-detail">
          <div className="product-name">{renderLongName()}</div>
          <div className="product-price">
            {formatter(productPrice, currency)}
          </div>
        </div>
      </div>
      <div className="review-bar">
        <Rating name="read-only" value={(ratingSummary * 5) / 100} readOnly />
        <IconButton style={{ padding: 0 }}>
          <FavoriteBorderOutlinedIcon
            color={isFavorite ? "error" : "inherit"}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
