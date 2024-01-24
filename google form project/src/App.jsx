import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './pages/Home';
import CreateForm from './pages/CreateForm';
import ShowForm from './pages/ShowForm';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import CreateForm2 from './pages/CreateForm2';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header />} >
            <Route index element={<Home />} />
            {/* <Route path="create-form" element={<CreateForm />}  /> */}
            <Route path="create-form-2.0" element={<CreateForm2 />}  />
            <Route path="show-form/:id" element={<ShowForm />}  />
            <Route path="*" element={<NotFound />}  />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
