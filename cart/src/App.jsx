import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './components/Home';
import Cart from './components/Cart';
import Header from './components/Header';
import { useEffect, useState } from 'react';

function App() {

  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(null);
  // const [data, setData] = useState("9");
  // useEffect(() => {
  //   setData(Math.random())
  // }, [data])
  

  useEffect(() => {
    setLoading(true)
    const loginUser = () => {
      setTimeout(() => {
        setAdmin(true);
        setLoading(false);
      }, 2000);
    }
    loginUser();
  }, []);

  const adminDashBoard = (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
    </Router>
  )

  const userDashBoard = (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
    </Router>
  )
  if (loading) {
    return <h1 className="p-5 text-5xl">LOADINkkG...</h1>
  }

  return (
    <>
      {
        admin===true ? adminDashBoard : admin===false ? userDashBoard : <h1 className="p-5 text-5xl">LOADING...</h1>
      }    
    </>
  )
}

export default App
