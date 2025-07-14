import { useState } from 'react'
import {BrowserRouter as Router, Route,  Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Cart from './pages/Cart'
 import AddProduct from './components/AddProduct';
import ProtectedRoute from './components/ProtectedRoute'
import MyOrders from './components/Myorders'
import AllUsers from './pages/Users'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      
      <Navbar />
      <Routes>
       

<Route
  path="/add-product"
  element={
    <ProtectedRoute role="SELLER">
      <AddProduct />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-orders"
  element={
    <ProtectedRoute role="CUSTOMER">
      <MyOrders />
    </ProtectedRoute>
  }
/>
<Route
  path="/users"
  element={<AllUsers />
  }
/>


        <Route  path="/" element={<Login />} />
         <Route  path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route
  path="/cart"
  element={
    <ProtectedRoute role="CUSTOMER">
      <Cart />
    </ProtectedRoute>
  }/>
  </Routes>
    </Router>
  )
}

    <>
     
  
    </>
  

export default App
