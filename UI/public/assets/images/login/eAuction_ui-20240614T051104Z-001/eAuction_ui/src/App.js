import './App.css';
import { Routes , Route } from 'react-router-dom';

import Header from './components/HeaderComponent/Header';
import Banner from './components/BannerComponent/Banner';
import Home from './components/HomeComponent/Home';
import About from './components/AboutComponent/About';
import Contact from './components/ContactComponent/Contact';
import Service from './components/ServiceComponent/Service';
import Register from './components/RegisterComponent/Register';
import Login from './components/LoginComponent/Login';
import Footer from './components/FooterComponent/Footer';

function App() {

  return (
    <>

      <Header />

      <Banner />

      <Routes>
      <Route path="/" element={<Home />} ></Route>
      <Route path="/about" element={<About />} ></Route>
      <Route path="/contact" element={<Contact />} ></Route>
      <Route path="/service" element={<Service />} ></Route>
      <Route path="/register" element={<Register />} ></Route>
      <Route path="/login" element={<Login />} ></Route>
      </Routes>      

      <Footer />

    </>
  );
}

export default App;
