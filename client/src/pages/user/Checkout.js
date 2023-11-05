import React, { useState, useEffect } from 'react';
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout.js";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'; 
import {TbTruckDelivery} from "react-icons/tb"
const initialState = { 
  municipio: 'Ezequiel Zamora',
  parroquia: '',
  zona: '',
  calle: '',
  casa: '',
  tipoEntrega: '',
  telefono: '',
  costo: 0,
  indicaciones: ''
};

const Checkout = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isFormComplete, setIsFormComplete] = useState(false);

 
  useEffect(() => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      navigate("/login");
      toast.error("Debe iniciar sesión para hacer checkout");
    }
  }, [navigate]);

  
  useEffect(() => {
    // Obtener el carrito del localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    // Verificar si el carrito está vacío
    if (cartItems.length === 0) {
      navigate("/cart");
      toast.error("Agregue productos a su carrito");
    }
  }, [navigate]);
 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
     
    });
    console.log(formData)
  };

 

  const userId =  auth?.user?._id

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
  
    try {  
      setLoading(true);
      const { data } = await axios.post("/api/v1/product/create-order", { 
        cart, 
        formData, 
        userId
      });  
      
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Orden iniciada");
      
      setLoading(false);
    // Redireccionar a la ruta de la orden completada
      navigate(`/dashboard/user/order/${data.order._id}`);
      
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Verificar si todos los campos requeridos están completos
  useEffect(() => {
    const {  municipio, parroquia,  zona, calle, casa, telefono, costo, indicaciones } = formData;
    setIsFormComplete( 
      municipio !== '' &&
      parroquia !== '' &&
      zona !== '' &&
      calle !== '' &&
      casa !== '' &&
      telefono !== ''&&
      costo !== '' &&
      indicaciones !== '' &&
      telefono.length  == 11

    );
  }, [formData]);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    if (value === "Delivery") {
      setFormData({
        ...formData,
        [name]: value,
        costo: 5,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        costo: 0,
      });
    }
  };
  

  return (
    <Layout>
   <div className="container py-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col">
          <div className="card my-4 shadow-3">
            <div className="row g-0">
              <div className="col-xl-6 d-xl-block bg-image">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Others/extended-example/delivery.webp"
                  alt="Sample photo"
                  className="img-fluid"
                />
              </div>
              <div className="col-xl-6">
                <div className="card-body p-md-5 text-black">
                  <h3 className="mb-4 text-uppercase">Información de entrega <TbTruckDelivery  /> </h3>
                  <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                         <label className="form-label" htmlFor="form3Example1m">
                          Municipio
                        </label>
                        <input
                          type="text"
                          id="form3Example1m"
                          className="form-control form-control-lg"
                          name="municipio"
                          value={formData.municipio}
                          onChange={handleInputChange}
                          readOnly
                        />
                       
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                         <label className="form-label" htmlFor="form3Example1n">
                          Parroquia
                        </label>
                        <input
                          type="text"
                          id="form3Example1n"
                          className="form-control form-control-lg"
                          name="parroquia"
                          value={formData.parroquia}
                          onChange={handleInputChange}
                        />
                       
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example8">
                      Zona
                    </label>
                    <input
                      type="text"
                      id="form3Example8"
                      className="form-control form-control-lg"
                      name="zona"
                      value={formData.zona}
                      onChange={handleInputChange}
                    />
                    
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form3Example4">
                          Calle
                        </label> 
                        <input
                          type="text"
                          id="form3Example4"
                          className="form-control form-control-lg"
                          name="calle"
                          value={formData.calle}
                          onChange={handleInputChange}
                        />
                       
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form3Example5">
                          Casa
                        </label> 
                        <input
                          type="text"
                          id="form3Example5"
                          className="form-control form-control-lg"
                          name="casa"
                          value={formData.casa}
                          onChange={handleInputChange}
                        />
                       
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">

                    <select
                      className="form-control"
                      name="tipoEntrega"
                      value={formData.tipoEntrega}
                      onChange={handleSelectChange}
                    >
                      <option value="">Tipo de entrega</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Retirar en negocio">Retirar en negocio</option>
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form3Example6">
                          Teléfono
                        </label>
                        <input
                          type="text"
                          id="form3Example6"
                          className="form-control form-control-lg"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                        />
                        
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                         <label className="form-label" htmlFor="form3Example7">
                          Costo
                        </label>
                        <input
                          type="text"
                          id="form3Example7"
                          className="form-control form-control-lg"
                          name="costo"
                          value={formData.costo}
                          onChange={handleInputChange}
                          readOnly
                        />
                       
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                     <label className="form-label" htmlFor="form3Example2">
                      Indicaciones
                    </label>
                    <textarea
                      className="form-control form-control-lg"
                      id="form3Example2"
                      rows="4"
                      name="indicaciones"
                      value={formData.indicaciones}
                      onChange={handleInputChange}
                    ></textarea>
                   
                  </div>

                  <div className="d-flex justify-content-end pt-3">
                  <button
        type="submit"
        className="btn btn-primary mt-3 mb-4"
        disabled={!isFormComplete || loading}
      >
        {loading ? "Procesando..." : "Completar pedido"}
      </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Checkout;
