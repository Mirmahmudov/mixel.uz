import { useState } from "react";
import { Link } from "react-router-dom";
import "./CheapCard.css";
import Cart_shop from "../Cart_shop";
import Cart_heart from "../Cart_heart";
import Cart_scales from "../Cart_scales";

function CheapCard({ cheapData, filter_wide }) {
  return (
    <>
      {cheapData?.map((item) => {
        return (
          <div
            key={item.id}
            className={filter_wide ? "cheap_card cheap_card1 filter_wide" : "cheap_card"}
          >
            <Link to={`/product/${item.id}`}>
              <img className="card_img" src={`https://ecommerce0003.pythonanywhere.com/${item.img_main}`} alt="" />
            </Link>
            <div className="cheap_card_price">
              <p className="card_price1">
                {Math.floor((item.price / 12) * 1.3).toLocaleString()} сум/мес
              </p>
              <p className="card_price2">{item.price.toLocaleString()} сум</p>
              <h4 className="fil_card_title">{item.name.length > 43 ? item.name.slice(0, 43) + '...' : item.name}</h4>
            </div>
            <div className="prod_info prod_info_cart">
              <Cart_shop/>
              <Cart_heart/>
              <Cart_scales/>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CheapCard;
