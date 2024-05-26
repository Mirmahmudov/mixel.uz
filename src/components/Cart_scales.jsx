import { useState } from "react";
import { RiScalesFill } from "react-icons/ri";

function Cart_scales() {
  const [iconIsActive3, setIconIsActive3] = useState(false);
  return (
    <div
      className={iconIsActive3 ? "prod_scales_icon active" : "prod_scales_icon"}
    >
      {" "}
      <RiScalesFill
        className="prod_icons"
        onClick={() => {
          setIconIsActive3(!iconIsActive3);
        }}
      />
    </div>
  );
}

export default Cart_scales;
