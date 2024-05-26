import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import "./ShowProfile.css";

function ShowProfile({ user, toggleModal3, setModalVisible3, visible3 }) {
  const modalStyle = {
    right: visible3 ? "0px" : "-16000px",
  };
  return (
    <div className="modal" style={modalStyle}>
      <div className="container2" style={{ maxWidth: "900px" }}>
        <div className="panel" style={{ width: "900px", padding: "30px15px" }}>
          <div onClick={toggleModal3} className="x-icon">
            <IoCloseSharp className="icon" />
          </div>
       
          <div className="container user_modal ">
            <div className="form register_form ">
              <div>
                <div className="form_left">
                  <h3>First Name</h3>
                  <input
                    value={user?.first_name}
                    type="text"
                    placeholder="Name"
                    disabled
                  />
                  <h3>Last Name</h3>
                  <input
                    value={user?.last_name}
                    type="text"
                    placeholder="Login"
                    disabled
                  />
                  <h3>Username</h3>
                  <input
                    value={user?.username}
                    type="text"
                    placeholder="Login"
                    disabled
                  />
                  <h3>Number</h3>
                  <input
                    value={user?.phone_number}
                    type="text"
                    placeholder="Mobile number"
                    disabled
                  />
                </div>
                <div className="form_right">
                  <h3>Email</h3>
                  <input
                    value={user?.email}
                    type="text"
                    placeholder="Enter your email"
                    disabled
                  />
                  <h3>Password</h3>
                  <input
                    value={user?.password}
                    type="text"
                    placeholder="Enter your password"
                    disabled
                  />
                  <h3>City</h3>
                  <input
                    // value={`${user?.city.name}, ${user?.city.region.name}`}
                    type="text"
                    placeholder="Living area"
                    disabled
                  />
                  <h3>Address</h3>
                  <input
                    value={user?.address}
                    type="text"
                    placeholder="Your address"
                    disabled
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  setLoading(true);
                  localStorage.clear();
                  setToken(null);
                  setLoading(false);
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowProfile;
