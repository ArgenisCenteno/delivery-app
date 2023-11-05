import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import {PayPalButtons } from '@paypal/react-paypal-js';  
import {  useParams } from "react-router-dom"; 
import axios from "axios";
import toast from "react-hot-toast";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link, useNavigate } from "react-router-dom"; 
import {FaCcPaypal, FaCcMastercard, FaCcVisa} from "react-icons/fa"   
import {BsCash} from "react-icons/bs"
import {FaTrash,FaLongArrowAltLeft } from "react-icons/fa"
import {BiUserCheck } from "react-icons/bi"
import {MdMarkEmailRead} from "react-icons/md"
import "../../styles/CartStyles.css";
 
const Order = () => { 
  const params = useParams();
  const [loading, setLoading] = useState(false); 
  const [orderData, setOrderData] = useState(null); // Estado para almacenar los datos de la orden
  const [isPaying, setIsPaying] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    const getOrderData = async () => {
      try {
        const { data } = await axios.get(`/api/v1/auth/order/${params._id}`);
         
        setOrderData(data);
        setLoading(false);
      } catch (error) {
         
        setLoading(false);
      }
    };
    getOrderData();
  }, [params.slug]);



  const onOrderCompleted = async (details) => {
    if ( details.status !== 'COMPLETED' ) {
      return toast.error('No hay pago en Paypal'); }

      setIsPaying(true);

      try {
          const orderId = params._id;
          const { data } = await  axios.post("/api/v1/product/paypal-pay", {
              transactionId: details.id,
              orderId, 
          }); 
          window.location.reload()  
      } catch (error) {
          setIsPaying(false); 
          toast.error('Error al realizar el pago');
      }
   
  }
    
  return (
    <Layout style={{ width: "100vw" }}>
   <section className="h-100 h-custom" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
  <div className="card">
    <div className="card-body p-4">
      <div className="row">
        <div className="col-lg-7">
        { orderData?.order?.estadoPago  ? <h5 className=" mb-3">¡Gracias por su compra!</h5> : <h5>Detalles de la orden</h5> } 
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
            
              <p className="mb-0">¡Pediste {orderData?.order?.productos?.length} productos!</p>
            </div>
          </div>
          {orderData?.order?.productos?.map((p, index) => (
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
                    <div className="ms-2">
                      <h5>{p.nombre}</h5>
                      <p className="small mb-0">{p.descripcion}</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <div style={{ width: '60px' }}>
                      <h5 className="fw-normal mb-0 ml-2">{p.quantity}</h5>
                    </div>
                    <div style={{ width: '70px' }}>
                      <h5 className="mb-0 ml-3">Bs {p.precio}</h5>
                    </div>
                     
                    
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
    <div className="d-flex justify-content-between">
      <p className="mb-2">ID</p>
      <p className="mb-2">{orderData?.order?._id} </p>
    </div>
    <div className="d-flex justify-content-between">
      <p className="mb-2">Municipio</p>
      <p className="mb-2">{orderData?.order?.direccion?.municipio} </p>
    </div>
    <div className="d-flex justify-content-between">
      <p className="mb-2">Parroquia</p>
      <p className="mb-2">{orderData?.order?.direccion?.parroquia}</p>
    </div>
    <div className="d-flex justify-content-between">
      <p className="mb-2">Zona</p>
      <p className="mb-2">{orderData?.order?.direccion?.zona}</p>
    </div>  
    <div className="d-flex justify-content-between">
      <p className="mb-2">Calle</p>
      <p className="mb-2">{orderData?.order?.direccion?.calle}</p>
    </div>
    <div className="d-flex justify-content-between">
      <p className="mb-2">Casa</p>
      <p className="mb-2">{orderData?.order?.direccion?.casa}</p>
    </div>
    <div className="d-flex justify-content-between">
      <p className="mb-2">Indicaciones</p>
      <p className="mb-2">{orderData?.order?.direccion?.indicaciones}</p>
    </div>
    </form>
    <hr className="my-4" />
    <div className="d-flex justify-content-between">
      <p className="mb-2">Subtotal</p>
      <p className="mb-2"> {orderData?.order?.subtotal} Bs </p>
    </div>
    <div className="d-flex justify-content-between">
      <p className="mb-2">IVA</p>
      <p className="mb-2">16%</p>
    </div>
    <div className="d-flex justify-content-between">
      <p className="mb-2">Delivery</p>
      <p className="mb-2">  {orderData?.order?.direccion?.costo} Bs</p>
    </div>
    <div className="d-flex justify-content-between mb-4">
      <p className="mb-2">Total </p>
      <p className="mb-2"> {orderData?.order?.total} Bs</p>
    </div>

    <hr className="my-4" />
    { orderData?.order?.estadoPago  ? (
        
        <h2 className="text-center text-white"  > <strong>¡Orden Pagada!</strong> </h2>
      ) : (
        <>
        <div className="mt-2 text-muted  ">
                          <p className="text-center  bg-danger p-3 text-white" >  <strong>Orden Sin Pagar</strong> </p>
                          <p className="text-center  text-white" >  <strong>Escoge un metodo de pago</strong> </p>
                          {orderData?.order?.total && (
                          
                  <PayPalButtons  
                  createOrder={(data, actions) => {
                    
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: `${orderData?.order?.total}` ,
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        onOrderCompleted( details );
                        // console.log({ details  })
                        // const name = details.payer.name.given_name;
                        // alert(`Transaction completed by ${name}`);
                    });
                }}
                  />)}
                  <a href="https://wa.link/5ye7qg" target="_blank" style={{textDecoration: "none"}}>
                  <button className="btn btn-primary btn-lg btn-block mt-4" style={{width: "100%"}}> <WhatsAppIcon/> WhatsApp</button>
                </a>
               
                  </div>
    
     
    
                  </>
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

export default Order;
