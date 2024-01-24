import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <div className="flex flex-row bg-black text-white p-4 justify-evenly">
            <Link to="/" className="text-md">HOME</Link>
            {/* <Link to="/create-form" className="text-md">CREATE-FORM</Link> */}
            {/* <Link to="/show-form/:id" className="text-md">SHOW-FORM</Link> */}
            {/* <Link to="/abc" className="text-md">NOTFOUND</Link> */}
            {/* <Link to="/create-form-2.0" className="text-md">CREATE-FORM-2.0</Link> */}
        </div>

        <Outlet />
    </>
  )
}

export default Header
