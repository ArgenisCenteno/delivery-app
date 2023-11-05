import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart"; 
import "../styles/ProductDetails.css"

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]); 
  const [selectedQuantity, setSelectedQuantity] = useState(1); 
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(null);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

    // Obtener el producto por slug
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.categoria._id);
      } catch (error) {
        console.log(error);
      }
    };
  

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);


  // Obtener productos similares
  const getSimilarProduct = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${productId}/${categoryId}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

   
  // Agregar producto al carrito
  const handleAddToCart = () => {
    

    const productData = {
      _id: product._id,
      nombre : product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      categoria: product.categoria, 
      quantity: selectedQuantity, 
    };

    setCart([...cart, productData]);
    localStorage.setItem("cart", JSON.stringify([...cart, productData]));
    toast.success("Agregado al carrito");
  };

  return (
    <Layout>
      <div className="d-flex justify-content-center p-3 align-content-center align-items-center row   product-details boxShadowInfo">
      <div className="col-md-4 col-sm-4">
        {product._id ? (
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
               className="card-img-top product-image"
              
               alt={product.nombre}
               
               
            />
            ) : (
           <p>Imagen no disponible</p>
            )}
 
        </div>
        <div className="col-md-5 m-2  product-details-info ">
          <h1 className="text-left text-success" >{product.nombre}</h1>
           
          <h6  text-muted>  {product.descripcion}</h6>
          {product.stock === 0 || product.stock < 0  && <p className="unavailable-label">No disponible</p>}
          <h6  text-muted><strong>Categoría:</strong> {product?.categoria?.nombre}</h6>
          <div> 
           
               
            <h2  text-muted>Bs {product.precio}</h2>
           
   
     <div className="col-6 col-sm-6 d-flex align-items-center mb-4">
    <button
      className="btn  btn-danger"
      onClick={() => setSelectedQuantity((prev) => Math.max(prev - 1, 1))}
    >
      -
    </button>
    <input
      className="form-control inputQuantity mx-2 " 
      type="number"
      min={1}
      value={selectedQuantity}
      onChange={(e) => setSelectedQuantity(Number(e.target.value))}
    />
   <button
  className="btn  btn-primary"
  onClick={() =>
    setSelectedQuantity((prev) =>
      Math.min(prev + 1 )
    )
  }
>
  +
</button>
  
 
</div>
          </div>

          <button
            className="btn btn-outline-dark  ms-1 "
            disabled={product.quantity === 0}
            onClick={handleAddToCart}
            
          >
            Agregar al carrito
          </button>
        </div>
        
      </div>
      <hr />
      <div className="d-flex justify-content-center  align-content-center align-items-center  row   similar-products">
          <h4 className="text-success ml-2">Quizás te pueda interesar</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">Sin productos similares</p>
        )}
       
        <div className="d-flex flex-wrap">
         
          {relatedProducts?.map((p) => (

            <div className="card m-2" key={p._id}>

              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.nombre}</h5>
                </div>
                 
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1 verDetalles"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
