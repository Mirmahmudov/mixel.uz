import { useState } from "react";
import { FaHeart } from "react-icons/fa";

function Cart_heart() {
  const [iconIsActive2, setIconIsActive2] = useState(false);
  return (
    <div
      style={{ paddingRight: "25px" }}
      className={iconIsActive2 ? "prod_heart_icon active" : "prod_heart_icon"}
    >
      <FaHeart
        className="prod_icons"
        onClick={() => {
          setIconIsActive2(!iconIsActive2);
        }}
      />
    </div>
  );
}

export default Cart_heart;
