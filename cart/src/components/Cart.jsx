import React, { useState } from 'react'
import { useCart, useCartReducer } from './CartContext'

const Cart = () => {
  const dispatch = useCart();
  const dispatchReducer = useCartReducer();
  console.log(dispatch, "aa");
  return (
    <div className="py-5 px-3">
      {
        dispatch.length === 0 ?
        <h1 className="p-4 text-2xl">NO RECORDS FOUND</h1>
        :
        dispatch.map((curElem, index) => {
          return (
            <CartData key={index} curElem={curElem} index={index} dispatchReducer={dispatchReducer} />
          )
        })
      }
      <button onClick={() => dispatchReducer({ type: "clearCart" })}>Clear Cart</button>
    </div>
  )
}

export default Cart

function CartData ({ index, curElem, dispatchReducer }) {
  const [input, setInput] = useState(1);
  return (
    <div className="flex flex-row rounded-md pb-4" key={index}>
        <div>
          <img src={curElem.image_url} alt={curElem.name} className="w-36 h-36 object-cover rounded-md" />
        </div>
        <div className="flex flex-col pl-3 text-sm w-full justify-evenly">
          <div className="flex flex-row justify-between items-center w-full">
            <span>Name: <span className="text-gray-500 font-semibold">{curElem.name}</span></span>
            <span>Brand: <span className="text-gray-500 font-semibold">{curElem.brand}</span></span>
            <span>Price: <span className="text-gray-500 font-semibold">{curElem.price}</span></span>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <span>Max Qty: <span className="text-gray-500 font-semibold">{curElem.qty}</span></span>
            <span>Qty: <span className="text-gray-500 font-semibold">{curElem.cartQty}</span></span>
            <span>Total Price: <span className="text-gray-500 font-semibold">{curElem.cartQty * curElem.price}</span></span>
          </div>
          <div>
          <button onClick={() => dispatchReducer({ type: "deleteData", payload: {id: index} })}>Delete</button>
          <form onSubmit={(e) => {
            e.preventDefault();
            if(input>0 && input<=curElem.qty) {
              dispatchReducer({ type: "editData", payload: {ids: index, qtys: input} })
              alert("Cart edited successfully");
            } else {
              alert("Qty should be greater than 1 & less than max qty")
            }
          }}
          >              
            <input type="number" name="" id="" placeholder="qty" onChange={(e) => setInput(e.target.value)} />
            <button type="submit">Edit</button>
          </form>
          </div>
        </div>
    </div>
  )
}