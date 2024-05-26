import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";

function Cart_shop() {
  const [iconIsActive, setIconIsActive] = useState(false);
  return (
    <div
      style={{ paddingRight: "25px" }}
      className={iconIsActive ? "prod_cart_icon active" : "prod_cart_icon"}
    >
      <FaCartShopping
        className="prod_icons"
        onClick={() => {
          setIconIsActive(!iconIsActive);
        }}
      />
    </div>
  );
}

export default Cart_shop;
