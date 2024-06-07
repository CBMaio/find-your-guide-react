import React, { Fragment } from "react";
import Header from "../components/Header";

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
                Elegí la mejor clase
                <br /> para vos
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h4 className=" fw-500 mb-4 lh-30 font-xsss text-grey-500 mt-0">
                MarketClass es una plataforma educativa que ofrece cursos en
                línea y recursos para el desarrollo de habilidades.
              </h4>
            </div>

            <div className="col-lg-12 mt-3">
              <p>
                En MarketClass, creemos en el poder de la educación para
                transformar carreras y abrir puertas al éxito en el mundo de la
                tecnología y los negocios. Fundada con la visión de ser un faro
                de conocimiento y excelencia, nuestra plataforma se ha
                convertido en un referente en la formación en línea. Nuestra
                misión es proporcionar a estudiantes y profesionales las
                herramientas y los conocimientos necesarios para triunfar en un
                mundo cada vez más digitalizado y competitivo. Colaboramos con
                expertos en la industria para ofrecer cursos de alta calidad que
                aborden las tendencias actuales y las mejores prácticas. En
                MarketClass, no solo impartimos conocimiento, también cultivamos
                la comunidad. Fomentamos la colaboración, el networking y el
                aprendizaje interactivo para que nuestros estudiantes se
                conviertan en profesionales preparados para los desafíos del
                mercado global. Únete a nosotros en este emocionante viaje hacia
                el éxito. Tu camino comienza aquí, en MarketClass.
              </p>
            </div>
            <div className="col-lg-12 mt-5 text-center pt-3">
              <a
                href="/register"
                className="ml-1 mr-1 rounded-lg bg-light-green text-green font-xss border-size-md border-0 fw-600 open-font p-3 w200 btn"
              >
                Quiero dar clases
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
                src="/assets/images//about-us-professor.png"
                alt="about"
                className="rounded-lg shadow-xs professor-img"
              />
            </div>
            <div className="col-lg-6 offset-lg-1 page-title style1">
              <h2 className="fw-700 text-grey-800 display1-size display2-md-size lh-3 pt-lg--5">
                Explora nuestros cursos
              </h2>
              <p className="font-xsss fw-400 text-grey-500 lh-28 mt-0 mb-0  mt-3 w-75 w-xs-90">
                Descubre cómo mejorar tus habilidades y dominar el mundo
                digital.
              </p>

              <h4 className="fw-600 font-xs mt-5 mb-2">
                <i className="ti-check btn-round-xs text-white bg-success mr-2 border"></i>
                Elige lo que deseas aprender
              </h4>
              <p className="fw-300 font-xsss lh-28 text-grey-500 mt-0 ml-4 pl-3 w-75 w-xs-90">
                Ya sea que estés buscando cursos sobre programación, desarrollo
                web, análisis de datos o cualquier otra área de la tecnología.
              </p>

              <h4 className="fw-600 font-xs mt-4 mb-2">
                <i className="ti-check btn-round-xs text-white bg-success mr-2 border"></i>
                Encuentra lo que necesitas:
              </h4>
              <p className="fw-300 font-xsss lh-28 text-grey-500 mt-0 ml-4 pl-3 w-75 w-xs-90">
                Explora y filtra entre cientos de opciones de cursos. Lee
                reseñas, examina detalles del contenido y encuentra la formación
                perfecta para tus objetivos.
              </p>

              <h4 className="fw-600 font-xs mt-4 mb-2">
                <i className="ti-check btn-round-xs text-white bg-success mr-2 border"></i>
                Explora oportunidades asombrosas:
              </h4>
              <p className="fw-300 font-xsss lh-28 text-grey-500 mt-0 ml-4 pl-3 w-75 w-xs-90">
                Empieza a aprender y mejora tus habilidades directamente desde
                la página del curso. En MarketClass, te ayudamos a descubrir y
                aprovechar al máximo tu potencial en el mundo de la tecnología.
              </p>
            </div>
          </div>
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
                      poder bridar el mejor servicio. Queremos que encuentres tu
                      clase ideal
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
