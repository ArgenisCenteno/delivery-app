import React from 'react' 
import Carousel from 'react-multi-carousel'; 
import Polar from "../Layout/img/polar.png"
import Mary from "../Layout/img/mary-logo.png"
import Cocacola from "../Layout/img/la-ola-de-cocacola.png"  
import Plumrose from "../Layout/img/plumrose.svg";
import Lucha from "../Layout/img/la-lucha-logo.png";
import Alibal from "../Layout/img/alibal-logo.png" 
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Brands.css"


const Brands = () => {

   
    const responsive = {
        superLargeDesktop: { 
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    


  return (
    <section className="skill" id="habilidades">
    <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="skill-bx wow zoomIn">
                    <h2 className='text-danger'>Proveedores</h2>
                    <p>Conoce nuestros proveedores<br></br> .</p>
                    <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                        <div className="item">
                            <img src={Polar} alt="Image" />
                            <h5>Alimentos Polar</h5>
                        </div>
                        <div className="item">
                            <img src={Mary} alt="Image" />
                            <h5>Alimentos Mary</h5>
                        </div>  
                        <div className="item "  >
                            <img src={Cocacola} alt="Image" />
                            <h5>Coca Cola</h5>
                        </div>
                         
                        <div className="item">
                            <img src={Alibal} alt="Image" />
                            <h5>Alibal</h5>
                        </div>
                    
                    </Carousel>
                </div>
            </div>
        </div>
    </div>
    
</section>
  )
}

export default Brands