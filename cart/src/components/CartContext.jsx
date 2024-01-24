import { createContext, useContext, useEffect, useReducer, useState } from "react";

const cartDataContext = createContext();
const cartReducerContext = createContext();

export const useCart = () => {
    return useContext(cartDataContext);
}

export const useCartReducer = () => {
    return useContext(cartReducerContext);
}

export default function CartContext ({ children }) {

    // const initialState = [];
    useEffect(() => {
      if (!localStorage.getItem("cartData")) {
        localStorage.setItem("cartData", JSON.stringify(initialState));
      }
    }, []);
    const initialState = JSON.parse(localStorage.getItem("cartData")) || [];

    const [state, dispatch] = useReducer(reducerFunc, initialState);
    // console.log(state);
    return (
        <cartDataContext.Provider value={state}>
            <cartReducerContext.Provider value={dispatch}>
                {children}
            </cartReducerContext.Provider>
        </cartDataContext.Provider>
    )
}

const reducerFunc = (state, action) => {

    switch(action.type) {
        case "addToCart":
          let { data, qty, addId, addMaxQty } = action.payload;
          let addedData;
          //---------- 2nd Method
          let flag = true;
          addedData = state.map((curElem, index) => {
            if (curElem.id === addId) {
              flag = false;
              let ifQty = (((parseInt(qty))+(parseInt(curElem.cartQty))) > addMaxQty) ? (addMaxQty) : ((parseInt(qty))+(parseInt(curElem.cartQty)));
              console.log(ifQty);
              let nwQtyAdd = {
                ...curElem,
                cartQty: ifQty
              }
              return nwQtyAdd;
            } else {
              return curElem;
            }
          });
          if (flag) {
            addedData = [ 
              ...state,            
              { ...data, cartQty: qty }
            ]
          }
          //---------- 2nd Method
          //---------- 1st Method
          // if (state.length < 1) {
          //   addedData = [ 
          //     ...state,            
          //     { ...data, cartQty: qty }
          //   ]
          // } else {
          //   let filterAddedData = state.filter((curElem) => curElem.id === addId ? curElem : "");
          //   if (filterAddedData.length < 1) {
          //     addedData = [ 
          //       ...state,            
          //       { ...data, cartQty: qty }
          //     ]
          //   } else {
          //     addedData = state.map((curElem, index) => {
          //       if (curElem.id === addId) {
          //         let ifQty = (((parseInt(qty))+(parseInt(curElem.cartQty))) > addMaxQty) ? (addMaxQty) : ((parseInt(qty))+(parseInt(curElem.cartQty)));
          //         console.log(ifQty);
          //         let nwQtyAdd = {
          //           ...curElem,
          //           cartQty: ifQty
          //         }
          //         return nwQtyAdd;
          //       } else {
          //         return curElem;
          //       }
          //     });
          //   }
          // }
          //---------- 1st Method
          console.log("added", addedData);
          localStorage.setItem("cartData", JSON.stringify(addedData));
          return addedData;
          
        
        case "deleteData":
          let { id } = action.payload;
          let delData = state.filter((curElem, index) => index!=id);
          localStorage.setItem("cartData", JSON.stringify(delData));
          console.log("deleted", delData);
          return delData;

        case "editData":
          let { ids, qtys } = action.payload;
          let editData = state.map((curElem, index) => index===ids ? {...curElem, cartQty: qtys} : curElem );
          localStorage.setItem("cartData", JSON.stringify(editData));
          return editData;

        case "clearCart":
          let clearCart = [];
          localStorage.setItem("cartData", JSON.stringify([]));
          return clearCart;
        
        default:
          console.log("Something went wrong... Please try later...");
    }   
}