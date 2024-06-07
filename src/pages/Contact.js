import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../scss/pages/contact.scss";

const Contact = () => {
  return (
    <Fragment>
      <Header />
      <div className="page-nav bg-lightpurple pt-lg--7 pb-4 pt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h1 className="text-grey-800 fw-700 display3-size mb-3 display4-md-size">
                Contactate con nosotros{" "}
                <span className="font-xsss text-grey-500 fw-600 d-block mt-3 pl-lg-5 pr-lg-5 lh-28">
                  Envíanos un correo electrónico y te responderemos a la brevedad.
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-wrapp pb-lg--10 pb-5 bg-lightpurple pt-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="contact-wrap bg-white shadow-lg rounded-lg position-relative top-0">
                <h1 className="text-grey-900 fw-700 display3-size mb-5 lh-1">
                  Comentarios
                </h1>
                <form action="#">
                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control style2-input bg-color-none text-grey-700"
                          placeholder="Nombre"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control style2-input bg-color-none text-grey-700"
                          placeholder="Email"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mb-3 md-mb-2">
                        <textarea
                          className="w-100 h125 style2-textarea p-3 form-control"
                          placeholder="Mensaje"
                        />
                      </div>
                      <div className="text-left mt-3 float-left md-mb-2">
                        <div className="font-xsss text-grey-500 fw-500">
                          Gracias por ser parte de{" "}
                          <span className="text-grey-600 fw-600">
                            nuestra comunidad
                          </span>
                        </div>
                      </div>
                      <div className="form-group">
                        <a
                          href="/contact"
                          className="rounded-lg style1-input float-right bg-current text-white text-center font-xss fw-500 border-2 border-0 p-0 w175"
                        >
                          Enviar
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Contact;
