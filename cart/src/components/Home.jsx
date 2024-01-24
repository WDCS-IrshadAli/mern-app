import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartReducer } from './CartContext'

export default function Home () {
    const data = {
        "products": [
            {
                id: 1,
                name: "Air Max",
                category: "shoes",
                price: 200001,
                qty: 200,
                brand: "Nike",
                description: "The Nike Air Max is a stylish and comfortable athletic shoe suitable for various activities.",
                image_url: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                id: 2,
                name: "Ultra Boost",
                category: "shoes",
                price: 10000,
                qty: 150,
                brand: "Adidas",
                description: "Adidas Ultra Boost offers responsive cushioning and a lightweight feel, perfect for running and casual wear.",
                image_url: "https://images.unsplash.com/photo-1554735490-5974588cbc4f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                id: 3,
                name: "RS-X",
                category: "shoes",
                price: 1500,
                qty: 180,
                brand: "Puma",
                description: "Puma RS-X combines retro style with modern comfort, making it a versatile sneaker for everyday use.",
                image_url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                id: 4,
                name: "Zoom Pegasus",
                category: "shoes",
                price: 2500,
                qty: 120,
                brand: "Nike",
                description: "Nike Zoom Pegasus provides responsive cushioning and a breathable upper, ideal for running enthusiasts.",
                image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8"
              },
              {
                id: 5,
                name: "Chuck Taylor",
                category: "shoes",
                price: 90000,
                qty: 250,
                brand: "Nike",
                description: "Converse Chuck Taylor is a classic and timeless sneaker that never goes out of style.",
                image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                id: 10,
                name: "Gel-Kayano",
                category: "shoes",
                price: 8000,
                qty: 170,
                brand: "Adidas",
                description: "ASICS Gel-Kayano offers stability and support, making it an excellent choice for long-distance running.",
                image_url: "https://images.unsplash.com/photo-1665517464780-ab4f42d8af95?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                id: 6,
                name: "Classic Leather",
                category: "shoes",
                price: 20000,
                qty: 200,
                brand: "Reebok",
                description: "Reebok Classic Leather is a timeless sneaker known for its comfort and casual style.",
                image_url: "https://images.unsplash.com/photo-1609535766154-e47e5aa87789?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                id: 7,
                name: "Air Force 1",
                category: "shoes",
                price: 1000,
                qty: 180,
                brand: "Nike",
                description: "Nike Air Force 1 is an iconic sneaker with a classic design, perfect for streetwear fashion.",
                image_url: "https://images.unsplash.com/photo-1661192198481-e0859ac96860?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                id: 8,
                name: "Gazelle",
                category: "shoes",
                price: 70000,
                qty: 150,
                brand: "Adidas",
                description: "Adidas Gazelle is a classic sneaker with a sleek and streamlined design, suitable for everyday wear.",
                image_url: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
              },
              {
                id: 9,
                name: "Sk8-Hi",
                category: "shoes",
                price: 60000,
                qty: 160,
                brand: "Reebok",
                description: "Vans Sk8-Hi is a classic high-top sneaker known for its durability and skateboarding heritage.",
                image_url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
              }
        ]
    }
    const dispatch = useCartReducer();
    let uniqueCatData = data.products.map((curElem) => curElem.brand).filter((c,i,cv) => cv.indexOf(c)===i);
    // console.log(uniqueCatData);

    const [datas, setDatas] = useState(data);
    const [input, setInput] = useState("");
    const filterData = (brand) => {
      // console.log(brand);
      let newData = {"products": data.products.filter((curElem) => curElem.brand === brand)};
      setDatas(newData)
      // console.log(newData); 
    }

    const handleChange = (e) => {
      setInput(e.target.value);
      console.log(input);
    }

    let searchData = {"products": datas?.products?.filter((curElem) => 
        curElem.name.toLowerCase().includes(input.toLowerCase())
    )};

  return (
    <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-10 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
                    
                    {

                      uniqueCatData.map((curElem, index) => {
                        return (
                          <button key={index} onClick={() => filterData(curElem)} className="p-1 border border-black">{curElem}</button>
                        )
                      })
                    }
                    <button onClick={() => setDatas(data)} className="p-1 border border-black">All</button>
                    <button onClick={() => {
                      let sortData = {"products": datas.products.sort((a,b)=>a.price-b.price)};
                      setDatas(sortData)
                    }} className="p-1 border border-black">Low to high</button>
                    <button onClick={() => {
                      let sortData = {"products": datas.products.sort((a,b)=>b.price-a.price)};
                      setDatas(sortData)
                    }} className="p-1 border border-black">High to low</button>
                    <input type="text" name="search" placeholder="search" onChange={handleChange}  />
                    
                    {
                      searchData.products.length < 1 ?
                      <h1 className="text-2xl p-2">NO DATA</h1>
                      :
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-8">
                        {
                            searchData.products.map((curElem, index) => {
                                return (
                                      <DataShow key={index} index={index} curElem={curElem} dispatch={dispatch} />
                                  )
                            })
                        }
                      </div>
                    }
                    
                    
                </div>
            </div>

    </>
  )
}

function DataShow ({ index, curElem, dispatch }) {
  const [input, setInput] = useState(1);
  return (
    <div key={index}>
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-900 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img src={curElem.image_url} alt={curElem.name} className="h-80 w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
              <h3 className="text-sm text-gray-700">
                <Link to="#">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    {curElem.name}
                </Link>
              </h3>
              <p className="mt-1 text-[12px] font-semibold text-gray-500">{curElem.category.toUpperCase()} / {curElem.brand.toUpperCase()}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">${curElem.price}</p>
        </div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if(input>0 && input<=curElem.qty) {
          dispatch({ type: "addToCart", payload: {data: curElem, qty: input, addId: curElem.id, addMaxQty: curElem.qty } })                              
          alert("Add to cart successfully");
        } else {
          alert("Qty should be greater than 1 & less than max qty")
        }
      }} className="flex flex-row justify-center items-center">
        <input
          type="number"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          name="qty" className="w-[50%] text-[12px] pb-2 px-2 pt-2 mb-[-8px] border border-black rounded-md" placeholder="Qty" />
        <button 
          disabled={input===0}
          type="submit" className="w-[50%] text-[12px] font-semibold border border-black p-1 flex flex-row justify-center rounded-md py-2 mt-2">Add To Cart</button>
      </form>
    </div>
  )
}