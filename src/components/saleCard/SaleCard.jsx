import React, { useState, useEffect } from "react";
import "./SaleCard.css";
import Cart_shop from "../Cart_shop";
import Cart_heart from "../Cart_heart";
import { Link } from "react-router-dom";
import Cart_scales from "../Cart_scales";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";

function SaleCard() {
  const [saleProducts, setSaleProducts] = useState(null);
  const getData = async () => {
    const req = await fetch(
      "https://ecommerce0003.pythonanywhere.com/main/products/"
    );
    const data = await req.json();

    setSaleProducts(
      data.filter((item) => {
        return item.discount;
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const deadline = "2025-02-15";
  const [timeRemaining, setTimeRemaining] = useState(
    getTimeRemaining(deadline)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(deadline));
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const timer = Date.parse(endtime) - Date.parse(new Date());

    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / 1000 / 60) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }
    return {
      timer,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper on_sale_prod_cards"
      >
        {saleProducts &&
          saleProducts?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div key={item.id} className="sale_card ">
                  <Link to={`/product/${item.id}`}>
                    <span className="sale_span">-{item.discount.amount}%</span>
                    <img
                      src={`https://ecommerce0003.pythonanywhere.com/${item.img_main}`}
                      alt=""
                    />
                    <div className="card_price">
                      <p className="oldPrice">1 373 000 сум</p>
                      <p className="price">{item.price.toLocaleString()}</p>
                    </div>
                    <h4 className="fil_card_title">
                      {item.name.length > 43
                        ? item.name.slice(0, 43) + "..."
                        : item.name}
                    </h4>
                    <p className="sale_end_info">
                      Предложение заканчивается через:
                    </p>
                    <div className="sale_time">
                      <div className="sale_time_day">
                        <p id="p-bor">{getZero(timeRemaining.days)}</p>
                        <span id="s-bor">ДНЕЙ</span>
                      </div>
                      <div className="sale_time_day">
                        <p id="p-bor">{getZero(timeRemaining.hours)}</p>
                        <span id="s-bor">ЧАСОВ</span>
                      </div>
                      <div className="sale_time_day">
                        <p id="p-bor">{getZero(timeRemaining.minutes)}</p>
                        <span id="s-bor">МИНУТ</span>
                      </div>
                      <div className="sale_time_day">
                        <p>{getZero(timeRemaining.seconds)}</p>
                        <span>СЕКУНД</span>
                      </div>
                    </div>
                  </Link>
                  <div className="prod_info prod_info_cart">
                    <Cart_shop />
                    <Cart_heart />
                    <Cart_scales />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}

export default SaleCard;
