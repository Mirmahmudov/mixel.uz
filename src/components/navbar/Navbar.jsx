import { useState, useEffect  } from "react";
import "./Navbar.css";
import { CiLocationOn, CiHeart, CiSearch } from "react-icons/ci";
import { TiMicrophoneOutline } from "react-icons/ti";
import { FiUser, FiShoppingCart, FiPhone, FiUserCheck } from "react-icons/fi";
import { PiScales } from "react-icons/pi";
import { TfiList } from "react-icons/tfi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

function Navbar({user, setSearch, toggleModal3, toggleModal, cheapData}) {
  const navigate = useNavigate()
  const handleSelect = (e)=>{
    navigate(e.target.value);
  }
  const {pathname} = useLocation()

  const [selectValue, setSelectValue] = useState("/products/all")

  useEffect(()=>{
    setSelectValue(pathname)
  }, [pathname])

  return (
    <>
      <nav className="nav_top">
        <div className="container">
          <ul>
            <li>
              <a href="" className="loc">
                <CiLocationOn className="loc_icon" />
                Ташкент
              </a>
            </li>
            <li>
              <a href="">Наши магазины</a>
            </li>
            <li>
              <a href="">B2B продажи</a>
            </li>
            <li>
              <a href="">Покупка в рассрочку</a>
            </li>
            <li>
              <a href="">Способы оплаты</a>
            </li>
            <li>
              <a href="">Гарантия на товары</a>
            </li>
          </ul>
          <div className="nav_top_info">
            <p className="nav_num">
              <FiPhone />
              +998 91 344 44 68
            </p>
            <select name="" id="">
              <option value="">Рус</option>
              <option value="">O`zb</option>
              <option value="">Eng</option>
            </select>
          </div>
        </div>
      </nav>
      <nav className="nav_center">
        <div className="container">
          <div className="logo">
            <NavLink to={"/"}>
              <img src="/imgs/logo.png" alt="" />
            </NavLink>
          </div>
          <form action="">
            <select value={selectValue} onChange={handleSelect} name="" id="">
              <option value={"/products/all"}>Все категории</option>
              <option value={"/products/monoblocks"}>Моноблоки</option>
              <option value={"/products/phones"}>Телефоны, планшеты</option>
              <option value={"/products/laptops"}>Ноутбуки</option>
              <option value={"/products/accessories"}>Комплектующие</option>
              <option value={"/products/networks"}>Сетевое оборудование</option>
              <option value={"/products/equipments"}>Оргтехника</option>
            </select>
            <div className="nav_inp">
              <input onChange={(e)=>{
                if(pathname == "/"){
                  navigate("/products/all")
                }else if(pathname == `/product/${cheapData.id}`){
                  navigate("/products/all")
                }
                setSearch(e.target.value)
                }} type="text" placeholder="Телефоны и бытовая" />
              <TiMicrophoneOutline className="micro" />
            </div>
            <button>
              <CiSearch className="nav_search" />
              Поиск
            </button>
          </form>
          <div className="nav_center_info">
            {
              user ? <div onClick={toggleModal3} className="nav_box">
                {/* <FiUser className="nav_box_icons" /> */}
                <FiUserCheck className="nav_box_icons" />

                <p>профиль</p>
              </div> :
              <div onClick={toggleModal} className="nav_box">
                <FiUser className="nav_box_icons" />
                <p>Войти</p>
              </div>
            }
            <div className="nav_box">
              <PiScales className="nav_box_icons" />
              <p>Сравнение</p>
              <span className="nav_counter">0</span>
            </div>
            <Link to={"/favorites"}>
              <div className="nav_box">
                <CiHeart className="nav_box_icons" />
                <p>Избранное</p>
                <span className="nav_counter nav_counter1">0</span>
              </div>
            </Link>
            <div className="nav_box">
              <FiShoppingCart className="nav_box_icons" />
              <p>Корзина</p>
              <span className="nav_counter nav_counter2">0</span>
            </div>
          </div>
        </div>
      </nav>
      <nav className="nav_bottom">
        <div className="container">
          <button className="btn">
            <TfiList className="nav_list_icon" />
            Категории
          </button>
          <ul>
            <li>
              <NavLink to={"/products/all"}>Наши магазины</NavLink>
            </li>
            <li>
              <NavLink to={"/products/monoblocks"}>Моноблоки</NavLink>
            </li>
            <li>
              <NavLink to={"/products/phones"}>
                Телефоны, планшеты
              </NavLink>
            </li>
            <li>
              <NavLink to={"/products/laptops"}>Ноутбуки</NavLink>
            </li>
            <li>
              <NavLink to={"/products/accessories"}>Комплектующие</NavLink>
            </li>
            <li>
              <NavLink to={"/products/networks"}>
                Сетевое оборудование
              </NavLink>
            </li>
            <li>
              <NavLink to={"/products/equipments"}>Оргтехника</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
