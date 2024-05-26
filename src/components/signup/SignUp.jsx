import { useState, useEffect } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

function SignUp({ setToken, toggleModal2, visible2, toggleModal, setModalVisible2 }) {
  const modalStyle = {
    right: visible2 ? "0px" : "-16000px",
  };

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [address, setAddress] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [city, setCity] = useState()

  const useSignUp = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: userName,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      city: city,
      address: address,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://ecommerce0003.pythonanywhere.com/user/register/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        toggleModal2()
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="container2">
        <div className="panel">
          <h1>Sign Up</h1>
          <div onClick={toggleModal2} className="x-icon">
            <IoCloseSharp className="icon" />
          </div>
          <form onSubmit={(e)=>{
            e.preventDefault()
          }} className="panel_form" action="">
            <input onChange={(e)=>{
              setEmail(e.target.value)
            }} className="panel_input1" type="email" placeholder="Email" />
            <input onChange={(e)=>{
              setUserName(e.target.value)
            }} className="panel_input1" type="text" placeholder="Username" />
            <input
              onChange={(e)=>{
                setFirstName(e.target.value)
              }}
              className="panel_input1"
              type="text"
              placeholder="First Name"
            />
            <input
              onChange={(e)=>{
                setLastName(e.target.value)
              }}
              className="panel_input1"
              type="text"
              placeholder="Last Name"
            />
            <input
              onChange={(e)=>{
                setPhoneNumber(e.target.value)
              }}
              className="panel_input1"
              type="text"
              placeholder="Phone Number"
            />
            <input onChange={(e)=>{
              setAddress(e.target.value)
            }} className="panel_input1" type="text" placeholder="Address" />
            <input onChange={(e)=>{
              setCity(e.target.value)
            }} className="panel_input1" type="text" placeholder="City" />
            <input
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              className="panel_input1"
              type="text"
              placeholder="Password"
            />
            <p>
              Already Signed Up?
              <Link
                onClick={() => {
                  setModalVisible2(false);
                  toggleModal();
                }}
              >
                Log in
              </Link>{" "}
              then
            </p>
            <button onClick={()=>{
              useSignUp()
            }} className="panel_btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
