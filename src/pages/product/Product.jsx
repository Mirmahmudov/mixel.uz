import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import { FiInfo } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart, FaRegComments } from "react-icons/fa";
import { RiScalesFill } from "react-icons/ri";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import CheapCard from "../../components/cheapCard/CheapCard";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Product({cheapData, setCheapData, setLoader}) {
  const [iconIsActive, setIconIsActive] = useState(false);
  const [iconIsActive2, setIconIsActive2] = useState(false);
  const [iconIsActive3, setIconIsActive3] = useState(false);
  const [mainImg, setMainImg] = useState(null);
  const [showMore, setShowMore] = useState(false);


  const { id } = useParams();

  const getData = () => {
    setLoader(true)
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://ecommerce0003.pythonanywhere.com/main/products/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCheapData(result);
        setMainImg(
          `https://ecommerce0003.pythonanywhere.com/${result?.img_main}`
        );
        setLoader(false)
      })
      .catch((error) => {
        console.error(error)
        setLoader(false)
      });
  };

  useEffect(() => {
    getData();
    window.scrollTo({
      top: 0,
    });
  }, [id]);


  return (
    <>
      {cheapData && (
        <>
          <div className="container page_names">
            <div className="page_name ">
              <p>Главная</p>
              <img src="/imgs/page_name_arrow_right.png" alt="" />
              <p>Ноутбуки</p>
              <img src="/imgs/page_name_arrow_right.png" alt="" />
              <p>{cheapData.product?.brand}</p>
            </div>
          </div>
          <section className="product">
            <div className="container">
              <div className="product_left">
                <div className="prod_big_img">
                  <img src={mainImg} alt="" />
                </div>
                <div className="prod_lit_imgs">
                  {cheapData.img_sub?.map((item, index) => {
                    return (
                      <div key={index} className="prod_lit_img">
                        <img
                          onClick={() => {
                            setMainImg(
                              `https://ecommerce0003.pythonanywhere.com/${item}`
                            );
                          }}
                          src={`https://ecommerce0003.pythonanywhere.com/${item}`}
                          alt=""
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="product_right">
                <div className="prod_r_collector">
                  <div className="prod_r_left">
                    <h1 className="prod_name">{cheapData.product?.name}</h1>
                    <div className="prod_r_main">
                      <div className="prod_price">
                        <p>
                          {cheapData.product?.price?.toLocaleString()}{" "}
                          <FiInfo className="prod_info_icon" />
                        </p>
                        <div className="prod_info">
                          <div
                            className={
                              iconIsActive
                                ? "prod_cart_icon active"
                                : "prod_cart_icon"
                            }
                          >
                            <FaCartShopping
                              className="prod_icons"
                              onClick={() => {
                                setIconIsActive(!iconIsActive);
                              }}
                            />
                          </div>
                          <div
                            className={
                              iconIsActive2
                                ? "prod_heart_icon active"
                                : "prod_heart_icon"
                            }
                          >
                            <FaHeart
                              className="prod_icons"
                              onClick={() => {
                                setIconIsActive2(!iconIsActive2);
                              }}
                            />
                          </div>
                          <div
                            className={
                              iconIsActive3
                                ? "prod_scales_icon active"
                                : "prod_scales_icon"
                            }
                          >
                            {" "}
                            <RiScalesFill
                              className="prod_icons"
                              onClick={() => {
                                setIconIsActive3(!iconIsActive3);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <p className="prod_client">
                        <FaRegComments /> VIP скидки для VIP клиентов
                      </p>
                    </div>
                    <div className="prod_btns">
                      <button className="prod_btn1">
                        Купить <br /> сейчас
                      </button>
                      <button className="prod_btn2">
                        Купить в рассрочку <br /> сейчас
                      </button>
                    </div>
                    <div className="prod_info_desc">
                      <p style={{ marginRight: "40px", color: "#909090" }}>
                        Описание
                      </p>
                      <p>
                        {cheapData.product?.description.length > 200
                          ? !showMore
                            ? cheapData.product?.description.slice(0, 200)
                            : cheapData.product?.description
                          : cheapData.product?.description}
                        {cheapData.product?.description.length > 200 && (
                          <span
                            onClick={() => {
                              setShowMore(!showMore);
                            }}
                          >
                            Read More
                          </span>
                        )}
                      </p>
                    </div>
                    {cheapData.properties?.length > 0 && <div className="prod_info_main">
                      <h1>Технические параметры</h1>
                      <div className="prod_info_colect">
                        {cheapData.properties?.map((item)=>{
                          return (
                            <div key={item.id} className="prod_info_desc prod_info_desc_main">
                          <p style={{ marginRight: "40px", color: "#909090" }}>
                            {item.name}
                          </p>
                          <p>{item.context}</p>
                        </div>
                          )
                        })}
                      </div>
                    </div>}
                    {cheapData.product?.display && (
                      <div className="prod_info_main">
                        <h1>Дисплей</h1>
                        <div className="prod_info_colect">
                          {cheapData.product.display.surface && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Поверхность{" "}
                              </p>
                              <p>{cheapData.product.display.surface}</p>
                            </div>
                          )}
                          <div className="prod_info_desc prod_info_desc_main">
                            <p
                              style={{ marginRight: "40px", color: "#909090" }}
                            >
                              Сенсорный экран{" "}
                            </p>
                            <p>
                              {cheapData.product.display.touch_screen
                                ? `Да`
                                : `Нет`}
                            </p>
                          </div>
                          {cheapData.product.display.frame_rate && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Частота смены кадров
                              </p>
                              <p>{cheapData.product.display.frame_rate} Гц</p>
                            </div>
                          )}
                          {cheapData.product.display.matrix_type && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Тип матрицы
                              </p>
                              <p>{cheapData.product.display.matrix_type}</p>
                            </div>
                          )}
                          {cheapData.product.display.resolution && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Разрешение{" "}
                              </p>
                              <p>
                                {cheapData.product.display.resolution} Пикселей
                              </p>
                            </div>
                          )}
                          {cheapData.product.display.dioganal && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Диагональ{" "}
                              </p>
                              <p>{cheapData.product.display.dioganal}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {cheapData.product?.processor && (
                      <div className="prod_info_main">
                        <h1>Процессор</h1>
                        <div className="prod_info_colect">
                          {cheapData.product.processor.brand && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Бренд
                              </p>
                              <p>{cheapData.product.processor.brand}</p>
                            </div>
                          )}
                          {cheapData.product.processor.family && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Семейство
                              </p>
                              <p>{cheapData.product.processor.family}</p>
                            </div>
                          )}
                          {cheapData.product.processor.model && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Модель{" "}
                              </p>
                              <p>{cheapData.product.processor.model}</p>
                            </div>
                          )}
                          {cheapData.product.processor.gen && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Поколение
                              </p>
                              <p>{cheapData.product.processor.gen}</p>
                            </div>
                          )}
                          {cheapData.product.processor.core && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Количество ядер
                              </p>
                              <p>{cheapData.product.processor.core}</p>
                            </div>
                          )}
                          {cheapData.product.processor.thread && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Количество потоков
                              </p>
                              <p>{cheapData.product.processor.thread}</p>
                            </div>
                          )}
                          {cheapData.product.processor.min_frequency && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Минимальная частота
                              </p>
                              <p>
                                {cheapData.product.processor.min_frequency} ГГц
                              </p>
                            </div>
                          )}
                          {cheapData.product.processor.max_frequency && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Максимальная частота
                              </p>
                              <p>
                                {cheapData.product.processor.max_frequency} ГГц
                              </p>
                            </div>
                          )}
                          {cheapData.product.processor.cache && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Кэш{" "}
                              </p>
                              <p>{cheapData.product.processor.cache} Мб</p>
                            </div>
                          )}
                          {cheapData.product.processor.video_card && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Встроенная видеокарта
                              </p>
                              <p>{cheapData.product.processor.video_card}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {cheapData.product?.ram && (
                      <div className="prod_info_main">
                        <h1>Оперативная память</h1>
                        <div className="prod_info_colect">
                          {cheapData.product.ram.model && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Модель
                              </p>
                              <p>{cheapData.product.ram.model}</p>
                            </div>
                          )}
                          {cheapData.product.ram.type && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Тип
                              </p>
                              <p>{cheapData.product.ram.type}</p>
                            </div>
                          )}
                          {cheapData.product.ram.brand && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Бренд
                              </p>
                              <p>{cheapData.product.ram.brand}</p>
                            </div>
                          )}
                          {cheapData.product.ram.size && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Размер
                              </p>
                              <p>{cheapData.product.ram.size} гб</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {cheapData.product?.videocard && (
                      <div className="prod_info_main">
                        <h1>Видеокарта</h1>
                        <div className="prod_info_colect">
                          {cheapData.product.videocard.model && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Модель
                              </p>
                              <p>{cheapData.product.videocard.model}</p>
                            </div>
                          )}
                          {cheapData.product.videocard.type && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Тип
                              </p>
                              <p>{cheapData.product.videocard.type}</p>
                            </div>
                          )}
                          {cheapData.product.videocard.brand && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Бренд
                              </p>
                              <p>{cheapData.product.videocard.brand}</p>
                            </div>
                          )}
                          {cheapData.product.videocard.size && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Размер
                              </p>
                              <p>{cheapData.product.videocard.size} гб</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {cheapData.product?.camera && (
                      <div className="prod_info_main">
                        <h1>Камера</h1>
                        <div className="prod_info_colect">
                          {cheapData.product.camera.model && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Модель
                              </p>
                              <p>{cheapData.product.camera.model}</p>
                            </div>
                          )}
                          {cheapData.product.camera.type && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Тип
                              </p>
                              <p>{cheapData.product.camera.type}</p>
                            </div>
                          )}
                          {cheapData.product.camera.brand && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Бренд
                              </p>
                              <p>{cheapData.product.camera.brand}</p>
                            </div>
                          )}
                          {cheapData.product.camera.pixel_size && (
                            <div className="prod_info_desc prod_info_desc_main">
                              <p
                                style={{
                                  marginRight: "40px",
                                  color: "#909090",
                                }}
                              >
                                Пиксели
                              </p>
                              <p>{cheapData.product.camera.pixel_size} px</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="prod_r_right">
                    <div className="prod_box">
                      <div className="prod_box_left">
                        <img src="/imgs/reverse.png" alt="" />
                      </div>
                      <div className="prod_box_right">
                        <p style={{ fontWeight: "600", fontSize: "15px" }}>
                          30 дней на обмен и возврат.
                        </p>
                        <p
                          style={{
                            color: "#909090",
                            fontSize: "15px",
                            margin: "6px 0px",
                          }}
                        >
                          Если купите товар сегодня, до 06 мая можете вернуть
                          или обменять.
                        </p>
                        <a
                          style={{
                            textDecoration: "none",
                            color: "#2F80ED",
                            fontSize: "15px",
                          }}
                          href=""
                        >
                          Подробнее о программе.
                        </a>
                      </div>
                    </div>
                    <div className="prod_box">
                      <div className="prod_box_left">
                        <img src="/imgs/call_center.png" alt="" />
                      </div>
                      <div className="prod_box_right">
                        <p
                          style={{
                            fontWeight: "600",
                            fontSize: "15px",
                            marginBottom: "18px",
                          }}
                        >
                          Есть вопросы?
                        </p>
                        <p
                          style={{
                            color: "#909090",
                            fontSize: "15px",
                            marginBottom: "12px",
                          }}
                        >
                          Телефон:{" "}
                          <span style={{ color: "#2F80ED" }}>
                            +998 91 344 44 68
                          </span>
                        </p>
                        <p
                          style={{
                            color: "#909090",
                            fontSize: "15px",
                            marginBottom: "12px",
                          }}
                        >
                          Телеграм:{" "}
                          <span style={{ color: "#2F80ED" }}>https://t.me/A_Mahmudov0923</span>
                        </p>
                        <p
                          style={{
                            color: "#909090",
                            fontSize: "15px",
                            marginBottom: "12px",
                          }}
                        >
                          Эл. почта:{" "}
                          <span style={{ color: "#2F80ED" }}>
                          asadbekmirmahmudov3@gmail.com
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="prod_box">
                      <div className="prod_box_left">
                        <img
                          style={{ marginBottom: "45px" }}
                          src="/imgs/del.png"
                          alt=""
                        />
                        <img
                          style={{ marginLeft: "-20px" }}
                          src="/imgs/wallet.png"
                          alt=""
                        />
                      </div>
                      <div className="prod_box_right">
                        <p
                          style={{
                            fontWeight: "600",
                            fontSize: "15px",
                            marginBottom: "24px",
                          }}
                        >
                          Доставка:{" "}
                          <span style={{ color: "#909090", fontWeight: "400" }}>
                            Бесплатно, {cheapData.product?.deliver}
                          </span>
                        </p>
                        <p style={{ fontWeight: "600", marginBottom: "10px" }}>
                          Cпособ оплаты:
                        </p>
                        <li style={{ color: "#909090" }}>
                          Наличными (При Доставке){" "}
                        </li>
                        <li style={{ color: "#909090" }}>Payme / Click</li>
                        <li style={{ color: "#909090" }}>
                          Перечислением с НДС
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sale_info_top sale_info_top2">
                  <h2>Недавно просмотренные</h2>
                  <p className="prod_p">
                    <Link to={`/products/${cheapData.product?.subCategory.name.toLowerCase()}`}>
                      Посмотреть все <BsArrowRight />
                    </Link>
                  </p>
                </div>
                <div className="prod_r_cards">
                  {/* <CheapCard cheapData={cheapData} /> */}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Product;
