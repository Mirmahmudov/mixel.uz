import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React, { useState, useEffect } from "react";
import CheapCard from "../../components/cheapCard/CheapCard";
import "./Filter_product.css";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { FaChevronDown } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { CiGrid2H } from "react-icons/ci";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useParams } from "react-router-dom";

function Filter_product({ search, setLoader }) {
  const { type } = useParams();

  function valuetext(value) {
    return `${value}°C`;
  }
  const [value, setValue] = React.useState([0, 30000000]);
  const [brand, setBrand] = useState([]);
  const [battery, setBattery] = useState([]);
  const [country, setCountry] = useState([]);

  const [disableText, setDisableText] = useState(true);
  const [filter_wide, setFilter_wide] = useState(false);

  const [product, setProduct] = useState();
  const [newProducts, setNewProducts] = useState();

  const filtered = () => {
    var filterBrand
    var filterCountry
    var filterPrice

    if(brand.length > 0){
      filterBrand = newProducts.filter((item)=>{
        return brand.includes(item.brand)
      })
    }else{
      filterBrand = newProducts
    }
    if(country.length > 0){
      filterCountry = newProducts.filter((item)=>{
        return country.includes(item.country?.toLowerCase())
      })
    }else{
      filterCountry = newProducts
    }
    filterPrice = newProducts.filter((item)=>{
      return item.price > value[0] && item.price < value[1]
    })
    var newData = filterBrand.filter((item)=>{
      return filterCountry.includes(item) && filterPrice.includes(item)
    })
    setProduct(newData)
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getData = (api) => {
    setLoader(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProduct(result);
        setNewProducts(result);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };
  useEffect(() => {
    if (type == "accessories") {
      getData(
        "https://ecommerce0003.pythonanywhere.com/main/products/?subCategory_id=4"
      );
    } else if (type == "monoblocks") {
      getData(
        "https://ecommerce0003.pythonanywhere.com/main/products/?subCategory_id=6"
      );
    } else if (type == "phones") {
      getData(
        "https://ecommerce0003.pythonanywhere.com/main/products/?subCategory_id=5"
      );
    } else if (type == "laptops") {
      getData(
        "https://ecommerce0003.pythonanywhere.com/main/products/?subCategory_id=1"
      );
    } else if (type == "equipments") {
      getData(
        "https://ecommerce0003.pythonanywhere.com/main/products/?subCategory_id=8"
      );
    } else if (type == "networks") {
      getData(
        "https://ecommerce0003.pythonanywhere.com/main/products?subCategory_id=7"
      );
    } else if (type == "discount") {
      getData(
        "https://ecommerce0003.pythonanywhere.com/main/products/?discount=true"
      );
    } else if (type == "all") {
      getData("https://ecommerce0003.pythonanywhere.com/main/products");
    }
  }, [type]);

  useEffect(() => {
    setProduct(
      newProducts?.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search]);

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
          <p>Телефоны, планшеты</p>
          <img src="/imgs/page_name_arrow_right.png" alt="" />
          <p>Телефоны и гаджеты</p>
        </div>
        <div className="prod_count">
          <p>Товаров 24 / 249</p>
        </div>
      </div>
      <div className="container phones_stat_all">
        <div className="phones_stat">
          <h3>Смартфоны в Ташкенте</h3>
          <div className="phone_price">
            <p>
              <img src="/imgs/price.png" alt="" />
              По цене
            </p>
            <p>
              <img src="/imgs/stat_bar.png" alt="" />
              По популярности
            </p>
          </div>
        </div>
        <div className="phone_imgs">
          <IoGridOutline
            style={!filter_wide ? { color: "#ED3729" } : {}}
            onClick={() => {
              setFilter_wide(false);
            }}
            className="phone_img_grid1"
          />
          <CiGrid2H
            style={filter_wide ? { color: "#ED3729" } : {}}
            onClick={() => {
              setFilter_wide(true);
            }}
            className="phone_img_grid2"
          />
        </div>
      </div>
      <section className="filter_prod">
        <div className="container">
          <div className="filter_prod_left">
            <Accordion style={{ boxShadow: "none", marginBottom: "15px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ padding: "0px" }}
              >
                <h4 style={{ fontWeight: "500" }}>Цена (cум)</h4>
              </AccordionSummary>
              <AccordionDetails style={{ padding: "0px" }}>
                <div className="fil_price_cont">
                  <input
                    className="fil_price_inp1"
                    value={`от ${value[0]}`}
                    type="text"
                    placeholder=""
                  />
                  <input
                    className="fil_price_inp2"
                    value={`до ${value[1]}`}
                    type="text"
                    placeholder=""
                  />
                </div>
                <Slider
                  getAriaLabel={() => "Temperature range"}
                  value={value}
                  onChange={handleChange}
                  getAriaValueText={valuetext}
                  style={{ color: "#ED3729" }}
                  min={0}
                  max={30000000}
                />
              </AccordionDetails>
            </Accordion>
            <h4 className="fil_prod_title">Наличие</h4>
            <div className="fil_take">
              <input type="checkbox" />
              <p>Забрать сегодня</p>
            </div>
            <Accordion style={{ boxShadow: "none", marginBottom: "15px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ padding: "0px" }}
              >
                <h4 style={{ fontWeight: "500" }}>Бренд</h4>
              </AccordionSummary>
              <AccordionDetails
                style={{ padding: "0px" }}
                onChange={(e) => {
                  if (!brand.includes(e.target.value)) {
                    brand.push(e.target.value);
                    setBrand(brand);
                  } else {
                    let newBrand = brand.filter((item) => {
                      return item != e.target.value;
                    });
                    setBrand(newBrand);
                  }
                }}
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label="Philips"
                  value="Philips"
                />
                <span style={{ color: "#BDBDBD", fontSize: "14px" }}>(30)</span>
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Hp"
                  value="Hp"
                />
                <span style={{ color: "#BDBDBD", fontSize: "14px" }}>(30)</span>
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="HyperX"
                  value="HyperX"
                />
                <span style={{ color: "#BDBDBD", fontSize: "14px" }}>(30)</span>
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Apple"
                  value="Apple"
                />
                <span style={{ color: "#BDBDBD", fontSize: "14px" }}>(30)</span>
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Artel"
                  value="Artel"
                />
                <span style={{ color: "#BDBDBD", fontSize: "14px" }}>(7)</span>
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Acer"
                  value="Acer"
                />
                <span style={{ color: "#BDBDBD", fontSize: "14px" }}>(30)</span>
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Tp-Link"
                  value="Tp-Link"
                />
                <span style={{ color: "#BDBDBD", fontSize: "14px" }}>(30)</span>
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Intel"
                  value="Intel"
                />
                <span style={{ color: "#BDBDBD", fontSize: "14px" }}>(30)</span>
                <br />
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ boxShadow: "none", marginBottom: "15px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ padding: "0px" }}
              >
                <h4 style={{ fontWeight: "500" }}>Емкость аккумулятора</h4>
              </AccordionSummary>
              <AccordionDetails
                style={{ padding: "0px" }}
                onChange={(e) => {
                  if (!battery.includes(e.target.value)) {
                    battery.push(e.target.value);
                    setBattery(battery);
                  } else {
                    let newBattery = battery.filter((item) => {
                      return item != e.target.value;
                    });
                    setBattery(newBattery);
                  }
                }}
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label="1821 мА⋅ч"
                  value={1821}
                />
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="3000 мА⋅ч"
                  value={3000}
                />
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="4500 мА⋅ч"
                  value={4500}
                />
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="5000 мА⋅ч"
                  value={5000}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ boxShadow: "none", marginBottom: "15px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ padding: "0px" }}
              >
                <h4 style={{ fontWeight: "500" }}>Страна производитель</h4>
              </AccordionSummary>
              <AccordionDetails
                style={{ padding: "0px", backgroundColor: "transparent" }}
                onChange={(e) => {
                  if (!country.includes(e.target.value)) {
                    country.push(e.target.value);
                    setCountry(country);
                  } else {
                    let newCountry = country.filter((item) => {
                      return item != e.target.value;
                    });
                    setCountry(newCountry);
                  }
                }}
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label="Ю. Корея"
                  value="korea"
                />
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Китай"
                  value="china"
                />
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="США"
                  value="usa"
                />
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Узбекистан"
                  value="uzbekistan"
                />
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ boxShadow: "none", marginBottom: "15px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ padding: "0px" }}
              >
                <h4 style={{ fontWeight: "500" }}>Количество ядер</h4>
              </AccordionSummary>
            </Accordion>
            <Accordion style={{ boxShadow: "none", marginBottom: "15px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ padding: "0px" }}
              >
                <h4 style={{ fontWeight: "500" }}>Фронтальная камера</h4>
              </AccordionSummary>
            </Accordion>
            <Accordion style={{ boxShadow: "none", marginBottom: "15px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ padding: "0px" }}
              >
                <h4 style={{ fontWeight: "500" }}>Фотокамера</h4>
              </AccordionSummary>
            </Accordion>
            <Accordion style={{ boxShadow: "none", marginBottom: "15px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ padding: "0px" }}
              >
                <h4 style={{ fontWeight: "500" }}>Версия ОС</h4>
              </AccordionSummary>
            </Accordion>
            <Accordion style={{ boxShadow: "none", marginBottom: "15px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ padding: "0px" }}
              >
                <h4 style={{ fontWeight: "500" }}>Разъем для наушников</h4>
              </AccordionSummary>
            </Accordion>
            <button className="btn btn1" onClick={filtered}>
              Показать
            </button>
          </div>
          <div className="filter_prod_right">
            <CheapCard filter_wide={filter_wide} cheapData={product} />
          </div>
        </div>
        <div className="container">
          <div className="fil_addit">
            <h1 className="fil_addit_title">
              Где купить надежный смартфон в Ташкенте?
            </h1>
            <p
              className={
                disableText ? "fil_addit_text inactive" : "fil_addit_text"
              }
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
              recusandae molestiae laudantium labore eligendi veniam temporibus
              illo maiores ipsam fugit tempora natus hic optio perferendis,
              libero sunt accusantium, laborum nesciunt? Facilis asperiores
              earum, sunt obcaecati voluptatibus excepturi reprehenderit
              voluptatem illo. Dolor consequatur repellendus molestias sunt
              soluta qui dignissimos, facere porro provident architecto
              necessitatibus cumque numquam quisquam. Autem dicta iusto dolorem
              facere voluptate omnis recusandae distinctio ducimus amet
              reprehenderit assumenda id explicabo repellendus eius
              exercitationem error minima maxime, consequatur magnam facilis
              nobis tempore illum? Molestias, accusamus officiis praesentium
              autem error natus quas numquam, ipsam iure non ipsum aperiam nihil
              qui molestiae. Repellendus praesentium quidem accusamus tempora
              aspernatur excepturi laborum, quisquam esse commodi. Error
              numquam, id eum ipsa nulla incidunt dignissimos cumque laudantium
              expedita, nostrum quam! Ea incidunt ab, earum provident nihil
              nostrum blanditiis nemo neque eos facilis consequatur temporibus
              explicabo nulla repellat voluptas hic tempore atque consectetur
              in. Ab esse facilis maiores sequi consequuntur fugiat rem tempora
              enim! Tempora porro nihil ipsa quidem hic, vitae perspiciatis,
              officiis magnam mollitia magni, libero maiores! Aliquam esse earum
              animi modi officiis tempore? Odio, quibusdam placeat ratione
              doloremque aspernatur aliquid id vero, iusto aliquam voluptas
              culpa consequatur. Voluptate blanditiis dolorum ducimus labore
              deleniti ullam ipsam.
            </p>
            <button
              onClick={() => {
                setDisableText(!disableText);
              }}
            >
              Показать больше{" "}
              <FaChevronDown
                className={disableText ? "fil_icon inactive" : "fil_icon"}
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Filter_product;
