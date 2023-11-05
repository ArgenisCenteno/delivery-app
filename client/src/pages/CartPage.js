import React  from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom"; 
import {FaCcPaypal, FaCcMastercard, FaCcVisa} from "react-icons/fa"   
import {BsCash} from "react-icons/bs"
import {FaTrash,FaLongArrowAltLeft } from "react-icons/fa"
import {BiUserCheck } from "react-icons/bi"
import {MdMarkEmailRead} from "react-icons/md"
import "../styles/CartStyles.css";
 
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
   
  const navigate = useNavigate();
  //CALCULAR EL TOTAL 
  const SubtotalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        const itemTotal = item.precio * item.quantity;
        total += itemTotal;
      });
     
     
      return total.toLocaleString();
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrice = () => {
    try {
      let total = 0; 
      cart?.map((item) => {
        const itemTotal = item.precio * item.quantity;
        total += itemTotal;
        
      });
      const subtotal = total * 1.16
      return subtotal.toLocaleString();
    } catch (error) {
      console.log(error);
    }
  };
  //REMOVER PRODUCTO
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

   
  
  return (
    <Layout style={{width: "100vw"}}>
     <section className="h-100 h-custom" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
  <div className="card">
    <div className="card-body p-4">
      <div className="row">
        <div className="col-lg-7">
          <h5 className="mb-3">
            <Link to="/" className="text-body" style={{ textDecoration: "none" }}>
              < FaLongArrowAltLeft className="me-2"/> Continuar comprando
            </Link>
          </h5>
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <p className="mb-1"><strong>Carrito de compras</strong></p>
              <p className="mb-0">¡Actualmente tienes {cart.length} productos en el carrito!</p>
            </div>
          </div>
          {cart.map((p, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <div>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="img-fluid rounded-3"
                        alt="Shopping item"
                        style={{ width: '65px' }}
                      />
                    </div>
                    <div className="ms-3">
                      <h5>{p.nombre}</h5>
                      <p className="small mb-0">{p.descripcion}</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <div style={{ width: '50px' }}>
                      <h5 className="fw-normal mb-0">{p.quantity}</h5>
                    </div>
                    <div style={{ width: '80px' }}>
                      <h5 className="mb-0">Bs {p.precio}</h5>
                    </div>
                     
                    <button
               className="btn "
               onClick={() => removeCartItem(p._id)}
              >
                < FaTrash style={{ color: '#cecece' }}/> 
            </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
     

                  <div className="col-lg-5">
                  <div className="card bg-success text-white rounded-3">
  <div className="card-body">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h5 className="mb-0">Información de compra</h5>
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
        className="img-fluid rounded-3"
        style={{ width: '45px' }}
        alt="Avatar"
      />
    </div>
    <p className="small mb-2">Aceptamos</p>
    <FaCcPaypal style={{fontSize: "40px", marginRight: "4px"}}/>
    <FaCcMastercard style={{fontSize: "40px",  marginRight: "4px"}}/>
    <FaCcVisa style={{fontSize: "40px",  marginRight: "4px"}}/>
    <BsCash style={{fontSize: "40px",  marginRight: "4px"}}/> 
    
    <form className="mt-4">
      <div className="form-outline form-white mb-4">
         
        <h5 className="form-label" htmlFor="typeName">
       <BiUserCheck className="mr-4"/>  
        {!auth?.user
                    ? "Inicia sesión" 
                   : `${auth?.token && auth?.user?.name}`}
        </h5>
      </div>
      <div className="form-outline form-white mb-4">
         
        <h5 className="form-label" htmlFor="typeText">
          <MdMarkEmailRead className="mr-4"/>
        {!auth?.user
                    ? "Inicia sesión" 
                   : `${auth?.token && auth?.user?.email}`}
        </h5>
      </div>
      
    </form>
    <hr className="my-4" />
    <div className="d-flex justify-content-between">
      <p className="mb-2">Subtotal</p>
      <p className="mb-2">Bs {SubtotalPrice()}</p>
    </div>
    <div className="d-flex justify-content-between">
      <p className="mb-2">IVA</p>
      <p className="mb-2">16%</p>
    </div>
    <div className="d-flex justify-content-between mb-4">
      <p className="mb-2">Total </p>
      <p className="mb-2">Bs {totalPrice()}</p>
    </div>
    {auth?.user ? (
  <div className="mb-3">
    {cart.length > 0 ? (
      <button
      className="btn btn-primary"
      onClick={() => navigate("/checkout")}
    >
      Checkout
    </button>
    ) : (
      <button className="btn btn-primary" disabled>
        Checkout
      </button>
    )}
  </div>
) : (
  <div className="mb-3">
    {auth?.token ? (
      <button
        className="btn btn-success"
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    ) : (
      <>
        <button
          className="btn btn-dark mb-2"
          onClick={() =>
            navigate("/login", {
              state: "/cart",
            })
          }
        >
          Inicia sesión para completar tu pedido
        </button>
      </>
    )}
  </div>
)}

</div>

</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default CartPage;
