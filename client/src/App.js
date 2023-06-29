
import './App.css';
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import PageNotFound from './pages/PageNotFound';
import './index.css'
import Register from './Components/Layout/auth/Register';
import Login from './Components/Layout/auth/Login';
import PrivateRoutes from './protectedroute/ProtectedRoute';
import AdminRoutes from './protectedroute/Adminprotected';
import Dashboard from './user/Dashboard';
import Forgot from './Components/Layout/auth/Forgot';
import AdminDashboard from './Admin/AdminDashboard';
import CreateCategory from './Admin/CreateCategory';
import CreateProduct from './Admin/CreateProduct';
import UserList from './Admin/UserList';
import Profile from './user/Profile';
import Order from './user/Order';
import ProductList from './Admin/ProductList';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="*" element={<PageNotFound />} />
      <Route Component={PrivateRoutes}>
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/order" element={<Order />} />
      </Route>

      <Route Component={AdminRoutes}>
    
      <Route path="/admin-dashboard" element={<AdminDashboard/>}/> 
      <Route path="/admin-dashboard/create-category" element={<CreateCategory/>}/> 
      <Route path="/admin-dashboard/create-product" element={<CreateProduct/>}/> 
      <Route path="/admin-dashboard/product-list" element={<ProductList/>}/>
      <Route path="/admin-dashboard/user" element={<UserList/>}/> 
     
      
      
      </Route>
    </Routes>
  );
}

export default App;
