import React, { Fragment } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Slider from "react-slick";

import "../scss/pages/about.scss";
import "../scss/variables.scss";

const About = () => {
  const feedbackList = [
    {
      imageUrl: "student1.jpg",
      name: "Goria Coast",
      status: "Diseñadora gráfica",
      des: "MarketClass ha sido una revelación para mí. Los cursos son muy completos y están impartidos por expertos en la industria. Aprendí mucho y ahora me siento más segura en el mundo digital.",
    },
    {
      imageUrl: "student2.jpg",
      name: "Thomas Smith",
      status: "Desarrollador de software junior",
      des: "¡Increíble! Los cursos de MarketClass me ayudaron a conseguir un nuevo empleo en el campo de la programación. La plataforma es fácil de usar y las lecciones son muy informativas.",
    },
    {
      imageUrl: "student3.jpg",
      name: "Hurin Seary",
      status: "Analista de datos",
      des: "Me encanta cómo MarketClass simplifica el aprendizaje en tecnología. Las opciones de filtrado me ayudaron a encontrar el curso perfecto para mis necesidades.",
    },
    {
      imageUrl: "student1.jpg",
      name: "Goria Coast",
      status: "Administrador de sistemas",
      des: "Como profesional de TI, siempre estoy en busca de actualizaciones. MarketClass me mantiene al día con las últimas tendencias y herramientas. ¡Muy recomendado!",
    },
    {
      imageUrl: "student2.jpg",
      name: "Thomas Smith",
      status: "Marketing digital",
      des: "MarketClass no solo ofrece cursos de alta calidad, sino que también fomenta la comunidad. He conocido a personas increíbles a través de los foros de discusión.",
    },
    {
      imageUrl: "student3.jpg",
      name: "Hurin Seary",
      status: "Desarrollador web front-end",
      des: "MarketClass es la clave para avanzar en mi carrera de desarrollo web. Los instructores son apasionados y están comprometidos con el éxito de los estudiantes. ¡No puedo esperar para seguir aprendiendo!",
    },
  ];
  const feedbacksettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      <Header />
      <div className="container-fluid header-banner pb-lg--7 pt-lg--7 pt-5 pb-7">
        <div className="container row m-auto">
          <h1 className="m-auto fw-700 display1-size">Sobre nosotros</h1>
        </div>
      </div>

      <div className="about-wrapper pb-lg--7 pt-lg--7 pt-5 pb-7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="text-grey-900 fw-700 display1-size display2-md-size pb-2 mb-0 mt-3 d-block lh-3">
                Elegí el mejor tour
                <br /> para vos
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h4 className=" fw-500 mb-4 lh-30 font-xsss text-grey-500 mt-0">
                FindYourGuide te ayudara a elegir el mejor tour para vos
              </h4>
            </div>

            <div className="col-lg-12 mt-3">
              <p>
              En FindYourGuide, creemos que cada viaje es una oportunidad para descubrir, aprender y vivir experiencias únicas. 
              Nuestra misión es facilitar conexiones auténticas entre viajeros y guías locales, asegurando que cada turista reciba una experiencia 
              enriquecedora y personalizada. 
              Queremos que cada viaje sea más que una simple visita, sea una aventura memorable guiada por expertos apasionados y conocedores.
              </p>
            </div>
            <div className="col-lg-12 mt-5 text-center pt-3">
              <a
                href="/register"
                className="ml-1 mr-1 rounded-lg bg-light-green text-green font-xss border-size-md border-0 fw-600 open-font p-3 w200 btn"
              >
                Quiero dar tours
              </a>

              <a
                href="/register"
                className="ml-1 mr-1 rounded-lg bg-light-green text-green font-xss border-size-md border-0 fw-600 open-font p-3 w200 btn"
              >
                Quiero contratar un tour
              </a>

            </div>
          </div>
        </div>
      </div>

      <div className="how-to-work">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 mb-4 text-center">
              <img
                src="\assets\images\FindYourGuide-images\tourist-couple.jpg"
                alt="about"  
                className="rounded-lg shadow-xs tourist-img"
              />
            </div>

            <div className="col-lg-6 offset-lg-1 page-title style1">
              <h2 className="fw-700 text-grey-800 display1-size display2-md-size lh-3 pt-lg--5">
                Explora nuestros tours
              </h2>
              <p className="font-xsss fw-400 text-grey-500 lh-28 mt-0 mb-0  mt-3 w-75 w-xs-90">
                Descubre tu proxima aventura
              </p>

              <h4 className="fw-600 font-xs mt-4 mb-2">
                <i className="ti-check btn-round-xs text-white bg-success mr-2 border"></i>
                Encuentra lo que necesitas
              </h4>
              <p className="fw-300 font-xsss lh-28 text-grey-500 mt-0 ml-4 pl-3 w-75 w-xs-90">
                Explora y filtra entre cientos de opciones de tours. Busca según el destino, idioma, puntuación y tipo 
                de servicio.
              </p>

              <h4 className="fw-600 font-xs mt-4 mb-2">
                <i className="ti-check btn-round-xs text-white bg-success mr-2 border"></i>
                Explora oportunidades asombrosas
              </h4>
              <p className="fw-300 font-xsss lh-28 text-grey-500 mt-0 ml-4 pl-3 w-75 w-xs-90">
                
                Aprende y disfruta de los inolvidables destinos que tenemos para vos. En FindYourGuide, te ayudamos a descubrir y
                aprovechar al maximo tu proxima aventura.
              </p>

              <h4 className="fw-600 font-xs mt-5 mb-2">
                <i className="ti-check btn-round-xs text-white bg-success mr-2 border"></i>
                Información confiable y certificada
              </h4>
              <p className="fw-300 font-xsss lh-28 text-grey-500 mt-0 ml-4 pl-3 w-75 w-xs-90">
              Todos nuestros guías pasan por un riguroso proceso de verificación para garantizar que recibas información precisa y confiable.
              </p>

              <h4 className="fw-600 font-xs mt-4 mb-2">
                <i className="ti-check btn-round-xs text-white bg-success mr-2 border"></i>
                Gane trofeos
              </h4>
              <p className="fw-300 font-xsss lh-28 text-grey-500 mt-0 ml-4 pl-3 w-75 w-xs-90">
              Participa en nuestro sistema de trofeos y recompensas que incentivan tanto a guías
               como a turistas a mantener altos estándares de calidad.
              </p>

            </div>


          </div>
        </div>
      </div>
      <div className="row justify-content-center">
      <div className="page-title style1 col-xl-6 col-lg-6 col-md-10 text-center mb-5">   
      <h2 h2 className="text-grey-900 fw-700 display1-size display2-md-size pb-3 mb-0 d-block">¿Tienes alguna pregunta o necesitas asistencia? ¡Estamos aquí para ayudarte!</h2>
      <Link to="/contact" className="ml-1 mr-1 rounded-lg bg-light-purple text-purple font-xss border-size-md border-0 fw-600 open-font p-3 w200 btn "> Contáctanos</Link>

      </div>
      </div>

      <div className="subscribe-wrapper pb-lg--7 pb-5 pt-5 pt-lg--7">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card w-100 p-4 p-lg--5 rounded-xxl bg-current border-0">
                <div className="row justify-content-center">
                  <div className="col-lg-10 text-center">
                    <h2 className="fw-700 text-white display2-size lh-3 mb-2 display2-md-size">
                      Gracias por ser parte
                    </h2>
                  </div>
                  <div className="col-lg-8 text-center">
                    <p className="font-xsss lh-28 text-white mb-0 d-none-xs">
                      Nos basamos en las reseñas de nuestros seguidores para
                      poder bridar el mejor servicio. Explora el mundo con nosotros!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer bgColor="bg-dark" />
    </Fragment>
  );
};

export default About;
