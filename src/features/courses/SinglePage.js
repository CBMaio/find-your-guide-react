import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import {
  getSelectedService,
  getCoursesStatus,
  fetchCourses,
  fetchServiceById,
} from "./coursesSlice";
import { addNewRequest, selectRequestStatus } from "../requests/requestsSlice";

import { FETCH_STATUS } from "../../utils";

import { CustomAlert } from "../../components/CustomAlert";
import {
  addComment,
  fetchComments,
  getCommentsStatus,
  selectAllComments,
} from "../comments/commentsSlice";
import Modal from "../../components/Modal";

import "../../scss/pages/single-page.scss";

const SinglePage = () => {
  const { LOADING, IDLE, SUCCEEDED, FAILED } = FETCH_STATUS;

  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const [rating, setRating] = useState(0);
  const [emptyFields, setEmptyFields] = useState(false);
  const [selectedSevice, setSelectedService] = useState(null);
  const [displayModal, setDisplayModal] = useState({
    display: false,
    title: "",
    description: "",
  });
  const [displayCustomAlert, setDisplayCustomAlert] = useState({
    display: false,
    isSuccess: false,
    text: "",
  });
  const [username, setUsername] = useState("");

  const reviewStatus = useSelector(getCommentsStatus);
  const servicesStatus = useSelector(getCoursesStatus);
  const requestStatus = useSelector(selectRequestStatus);
  const service = useSelector((state) => getSelectedService(state, serviceId));
  const reviews = useSelector(selectAllComments);

  const {
    name,
    guide,
    description,
    date,
    price,
    serviceType,
    image,
    quantity,
    id,
  } = service || {};

  const handleRating = (rate) => {
    setRating(rate);
  };
  const canSave = (data) => Object.values(data).every(Boolean);

  const sendComment = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formattedData = Object.fromEntries(formData.entries());
    const currentDate = new Date().toISOString().substring(0, 10);
    const finalData = {
      date: currentDate,
      ...formattedData,
      score: rating,
    };

    if (!canSave(finalData)) {
      setEmptyFields(true);
      setTimeout(() => {
        setEmptyFields(false);
      }, 1000);
      return;
    }

    dispatch(addComment({ comment: finalData, id: guide.id }));

    window.scrollTo(0, 0);

    e.target.reset();
  };

  const handleReservation = () => {
    try {
      dispatch(addNewRequest(serviceId));
    } catch (error) {
      console.error("Error buying de service", error);
    }
  };

  useEffect(() => {
    if (!selectedSevice) {
      dispatch(fetchServiceById(serviceId));
      setSelectedService(service);
    }

    if (servicesStatus === IDLE) {
      dispatch(fetchCourses());
    }

    if (reviewStatus === IDLE && guide) {
      dispatch(fetchComments(guide?.id));
    }
  }, [
    servicesStatus,
    IDLE,
    dispatch,
    selectedSevice,
    serviceId,
    service,
    reviewStatus,
    guide,
  ]);

  useEffect(() => {
    if (requestStatus === SUCCEEDED) {
      setDisplayModal({
        display: true,
        title: "Tu registro fue exitoso",
        description: "Muchas gracias! Preparate para una aventura única",
      });
    }

    if (requestStatus === FAILED) {
      setDisplayCustomAlert({
        display: true,
        isSuccess: false,
        text: "Hubo un problema con su registro. Si el problema persiste, vuelva a iniciar sesión",
      });
    }

    setTimeout(() => {
      setDisplayCustomAlert({
        display: false,
      });
    }, 3000);
  }, [FAILED, SUCCEEDED, requestStatus]);

  useEffect(() => {
    if (reviewStatus === SUCCEEDED) {
      setDisplayCustomAlert({
        display: true,
        isSuccess: true,
        text: "Comentario envaido correctamente",
      });
    }

    if (reviewStatus === FAILED) {
      setDisplayCustomAlert({
        display: true,
        isSuccess: false,
        text: "Hubo un problema al enviar su comentario. Inténtalo nuevamente",
      });
    }

    setTimeout(() => {
      setDisplayCustomAlert({
        display: false,
      });
    }, 3000);
  }, [FAILED, SUCCEEDED, reviewStatus]);

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem("userData"))?.username;
    if (name) {
      setUsername(name);
    }
  }, []);

  if (servicesStatus === LOADING) {
    return <section>Cargando...</section>;
  } else if (!service) {
    return <section>Service not found!</section>;
  }

  console.log("reviews", reviews);
  return (
    <div className="row">
      {displayCustomAlert.display && (
        <CustomAlert
          isSuccess={displayCustomAlert.isSuccess}
          text={displayCustomAlert.text}
        />
      )}
      <div className="col-12">
        <div className="col-md-6 card border-0 mb-0 rounded-lg overflow-hidden m-auto">
          <img
            src={
              image || "/assets/images/FindYourGuide-images/noServiceImage.jpg"
            }
            alt="service-img"
            className="single-course-main-img"
            style={{ height: "300px", objectFit: "contain" }}
          />
        </div>
        <div className="col-6 m-auto align-items-center border-0 pt-4 rounded-10 admin-form">
          <div
            onClick={handleReservation}
            className="col-12 form-control text-center style2-input text-white fw-600 bg-current border-0 p-0 "
          >
            Reservar
          </div>
        </div>
        <div className="card d-block border-0 rounded-lg overflow-hidden dark-bg-transparent bg-transparent mt-4 pb-3">
          <div className="row">
            <div className="col-10">
              <h2 className="fw-700 font-md d-block lh-4 mb-2">{name}</h2>

              <Link to={`/guide-profile/${id}`}>
                <span className="font-xssss fw-700 text-grey-900 d-inline-block ml-0 text-dark">
                  {guide.username}
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 course-data-container">
          <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 data-title mb-4">
            Información del servicio
          </h2>
          <h4 className="font-xssss fw-600 text-grey-600 mb-2 pl-30 position-relative lh-24">
            <i className="ti-check font-xssss btn-round-xs bg-dark-purple text-white position-absolute left-0 top-5"></i>
            {description}
          </h4>
          <h4 className="font-xssss fw-600 text-grey-600 mb-2 pl-30 position-relative lh-24">
            <i className="ti-check font-xssss btn-round-xs bg-dark-purple text-white position-absolute left-0 top-5"></i>
            Este curso será {serviceType}.{" "}
            {serviceType === "grupal" && (
              <span>Cupo máximo: {quantity} personas</span>
            )}
          </h4>
          <h4 className="font-xssss fw-600 text-grey-600 mb-2 pl-30 position-relative lh-24">
            <i className="ti-check font-xssss btn-round-xs bg-dark-purple text-white position-absolute left-0 top-5"></i>
            Fecha: {date}
          </h4>
          <h4 className="font-xssss fw-600 text-grey-600 mb-2 pl-30 position-relative lh-24">
            <i className="ti-check font-xssss btn-round-xs bg-dark-purple text-white position-absolute left-0 top-5"></i>
            Costo total del curso: ${price}
          </h4>
        </div>

        <div className="card w-100 border-0 mt-4 mb-4 p-4 shadow-xss position-relative rounded-lg bg-white">
          <div className="row">
            <div className="pl-4 mb-4 pr-0">
              <h2 className="display1-size lh-1 m-0 text-grey-900 fw-700">
                {reviews && reviews.length
                  ? `${reviews.length} Comentarios sobre ${guide.username}`
                  : "Aún no hay comentarios"}
              </h2>
            </div>
          </div>

          {reviews &&
            reviews.map(({ id, from, description, score, date }) => (
              <div key={id} className="row mt-2 mb-1">
                <div className="col-10 pl-4">
                  <div className="content">
                    <h6 className="author-name font-xssss fw-600 mb-0 text-grey-800">
                      {date} | {from.username}
                    </h6>
                    <div className="star d-block w-100 text-left">
                      {Array.from(Array(score).keys()).map((n) => (
                        <img
                          key={n}
                          src="/assets/images/star.png"
                          alt="star"
                          className="w10"
                        />
                      ))}
                    </div>
                    <p className="comment-text lh-24 fw-500 font-xssss text-grey-500 mt-2">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="card w-100 border-0 mt-4 mb-4 p-4 shadow-xss position-relative rounded-lg bg-white">
          <div className="row">
            <div className="col-12  mb-4">
              <h2 className="lh-1 m-0 text-grey-900 fw-700">
                Deja un comentario para tu guía
              </h2>
              <form className="row" onSubmit={sendComment}>
                <div className="col-md-6">
                  <div className="mt-5 form-group mb30">
                    <label className="form-label">Nombre de usuario</label>
                    <input
                      className="form-control form_control"
                      type="text"
                      required
                      placeholder="Nombre"
                      readOnly
                      defaultValue={username}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mt-md-5 form-group mb30">
                    <label className="form-label">Puntuación</label>
                    <div className="App">
                      <Rating onClick={handleRating} disableFillHover={true} />
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <label className="form-label">Comentario</label>
                    <textarea
                      name="description"
                      className="form-control h150"
                      required
                      rows="6"
                      placeholder="Comentario"
                    ></textarea>
                  </div>
                </div>
                {emptyFields && (
                  <div className="col-12 text-center font-xsss text-danger">
                    <p className="mb-0">
                      Debe seleccionar al menos una estrella
                    </p>
                  </div>
                )}
                <div className="card col-6 m-auto align-items-center border-0 p-4 mt-3 rounded-10 admin-form">
                  <button
                    type="submit"
                    className="col-12 form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {displayModal.display && (
        <Modal
          title={displayModal.title}
          description={displayModal.description}
        />
      )}
    </div>
  );
};

export default SinglePage;
