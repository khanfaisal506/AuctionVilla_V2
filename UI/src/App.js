import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/HeaderComponent/Header.js';
import Home from './components/HomeComponent/Home.js';
import Service from './components/Services/Services.js';
import Login from './components/LoginComponent/Login.js';
import Feature from './components/FeatureComponent/Feature.js';
import Feedback from './components/FeedbackComponent/Feedback.js';
import Brand from './components/BrandComponent/Brand.js';
import Contact from './components/ContactComponent/Contact.js';
import Search from './components/SearchComponent/Search.js';
import Register from './components/RegisterComponent/Register.js';
import AdminHome from './components/AdminHomeComponent/AdminHome.js';
import UserHome from './components/UserHomeComponent/UserHome.js';
import Logout from './components/LogoutComponent/Logout.js';
import ManageUser from './components/ManageUsersComponent/ManageUser.js';
import CpAdmin from './components/CpAdminComponent/CpAdmin.js';
import EpAdmin from './components/EpAdminComponent/EpAdmin.js';
import CpUser from './components/CpUserComponent/CpUser.js';
import EpUser from './components/EpUserComponent/EpUser.js';
import AddCategory from './components/AddCategoryComponent/AddCategory.js';
import AddSubCategory from './components/AddSubCategoryComponent/AddSubCategory.js';
import ViewProductCategory from './components/ViewProductCategoryComponent/ViewProductCategory.js';
import ViewProductSubCategory from './components/ViewProductSubCategoryComponent/ViewProductSubCategory.js';
import AddProduct from './components/AddProductComponent/AddProduct.js';
import ViewProductComponent from './components/ViewProductComponent/ViewProductComponent';
import Bidproduct from './components/BidproductComponent/Bidproduct.js';
import Viewbid from './components/ViewbidComponent/Viewbid.js';
import ViewbidProduct from './components/ViewbidProductComponent/ViewbidProduct.js';
import Verifyuser from './components/VerifyuserComponent/Verifyuser.js';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:email" element={<Verifyuser />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/manageuser" element={<ManageUser />} />
        <Route path="/cpadmin" element={<CpAdmin />} />
        <Route path="/epadmin" element={<EpAdmin />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/viewpc" element={<ViewProductCategory />} />
        <Route path="/viewpsc/:catnm" element={<ViewProductSubCategory />} />
        <Route path="/viewp/:subcatnm" element={<ViewProductComponent />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/cpuser" element={<CpUser />} />
        <Route path="/epuser" element={<EpUser />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/addsubcategory" element={<AddSubCategory />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/bidp/:_id" element={<Bidproduct />} />
        <Route path="/viewbid/:p_id" element={<Viewbid />} />
        <Route path="/viewbidproduct" element={<ViewbidProduct />} />
      </Routes>
      <Contact />
    </>
  );
}

export default App;
