import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import {
  deleteRequest,
  fetchRequests,
  handleRequest,
  selectAllRequests,
} from "./requestsSlice";
import { FETCH_STATUS } from "../../utils";

import "../../scss/components/comment-list.scss";
import axiosInstance from "../../services/AxiosInstance";

const RequestsList = () => {
  const BASE_URL = process.env.REACT_APP_JAVA_BACK_URL;

  const dispatch = useDispatch();
  const requests = useSelector(selectAllRequests);
  const requestsStatus = useSelector((state) => state.requests.status);

  const [requestsToShow, setRequestsToShow] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const { LOADING, IDLE } = FETCH_STATUS;

  const toggleCommentModal = (comment) => {
    setIsOpenCommentModal(!isOpenCommentModal);
    comment && setSelectedComment(comment);
  };

  const getRequestState = (state) => {
    switch (state) {
      case "PENDING":
        return "PENDIENTE";
      case "FULL_PAID":
        return "PAGADO";
      case "CONFIRMED":
        return "CONFIRMED";
      case "CANCELED":
        return "RECHAZADO";
      case "INTOUR":
        return "EN TOUR";
      case "END":
        return "FINALIZADO";
      default:
        return "";
    }
  };

  const handleRequestFunction = (id, state) => {
    dispatch(handleRequest({ id, state }));
    setIsOpenCommentModal(false);
  };

  const deleteRequestAction = (id) => {
    dispatch(deleteRequest(id));
  };

  useEffect(async () => {
    const getDefaultNormalizer = async () => {
      const { data } = await axiosInstance.get(
        `${BASE_URL}/api/v1/buys/guide/${
          JSON.parse(localStorage.getItem("userData")).id
        }`
      );
      setRequestsToShow(data.data);
    };
    getDefaultNormalizer();
  }, []);

  const handleChangeStatus = (id, status) => {
    axiosInstance
      .put(`${BASE_URL}/api/v1/buys/status`, {
        id: id,
        status: status,
      })
      .then((resp) => {
        window.location.reload();
      });
  };

  useEffect(() => {
    const data = !["PENDING", "CONFIRMED", "CANCELED"].includes(selectedFilter)
      ? requests
      : requests.filter(({ state }) => state === selectedFilter);

    setRequestsToShow(data);
  }, [selectedFilter, requests]);

  return (
    <div className="container px-3 py-4">
      <div className="row">
        <div className="col-lg-12 mt-4">
          <div className="card border-0 mt-2 rounded-10">
            <div className="card-body d-flex p-4 pb-0">
              <h4 className="font-xss text-grey-800 mt-3 fw-700">
                Contrataciones
              </h4>
              <select
                className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent"
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option>Filtrar por</option>
                <option value="pending">Pendientes</option>
                <option value="accepted">Aceptadas</option>
                <option value="rejected">Rechazadas</option>
                <option value="rejected">Finalizadas</option>
              </select>
            </div>
            <div className="card-body p-4">
              {!requestsToShow.length && (
                <div>No hay contrataciones para mostar </div>
              )}
              {!!requestsToShow.length && (
                <div className="table-responsive">
                  <table className="table table-admin mb-0">
                    <thead className="bg-greylight rounded-10 ovh">
                      <tr>
                        <th className="border-0">Curso</th>
                        <th className="border-0" scope="col">
                          Nombre
                        </th>
                        <th className="border-0" scope="col">
                          Email
                        </th>
                        <th className="border-0" scope="col">
                          Estado
                        </th>

                        <th scope="col" className="text-end border-0">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestsToShow.map((value) => (
                        <tr key={value.id}>
                          <td>
                            <b>{value.service.name}</b>
                          </td>
                          <td>{value.name}</td>
                          <td>{value.date}</td>
                          <td>
                            <span
                              className={`badge rounded-pill font-xsssss fw-700 pl-3 pr-3 lh-24 text-uppercase rounded-3 ls-2 bg-${getRequestState(
                                value?.status
                              ).toLowerCase()}`}
                            >
                              {getRequestState(value?.status)}
                            </span>
                          </td>
                          <td className="product-remove text-end comments-actions">
                            <Button
                              className="bg-transparent border-0 pr-0 course-action"
                              onClick={() => toggleCommentModal(value)}
                            >
                              <i className="ti-comment mr-1 font-xs text-grey-500"></i>
                              <span className="button-legend review-comment">
                                Revisar petición
                              </span>
                            </Button>
                            <Button
                              className="bg-transparent border-0 course-action"
                              onClick={() => deleteRequestAction(value._id)}
                            >
                              <i className="ti-trash  font-xs text-danger"></i>
                              <span className="button-legend">Eliminar</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {isOpenCommentModal && (
                    <div className="course-data-overlay">
                      <div className="course-data-modal p-4 rounded-lg col-lg-8">
                        <div className="close-btn" onClick={toggleCommentModal}>
                          <i className="text-white font-lg text-grey-400 feather-x"></i>
                        </div>
                        <div className="course-title pt-3">
                          <h1 className="text-grey-900 fw-700 mb-3 lh-3 text-center">
                            {selectedComment.service.name}
                          </h1>
                        </div>
                        <div className="course-modal-body">
                          <div>
                            <span>Usuario: </span>
                            <span>
                              <b>{selectedComment.name} </b>
                            </span>
                          </div>
                          <div>
                            <span>Email: </span>
                            <span>
                              <b>{selectedComment.email} </b>
                            </span>
                          </div>
                          <div>
                            <span>Estado de la reserva: </span>
                            <span>
                              <b>{getRequestState(selectedComment.status)} </b>
                            </span>
                          </div>

                          {selectedComment.status == "PENDING" && (
                            <div className="mt-4 actions-container">
                              <Button
                                onClick={() =>
                                  handleChangeStatus(
                                    selectedComment.id,
                                    "CONFIRMED"
                                  )
                                }
                                className="col-12 bg-current border-0 action-btn filled-btn"
                              >
                                <span>Aceptar</span>
                              </Button>
                              <Button
                                onClick={() =>
                                  handleChangeStatus(
                                    selectedComment.id,
                                    "CANCELED"
                                  )
                                }
                                className="col-12 action-btn outline-btn"
                              >
                                <span>Rechazar</span>
                              </Button>
                            </div>
                          )}

                          {selectedComment.status == "FULL_PAID" && (
                            <div className="mt-4 actions-container">
                              <Button
                                onClick={() =>
                                  handleChangeStatus(
                                    selectedComment.id,
                                    "INTOUR"
                                  )
                                }
                                className="col-12 bg-current border-0 action-btn filled-btn"
                              >
                                <span>Empezar Tour</span>
                              </Button>
                            </div>
                          )}
                          {selectedComment.status == "INTOUR" && (
                            <div className="mt-4 actions-container">
                              <Button
                                onClick={() =>
                                  handleChangeStatus(selectedComment.id, "END")
                                }
                                className="col-12 bg-current border-0 action-btn filled-btn"
                              >
                                <span>Terminar Tour</span>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestsList;
