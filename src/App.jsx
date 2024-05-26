import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Filter_product from "./pages/filter_product/Filter_product";
import Product from "./pages/product/Product";
import Favorites from "./pages/favorites/Favorites";
import Loader from "./components/loader/Loader";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import ShowProfile from "./components/showProfile/ShowProfile";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [cheapData, setCheapData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null)

  const getUser = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://ecommerce0003.pythonanywhere.com/user/retrieve/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if(result.username){
          setUser(result)
        }else{
          setUser(null)
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(()=>{
    getUser()
  }, [token])
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [modalVisible3, setModalVisible3] = useState(false)
  const toggleModal3 = () => {
    setModalVisible3(!modalVisible3);
  };

  return (
    <>
      <BrowserRouter>
        {loader && <Loader />}
        <Login
          setToken={setToken}
          toggleModal={toggleModal}
          setModalVisible={setModalVisible}
          visible={modalVisible}
          setUser={setUser}
        />
        <ShowProfile 
          toggleModal3={toggleModal3}
          setModalVisible3={setModalVisible3}
          visible3={modalVisible3}
          user={user}
        />
        <Navbar
          toggleModal3={toggleModal3}
          cheapData={cheapData}
          toggleModal={toggleModal}
          setSearch={setSearch}
          user={user}
        />
        <Routes>
          <Route path={"/"} element={<Home setLoader={setLoader} />} />
          <Route
            path={"/product/:id"}
            element={
              <Product
                cheapData={cheapData}
                setCheapData={setCheapData}
                setLoader={setLoader}
              />
            }
          />
          <Route
            path={"/products/:type"}
            element={<Filter_product search={search} setLoader={setLoader} />}
          />
          <Route
            path={"/favorites"}
            element={<Favorites favorites={favorites} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
