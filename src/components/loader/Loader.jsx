import React from 'react'
import "./Loader.css"

function Loader() {
  return (
    <div className="main_modal">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader