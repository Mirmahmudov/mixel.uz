import React from 'react'
import "./Footer.css"
import { BiLogoTelegram } from "react-icons/bi";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer_box">
            <img src="/imgs/logo2.png" alt="" />
            <p>График работы колл-центра <br />
              Понедельник - Суббота: 9:00–18:00</p>
            <p className='scedhule'>Колл-центр: <br />
              + 998 (91) 344-44-68</p>
            <div className="logos">
              <div className="logo_box">
                <BiLogoTelegram />
              </div>
              <div className="logo_box">
                <FaInstagram />
              </div>
              <div className="logo_box">
                <FaFacebookF />
              </div>
              <div className="logo_box">
                <FaYoutube />
              </div>
            </div>
          </div>
          <div className="footer_uls">
            <ul>
              <p className='footer_title'>Категории</p>
              <li><a href="">Ноутбуки</a></li>
              <li><a href="">Игровые кресла</a></li>
              <li><a href="">Телефоны</a></li>
              <li><a href="">Моноблоки</a></li>
              <li><a href="">Модули памяти</a></li>
            </ul>
            <ul>
              <p className='footer_title'>Общее</p>
              <li><a href="">Новости</a></li>
              <li><a href="">О нас</a></li>
              <li><a href="">Наши магазины</a></li>
              <li><a href="">Политика конфиденциальности</a></li>
              <li><a href="">Правила программы лояльности</a></li>
              <li><a href="">Контакты</a></li>
            </ul>
            <ul>
              <p className='footer_title'>Покупателям</p>
              <li><a href="">Покупка в рассрочку</a></li>
              <li><a href="">Доставка и оплата</a></li>
              <li><a href="">Правила покупок с cashback</a></li>
              <li><a href="">Возврат / Обмен</a></li>
              <li><a href="">Правила пользования купонами</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer