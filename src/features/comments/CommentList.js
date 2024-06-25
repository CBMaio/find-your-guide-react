import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import {
  fetchComments,
  selectAllComments,
  updateComment,
  deleteComment,
} from "./commentsSlice";
import { FETCH_STATUS } from "../../utils";

import "../../scss/components/comment-list.scss";

const CommentList = () => {
  const { LOADING, IDLE } = FETCH_STATUS;
  const dispatch = useDispatch();
  const comments = useSelector(selectAllComments);
  const commentsStatus = useSelector((state) => state.comments.status);

  const [commentsToShow, setCommentsToShow] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [selectedState, setSelectedState] = useState();

  const toggleCommentModal = (comment) => {
    setIsOpenCommentModal(!isOpenCommentModal);
    comment && setSelectedComment(comment);
  };

  const getCommentState = (state) => {
    switch (state) {
      case "draft":
        return "PENDIENTE";
      case "published":
        return "ACEPTADO";
      case "unpublished":
        return "BLOQUEADO";
      default:
        return "PENDIENTE";
    }
  };

  useEffect(() => {
    if (commentsStatus === IDLE) {
      dispatch(fetchComments());
    }
  }, [commentsStatus, dispatch, IDLE]);

  useEffect(() => {
    const data = !["PENDIENTE", "ACEPTADO", "BLOQUEADO"].includes(
      selectedFilter
    )
      ? comments
      : comments.filter(
          ({ state }) => getCommentState(state) === selectedFilter
        );

    setCommentsToShow(data);
  }, [selectedFilter, comments]);

  const handleComment = () => {
    const newState = selectedState || selectedComment.state;
    dispatch(updateComment({ state: newState, id: selectedComment._id }));
    setIsOpenCommentModal(false);
  };

  const deleteCommentFunction = (id) => {
    dispatch(deleteComment(id));
    setIsOpenCommentModal(false);
  };

  if (!commentsToShow) return <div>No hay comentarios</div>;

  return (
    <div className="container px-3 py-4 comments-list-container">
      <div className="row">
        <div className="col-lg-12 mt-4">
          <div className="card border-0 mt-2 rounded-10">
            <div className="card-body d-flex p-4 pb-0">
              <h4 className="font-xss text-grey-800 mt-3 fw-700">
                Comentarios
              </h4>
              <select
                className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent"
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option>Filtrar por</option>
                <option value="PENDIENTE">Pendientes</option>
                <option value="ACEPTADO">Aceptados</option>
                <option value="BLOQUEADO">Bloqueados</option>
              </select>
            </div>
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table table-admin mb-0">
                  <thead className="bg-greylight rounded-10 ovh">
                    <tr>
                      <th className="border-0">Curso</th>
                      <th className="border-0" scope="col">
                        Nombre
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
                    {commentsToShow.map((value) => (
                      <tr key={value._id}>
                        <td>
                          <b>{value.course_name}</b>
                        </td>
                        <td>{value.name}</td>
                        <td>
                          <span
                            className={`badge rounded-pill font-xsssss fw-700 pl-3 pr-3 lh-24 text-uppercase rounded-3 ls-2 bg-${getCommentState(
                              value.state
                            ).toLowerCase()}`}
                          >
                            {getCommentState(value.state)}
                          </span>
                        </td>
                        <td className="product-remove text-end comments-actions">
                          <Button
                            className="bg-transparent border-0 pr-0 course-action"
                            onClick={() => toggleCommentModal(value)}
                          >
                            <i className="ti-comment mr-1 font-xs text-grey-500"></i>
                            <span className="button-legend review-comment">
                              Revisar comentario
                            </span>
                          </Button>
                          <Button
                            className="bg-transparent border-0 course-action"
                            onClick={() => deleteCommentFunction(value._id)}
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
                          {selectedComment.course_name}
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
                          <span>Comentario: </span>
                          <span>
                            <b>{selectedComment.description} </b>
                          </span>
                        </div>
                        <div>
                          <span>Estado del comentario: </span>
                          <span>
                            <b>{getCommentState(selectedComment.state)} </b>
                          </span>
                        </div>

                        <div className="mt-4 actions-container">
                          <select
                            onChange={(e) => setSelectedState(e.target.value)}
                            defaultValue={selectedComment.state}
                            className="col-12 text-center p-2 bg-current border-0 action-btn filled-btn"
                          >
                            <option value="published">Aceptar</option>
                            <option value="unpublished">Bloquear</option>
                            <option value="draft">Pendiente</option>
                          </select>
                          {/*  <Button className="col-12 bg-current border-0 action-btn filled-btn">
                            <span>Aceptar</span>
                          </Button>*/}
                          <Button
                            className="col-12 action-btn outline-btn"
                            onClick={handleComment}
                          >
                            <span>
                              {commentsStatus === LOADING
                                ? "Cargando"
                                : "Aceptar cambios"}
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
