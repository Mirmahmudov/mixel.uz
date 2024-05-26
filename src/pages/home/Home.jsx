import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./Home.css";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import SaleCard from "../../components/saleCard/SaleCard";
import CheapCard from "./../../components/cheapCard/CheapCard";
import { Link } from "react-router-dom";

function Home({ setLoader }) {
  const [products, setProducts] = useState([]);

  const getData = () => {
    setLoader(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://ecommerce0003.pythonanywhere.com/main/products/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProducts(
          result.filter((item) => {
            return item.price <= 1500000;
          })
        );
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <header
        onLoad={() => {
          window.scrollTo({
            top: 0,
          });
        }}
      >
        <div className="container2">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 14000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="container">
                <img src="/imgs/header-img.png" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="container">
                <img src="/imgs/header-img.png" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="container">
                <img src="/imgs/header-img.png" alt="" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </header>
      <section className="on_sale_prod">
        <div className="container">
          <div className="sale_info_top">
            <h2>Горящие предложения</h2>
            <p className="prod_p">
              <Link to={"/products/discount"}>
                Посмотреть все <BsArrowRight />
              </Link>
            </p>
          </div>
          <div>
            <SaleCard />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="sale_info_top">
            <h2>Популярные категории</h2>
          </div>
        </div>
        <div className="container2">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 14000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="container">
                <div className="swiper_boxes">
                  <Link to={"/products/monoblock"}>
                    <div className="swiper_box">
                      <h3>Компьютеры</h3>
                      <img src="/imgs/slider_img1.png" alt="" />
                    </div>
                  </Link>
                  <Link to={"/products/phones"}>
                    <div className="swiper_box">
                      <h3>
                        Телефоны, <br />
                        планшеты
                      </h3>
                      <img src="/imgs/slider_img2.png" alt="" />
                    </div>
                  </Link>
                  <Link to={"/products/laptops"}>
                    <div className="swiper_box">
                      <h3>Ноутбуки</h3>
                      <img src="/imgs/slider_img3.png" alt="" />
                    </div>
                  </Link>
                  <Link to={"/products/equipment"}>
                    <div className="swiper_box">
                      <h3>
                        Товары для <br /> офиса
                      </h3>
                      <img src="/imgs/slider_img4.png" alt="" />
                    </div>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="container">
                <div className="swiper_boxes">
                  <Link to={"/products/accessories"}>
                    <div className="swiper_box">
                      <h3>Комплектующие</h3>
                      <img src="/imgs/slider_img3.png" alt="" />
                    </div>
                  </Link>
                  <Link to={"/products/network-hardware"}>
                    <div className="swiper_box">
                      <h3>
                        Сетевое <br /> оборудование
                      </h3>
                      <img src="/imgs/slider_img4.png" alt="" />
                    </div>
                  </Link>
                  <Link to={"/products/monoblocks"}>
                    <div className="swiper_box">
                      <h3>Компьютеры</h3>
                      <img src="/imgs/slider_img1.png" alt="" />
                    </div>
                  </Link>
                  <Link to={"/products/phones&tablets"}>
                    <div className="swiper_box">
                      <h3>
                        Телефоны, <br />
                        планшеты
                      </h3>
                      <img src="/imgs/slider_img2.png" alt="" />
                    </div>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className="swiper3">
        <div className="container3">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 14000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {products.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="container">
                    <div className="swiper_card">
                      <div className="swpier_card_left">
                        <h2>{item.name}</h2>
                        <p>{item.description.slice(0, 100)}</p>
                      </div>
                      <div className="swpier_card_center">
                        <img className="swiper_card_img"
                          src={`https://ecommerce0003.pythonanywhere.com/${item.img_main}`}
                          alt=""
                        />
                      </div>
                      <div className="swpier_card_right">
                        <h1 className="swiper_price">
                          {item.price.toLocaleString()} Сум
                        </h1>
                        <Link to={"/products/all"}>
                          <button className="swiper_btn">Показать еще</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="sale_info_top sale_info_top2">
            <h2>
              Товары <br /> дешевле:
            </h2>
            <p className="prod_p">
              <Link to={"/products/all"}>
                Посмотреть все <BsArrowRight />
              </Link>
            </p>
          </div>
          <div className="on_sale_prod_cards">
            <CheapCard cheapData={products} />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="sale_info_top sale_info_top_brands">
            <h2>Бренды</h2>
            <p className="prod_p">
              <BsArrowLeft className="arrows_sect" />
              <BsArrowRight className="arrows_sect" />
            </p>
          </div>
          <div className="top_brnads">
            <a target="_blank" href="https://global.canon/">
              <div className="top_brands_box">
                <img src="/imgs/canon.png" alt="" />
              </div>
            </a>
            <a target="_blank" href="https://www.mi.com/">
              <div className="top_brands_box">
                <img src="/imgs/mi.png" alt="" />
              </div>
            </a>
            <a target="_blank" href="https://www.lg.com/">
              <div className="top_brands_box">
                <img src="/imgs/lg.png" alt="" />
              </div>
            </a>
            <a target="_blank" href="https://www.samsung.com/">
              <div className="top_brands_box">
                <img src="/imgs/samsung.png" alt="" />
              </div>
            </a>
            <a target="_blank" href="https://artelgroup.org/">
              <div className="top_brands_box">
                <img src="/imgs/artel.png" alt="" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
