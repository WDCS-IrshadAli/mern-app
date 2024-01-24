import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from './CartContext'
import useAxiosFetch from './useAxiosFetch'

const Header = () => {
  const dispatch = useCart();
  const { data, isLoading, isError } = useAxiosFetch("https://dummyjson.com/products");
  console.log(data, isLoading, isError);

  

  
  return (
    <>
        {
          isLoading && <h1 className="p-4 text-4xl">Loading...</h1>
        }
        {
          !isLoading && isError && <h1 className="p-4 text-4xl">{isError}</h1>
        }
        {
          !isLoading && !isError && <h1 className="p-4 text-4xl"> dataa</h1>
        }
        <div className="flex flex-row bg-black text-white p-2 justify-between">
            <div></div>
            <div><Link to="/">HOME</Link></div>
            <div className="relative"><Link to="/cart">🛒CART🛒 &nbsp;&nbsp;</Link><span className="text-[10px] bg-red-800 w-6 h-6 absolute top-[-4px] right-[-4px] flex items-center justify-center rounded-[50%] font-semibold">{dispatch.length}</span></div>
        </div>
    </>
  )
}

export default Header
