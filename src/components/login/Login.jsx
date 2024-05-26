import "./Login.css";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./../signup/SignUp";

function Login({setUser, setToken, toggleModal, visible, setModalVisible }) {
  const modalStyle = {
    right: visible ? "0px" : "-16000px",
  };
  const [modalVisible2, setModalVisible2] = useState(false);

  const toggleModal2 = () => {
    setModalVisible(false);
    setModalVisible2(!modalVisible2);
  };

  const [userLogin, setUserLogin] = useState()
  const [userPassword, setUserPassword] = useState()


  const getToken = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: userLogin,
      password: userPassword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://ecommerce0003.pythonanywhere.com/token/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.access){
          setToken(result.access)
          localStorage.setItem("token", result.access )
          setModalVisible(false)
          setUserLogin("")
          setUserPassword("")
        }else{
          alert("malumot yo'q")
        }
      })
      .catch((error) => console.error(error));
  };
  
  return (
    <div className="modal" style={modalStyle}>
      <SignUp
        setModalVisible2={setModalVisible2}
        toggleModal={toggleModal}
        toggleModal2={toggleModal2}
        visible2={modalVisible2}
        setUser={setUser}
      />
      <div className="container2">
        <div className="panel panel2">
          <h1>Login</h1>

          
          <div onClick={toggleModal} className="x-icon">
            <IoCloseSharp className="icon" />
          </div>
          <form onSubmit={(e)=>{
            e.preventDefault()
          }} className="panel_form" action="">
            <input onChange={(e)=>{
              setUserLogin(e.target.value)
            }} className="panel_input1" type="text" placeholder="Login" />
            <input onChange={(e)=>{
              setUserPassword(e.target.value)
            }}
              className="panel_input1"
              type="password"
              placeholder="Password"
            />
            <p>
              New to Mixel? <Link onClick={toggleModal2}>Sign Up</Link> now!
            </p>
            <button onClick={()=>{
              getToken()
            }} className="panel_btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
