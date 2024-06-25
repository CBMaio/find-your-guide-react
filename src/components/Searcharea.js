import "../scss/components/search-area.scss";

const Searcharea = ({ handleModal, handleDeleteFilters }) => {
  const openFiltersModal = () => handleModal(true);
  const deleteFilters = () => handleDeleteFilters();
  return (
    <div
      className="card rounded-xxl p-lg--5 border-0 bg-no-repeat search-area"
      style={{ backgroundColor: `#f3e5f5` }}
    >
      <div className="card-body w-100 p-4">
        <div className="form-group mt-3 p-3 border-light border p-2 bg-white rounded-lg">
          <div className="row justify-content-between">
            <div className="col-lg-4 mb-3 mb-lg-0">
              <button
                onClick={deleteFilters}
                className="w-100 d-block btn font-xssss fw-600 ls-3 style1-input p-0 text-uppercase outline-btn"
              >
                Eliminar Filtros
              </button>
            </div>

            <div className="col-lg-8 mb-3 mb-lg-0">
              <button
                onClick={openFiltersModal}
                className="w-100 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-0 border-0 text-uppercase"
              >
                Filtros
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searcharea;
