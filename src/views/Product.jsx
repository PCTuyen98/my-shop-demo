import React, { useEffect, useState } from "react";
import "../assets/product.css";
import { useParams } from "react-router-dom";
import { Rating, IconButton } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { formatter } from "../utils/formatter";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Product = () => {
  const [data, setData] = useState();
  const pathname = useParams();
  const [isSelect, setIsSelect] = useState();
  const [quantity, setQuantity] = useState(1);
  const [tabs, setTabs] = useState("one");

  useEffect(() => {
    fetch(`http://localhost:3000/products/${pathname?.id}`)
      .then((res) => res.json())
      .then((dt) => {
        setData(dt);
        setIsSelect(data?.small_image?.url);
      });
  }, []);

  console.log(data);

  return (
    <div className="product">
      <div className="product-actions">
        <div className="image-slide">
          <div className="small-image-list">
            <button
              type="button"
              className={`button-change-image ${
                isSelect === data?.small_image?.url ? "active-image" : ""
              }`}
            >
              <img src={data?.small_image?.url} className="small-image" />
            </button>
          </div>
          <div>
            <img src={data?.small_image?.url} className="preview-image" />
          </div>
        </div>
        <div className="product-detail-sale">
          <div className="discount-information">
            <span className="sale">Sale</span>
            <span className="shipable">Ready to ship</span>
          </div>
          <p className="name">{data?.name}</p>
          <div className="rating-favorite">
            <div className="rating">
              <Rating
                name="read-only"
                value={(data?.rating_summary * 5) / 100}
                readOnly
              />
              <div>{data?.review_count} Reviews</div>
              <div>| {data?.sold || 0} Sold</div>
            </div>
            <IconButton style={{ padding: 0 }}>
              <FavoriteBorderOutlinedIcon color={false ? "error" : "inherit"} />
            </IconButton>
          </div>
          <div className="price">
            {formatter(
              data?.price?.regularPrice?.amount?.value,
              data?.price?.regularPrice?.amount?.currency || "THB"
            )}
          </div>
          <div className="quantity-sub">
            <div>
              <div className="title">Quantity (Box)</div>
              <div>
                <button
                  type="button"
                  className="button-add"
                  disabled={quantity === 0}
                  onClick={() => {
                    setQuantity(Number(quantity) - 1);
                  }}
                >
                  -
                </button>
                <input
                  className="input"
                  type={"number"}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={0}
                />
                <button
                  type="button"
                  className="button-add"
                  onClick={() => {
                    setQuantity(Number(quantity) + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <div className="title">Subtotal ฿</div>
              <p className="final-price">
                {formatter(
                  data?.price?.regularPrice?.amount?.value * quantity,
                  data?.price?.regularPrice?.amount?.currency || "THB"
                )}
              </p>
            </div>
          </div>
          <ul>
            <li>Minimum orders 1 Box</li>
            <li>Stock Available 100 Box</li>
          </ul>
          <div className="list-button">
            <button className="add">
              <AddShoppingCartIcon />
              Add to Cart
            </button>
            <button className="buy">Buy now</button>
          </div>
          <p className="sku">SKU: {data?.sku}</p>
        </div>
      </div>
      <div className="product-tabs">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={tabs}
            onChange={(_, value) => setTabs(value)}
          >
            <Tab value="one" label="Description" />
            <Tab value="two" label="Reviews" />
          </Tabs>
        </Box>
      </div>
    </div>
  );
};

export default Product;
