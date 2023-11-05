import { Container, Row, Col, Tab, Nav } from "react-bootstrap";   
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import "../../styles/Categories.css"

const Categories = () => {
  const img1 = "https://angelicasmarket.com/wp-content/uploads/2020/09/COMBO-VIVERES.png";
  const img2 = "https://angelicasmarket.com/wp-content/uploads/2020/09/COMBO-CARNES.png";
  const img3 = "https://angelicasmarket.com/wp-content/uploads/2020/09/COMBO-VERDURAS.jpg";
  const img4 = "https://www.nicepng.com/png/detail/355-3555175_refrescos-en-png-soft-drink.png";

  const categoriesList = [
    {
      title: "Viveres",
      description: "Arroz, pasta, granos, pan",
      imgUrl: img1,
    },
    {
      title: "Refrigerados",
      description: "Carne, pollo, pescado, charcutería",
      imgUrl: img2,
    },
    {
      title: "Bebidas",
      description: "Agua, refresco, jugos",
      imgUrl: img4,
    },
    {
      title: "Frutas y vegetales",
      description: "Furtas, verduras, vegetales",
      imgUrl: img3,
    },
  ];

  return (
    <section className="project" id="proyectos">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 className="text-danger">Categorias</h2>
                  <p>Explora nuestras categorias de productos.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {categoriesList.map((category, index) => (
                            <Col size={12} sm={6} md={4} key={index}>
                              <div className="proj-imgbx">
                                <img src={category.imgUrl} alt={category.title} width="300px" />
                                <div className="proj-txtx">
                                  <h5>{category.title}</h5>
                                  <span>{category.description}</span>
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={img1} alt="Background" />
    </section>
  );
}

export default Categories;
