import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  getCategories,
} from "../features/categories/categorySlice";
import { FETCH_STATUS } from "../utils";

import "../scss/components/custom-modal.scss";
import "../scss/components/filters-modal.scss";

const FiltersModal = ({ handleModal, setFilters }) => {
  const closeModal = () => handleModal(false);
  const dispatch = useDispatch();
  const { IDLE, SUCCEEDED, LOADING } = FETCH_STATUS;
  const { status: statusCategory } = useSelector((state) => state.category);
  const filterCategories = useSelector(getCategories);

  const setSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formattedData = Object.fromEntries(formData.entries());
    setFilters(formattedData);
    closeModal();
  };

  useEffect(() => {
    if (statusCategory === IDLE) {
      dispatch(fetchCategories());
    }
  });
  return (
    <div className="custom-modal filters-modal">
      <div className="col-8 contact-wrap bg-white shadow-lg rounded-lg position-relative top-0 modal-content">
        <div className="close-btn" onClick={closeModal}>
          x
        </div>
        <div className="row">
          <div className="col-12">
            <form onSubmit={setSearch}>
              <div className="mb-3 md-mb-2">
                <div className="w-100 p-3 modal-description">
                  <div className="filters-btn-container">
                    <div className="form-group icon-input mb-0">
                      <i className="ti-package font-xs text-grey-400"></i>
                      <select
                        name="category"
                        className="style1-select bg-transparent border-0 pl-5"
                      >
                        <option value="">Categoría</option>
                        {filterCategories.map(({ _id: id, title }) => (
                          <option key={id} value={id}>
                            {title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group icon-input mb-0">
                      <i className="ti-package font-xs text-grey-400"></i>
                      <select
                        name="type"
                        className="style1-select bg-transparent border-0 pl-5"
                      >
                        <option value="">Tipo de clase</option>
                        <option value={"individual"}>Individual</option>
                        <option value={"grupal"}>Grupal</option>
                      </select>
                    </div>
                    <div className="form-group icon-input mb-0">
                      <i className="ti-package font-xs text-grey-400"></i>
                      <select
                        name="frequency"
                        className="style1-select bg-transparent border-0 pl-5"
                      >
                        <option value="">Frecuencia</option>
                        <option value="unica">Unica</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensual">Mensual</option>
                      </select>
                    </div>
                    <div className="form-group icon-input mb-0">
                      <i className="ti-package font-xs text-grey-400"></i>
                      <select
                        name="ranking"
                        className="style1-select bg-transparent border-0 pl-5"
                      >
                        <option value="">Calificación</option>
                        <option value="1">1 Estrella</option>
                        <option value="2">2 Estrellas</option>
                        <option value="3">3 Estrellas</option>
                        <option value="4">4 Estrellas</option>
                        <option value="5">5 Estrellas</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group mb-0">
                <button
                  type="submit"
                  className="m-auto rounded-lg style1-input mb-0 bg-current text-white text-center font-xss fw-500 border-0 p-0 w175"
                >
                  Aplicar filtros
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
