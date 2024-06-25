import { useEffect } from "react";

import "../scss/components/custom-modal.scss";
import "../scss/components/filters-modal.scss";

const FiltersModal = ({ handleModal, setFilters }) => {
  const closeModal = () => handleModal(false);

  const setSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formattedData = Object.fromEntries(formData.entries());

    const cleanData = Object.fromEntries(
      Object.entries(formattedData).filter(([key, value]) => value !== "")
    );

    setFilters(cleanData);
    closeModal();
  };

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
                      <input
                        name="firstName"
                        className="style1-select bg-transparent border-0 pl-5"
                        placeholder="Buscar por nombre"
                      />
                    </div>

                    <div className="form-group icon-input mb-0">
                      <i className="ti-package font-xs text-grey-400"></i>
                      <input
                        name="lastName"
                        className="style1-select bg-transparent border-0 pl-5"
                        placeholder="Buscar por apellido"
                      />
                    </div>

                    <div className="form-group icon-input mb-0">
                      <i className="ti-package font-xs text-grey-400"></i>
                      <input
                        name="city"
                        className="style1-select bg-transparent border-0 pl-5"
                        placeholder="Buscar por ciudad"
                      />
                    </div>

                    <div className="form-group icon-input mb-0">
                      <i className="ti-package font-xs text-grey-400"></i>
                      <input
                        name="country"
                        className="style1-select bg-transparent border-0 pl-5"
                        placeholder="Buscar por país"
                      />
                    </div>

                    <div className="form-group icon-input mb-0">
                      <i className="ti-package font-xs text-grey-400"></i>
                      <select
                        name="lenguaje"
                        className="style1-select bg-transparent border-0 pl-5"
                      >
                        <option value="">Lenguaje</option>
                        <option value="ES">Español</option>
                        <option value="EN">Inglés</option>
                        <option value="RU">Ruso</option>
                        <option value="GER">Aleman</option>
                        <option value="POR">Portugués</option>
                      </select>
                    </div>
                    <div className="form-group icon-input mb-0">
                      <i className="ti-package font-xs text-grey-400"></i>
                      <select
                        name="serviceType"
                        className="style1-select bg-transparent border-0 pl-5"
                      >
                        <option value="">Tipo de servicio</option>
                        <option value="TOURS_INDIVIDUALES">Individual</option>
                        <option value="TOURS_GRUPALES">Grupal</option>
                        <option value="TRADUCCIONES">Traducción</option>
                      </select>
                    </div>

                    <div className="form-group icon-input mb-0">
                      <i className="ti-package font-xs text-grey-400"></i>
                      <select
                        name="score"
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
