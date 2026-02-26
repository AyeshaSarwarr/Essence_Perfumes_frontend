import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Products from "./pages/Products.jsx"
import Contact from "./pages/Contact.jsx"
import Checkout from "./pages/Checkout/[id]/Checkout.jsx" 
import Thankyou from "./pages/Thankyou.jsx"
import Cart from "./pages/Cart.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"  element={<App/>}>
        <Route path=""  element={<Home/>}/>
        <Route path="about"  element={<About/>}/>
        <Route path="Collection"  element={<Products/>}/>
        <Route path="contact"  element={<Contact/>}/>
        <Route path="Checkout/:id?"  element={<Checkout/>}/>
        <Route path="thankyou"  element={<Thankyou/>}/>
        <Route path="cart"  element={<Cart/>}/>
        <Route path="login"  element={<Login/>}/>
        <Route path="signup"  element={<Signup/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
