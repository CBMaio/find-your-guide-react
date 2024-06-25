import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getCoursesStatus,
  fetchCourses,
  fetchServiceById,
  getSelectedService,
} from "../features/courses/coursesSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";
import RequestsAplicationForm from "../features/requests/RequestsAplicationForm";
import { FETCH_STATUS } from "../utils";

const Registration = () => {
  const { IDLE } = FETCH_STATUS;
  const { serviceId } = useParams();
  const dispatch = useDispatch();

  const [selectedSevice, setSelectedService] = useState(null);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [exitMessage, setExitMessage] = useState({
    title: "",
    description: "",
  });

  const service = useSelector((state) => getSelectedService(state, serviceId));
  const servicesStatus = useSelector(getCoursesStatus);

  useEffect(() => {
    if (!selectedSevice) {
      dispatch(fetchServiceById(serviceId));
      setSelectedService(service);
    }

    if (servicesStatus === IDLE) {
      dispatch(fetchCourses());
    }
  }, [selectedSevice, IDLE, dispatch, serviceId, servicesStatus, service]);

  if (!selectedSevice) return <div>Servicio no encontrado</div>;

  const setFormStatus = (status) => {
    if (!status) {
      setExitMessage({
        title: "No pudimos enviar su formulario",
        description: "Por favor intentalo nuevamente en unos minutos",
      });
    } else {
      setExitMessage({
        title: "Formulario enviado correctamente",
        description:
          "Muchas gracias por el interes en este servicio. Su reserva ha sido solicitada correctamente. Muy pronto tendrá novedades.",
      });
    }

    setSubmittedForm(true);
  };

  return (
    <Fragment>
      {!submittedForm ? (
        <>
          <Header />
          <div className="page-nav pt-lg--7 pb-4 pt-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 text-center">
                  <h1 className="text-grey-800 fw-700 display3-size mb-3 display4-md-size">
                    Bienvenido a <br />
                    <span className="text-current">{selectedSevice.name}</span>
                    <span className="font-xsss text-grey-500 fw-600 d-block mt-3 pl-lg-5 pr-lg-5 lh-28">
                      Ante cualquier duda, conectese con nosotros y le
                      responderemos a la brevedead.
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-wrapp pb-lg--10 pb-5 pt-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="contact-wrap bg-white shadow-lg rounded-lg position-relative top-0">
                    <h1 className="text-grey-900 fw-700 display3-size mb-5 lh-1">
                      Contacta a {selectedSevice.guide?.username}
                    </h1>
                    <RequestsAplicationForm
                      setFormStatus={setFormStatus}
                      id={serviceId}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </>
      ) : (
        <Modal
          title={exitMessage.title}
          description={exitMessage.description}
        />
      )}
    </Fragment>
  );
};

export default Registration;
