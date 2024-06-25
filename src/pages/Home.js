import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { isAuthenticated } from "../features/auth/authSlice";
import { categories } from "../utils";

import "../scss/pages/home.scss";

const Home = () => {
  const isAuth = useSelector(isAuthenticated);
  const categoryList = categories;

  const iconList = [
    {
      title: "Certificación de guías",
      des: "Asegúrate de que tus guías estén verificados con nuestras certificaciones de credenciales.",
      icon: "ti-check",
      color: "text-warning",
      bgcolor: "alert-warning",
    },
    {
      title: "Guías expertos",
      des: "Nuestra plataforma cuenta con guías turísticos altamente calificados y apasionados.",
      icon: "ti-heart",
      color: "text-secondary",
      bgcolor: "alert-secondary",
    },
    {
      title: "Soporte 24/7",
      des: "Nuestro equipo de soporte está disponible para ti en todo momento.",
      icon: "feather-box",
      color: "text-success",
      bgcolor: "alert-success",
    },
  ];

  const brandsettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    centerMode: false,
    variableWidth: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
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
      <Header divclassName="shadow-none" />

      <div className="banner-wrapper bg-after-fluid header-container">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-5 order-lg-2 banner-container">
              <img
                src="assets/images/banner-illustration.svg"
                alt="banner"
                className="pt-lg--10 w-100"
              />
            </div>
            <div className="col-xl-6 col-lg-7 order-lg-1 pt-lg--10 pb-lg--10 xl-p-5">
              <h2 className="display3-size display2-md-size fw-700">
                Encuentra el tour perfecto para vos
              </h2>
              <h4 className="text-grey-500 font-xssss fw-500 ml-1 aos-init lh-24">
                Descubre experiencias únicas y personalizadas con guías locales
                expertos que harán de tu viaje algo inolvidable
              </h4>
              <div className="form-group mt-lg-5 p-3 border-light border p-2 bg-white rounded-lg">
                <div className="row">
                  <div className="col-6">
                    <Link
                      to="/services-grid"
                      className="w-100 btn font-xssss fw-600 ls-3 banner-btn p-0 border-0 text-uppercase light-btn "
                    >
                      Buscar destinos
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                      to={isAuth ? "/welcome-admin" : "/register"}
                      className="w-100 btn bg-current text-white font-xssss fw-600 ls-3  p-0 border-0 text-uppercase create-account-btn"
                    >
                      {!isAuth ? "Crear una cuenta" : "Ir a tu cuenta"}
                    </Link>
                  </div>
                </div>
              </div>
              <h4 className="text-grey-500 font-xssss fw-500 ml-1 lh-24">
                <b className="text-grey-800">Destinos Populares:</b> Paris,
                Roma, Buenos Aires, Nueva York
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="brand-wrapper pt-5 pb-7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="page-title style1 col-xl-6 col-lg-6 col-md-10 text-center mb-5">
              <h2 className="text-grey-900 fw-700 display1-size display2-md-size pb-3 mb-0 d-block">
                Explorar las distintas categorías
              </h2>
              <p className="fw-300 font-xsss lh-28 text-grey-500">
                Descubre un mundo de posibilidades al explorar las diversas
                opciones de guías turísticos disponibles en TourFinder. Desde
                tours individuales hasta traducciones, encontrarás servicios y
                guías que se adaptan a tus intereses y destinos
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Slider {...brandsettings} className="slider-element">
                {categoryList.map(({ name, description, img }, index) => (
                  <Card
                    className="card-container text-center"
                    style={{ width: "18rem" }}
                    key={index}
                  >
                    <Card.Img
                      variant="top"
                      src={img}
                      style={{ height: "110px" }}
                    />
                    <Card.Body className="category-card-body">
                      <Card.Title>{name}</Card.Title>
                    </Card.Body>
                  </Card>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <div className="how-to-work pt-lg--5 pb-lg--7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="page-title style1 col-xl-6 col-lg-8 col-md-10 text-center mb-5">
              <h2 className="text-grey-900 fw-700 display1-size display2-md-size pb-3 mb-0 d-block">
                Aprovecha al máximo nuesta plataforma
              </h2>
              <p className="fw-300 font-xsss lh-28 text-grey-500">
                Te ofrecemos una experiencia de viaje enriquecedora y flexible,
                diseñada para impulsar tu aventura y descubrimiento en cualquier
                rincón del mundo
              </p>
            </div>
          </div>

          <div className="row">
            {iconList.map((value, index) => (
              <div className="col-lg-4" key={index}>
                <div className="card p-4 border-0 text-center d-block">
                  <i
                    className={`btn-round-xxxl font-xxl position-relative z-index ${value.icon} ${value.color} ${value.bgcolor}`}
                  ></i>
                  <h2 className="font-xs fw-700 text-grey-900 mt-4 mb-2">
                    {value.title}
                  </h2>
                  <p className="fw-500 font-xssss lh-28 text-grey-500">
                    {value.des}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="how-to-work pb-lg--7">
        <div className="container-fluid experience-banner">
          <div className="container row experience-content">
            <div className="experience-box">
              <img src="assets/images/students.png" alt="students icon" />
              <p>260K +</p>
              <p>Turistas en todo el mundo</p>
            </div>
            <div className="experience-box">
              <img src="assets/images/experience.png" alt="students icon" />
              <p>24 +</p>
              <p>Años de experiencia</p>
            </div>
            <div className="experience-box">
              <img src="assets/images/courses.png" alt="students icon" />
              <p>550 +</p>
              <p>Cursos profesionales</p>
            </div>
            <div className="experience-box">
              <img src="assets/images/reviews.png" alt="students icon" />
              <p>2M +</p>
              <p>Reseñas increíbles</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default Home;
