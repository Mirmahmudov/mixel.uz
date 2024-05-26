import React from "react";
import "./Favorites.css";
import { GiCancel } from "react-icons/gi";

function Favorites() {
  return (
    <>
      <div
        onLoad={() => {
          window.scrollTo({
            top: 0,
          });
        }}
        className="container page_names"
      >
        <div className="page_name ">
          <p>Главная</p>
          <img src="/imgs/page_name_arrow_right.png" alt="" />
          <p>Избранное </p>
        </div>
        <div className="prod_count">
          <div className="page_name_circle">
            <GiCancel />
          </div>
          <p>Удалит все</p>
        </div>
      </div>
      <div className="container">
        <div className="phones_stat">
          <h3>Избранное</h3>
        </div>
      </div>
    </>
  );
}

export default Favorites;
