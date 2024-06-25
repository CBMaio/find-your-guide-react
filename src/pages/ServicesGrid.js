import React, { useState, Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Searcharea from "../components/Searcharea";
import ServiceList from "../features/courses/ServiceList";
import FiltersModal from "../components/FiltersModal";
import { CustomAlert } from "../components/CustomAlert";

const ServicesGrid = () => {
  const [searchProductByQuery, setSearchProductByQuery] = useState(null);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(false);
  const [filterSelected, setFiltersSelected] = useState({});
  const [displayCustomAlert, setDisplayCustomAlert] = useState({
    display: false,
    isSuccess: false,
    text: "",
  });

  const handleModal = (state) => {
    setIsOpenFiltersModal(state);
    document.querySelector("body").style.overflow = state ? "hidden" : "auto";
  };

  const setFilters = (filters) => {
    setFiltersSelected({ ...filters });
  };

  const searchCourse = (query) => {
    setSearchProductByQuery(query);
  };

  const handleDeleteFilters = () => {
    setFiltersSelected({});
  };

  const handleAlert = ({ display, isSuccess, text }) => {
    setDisplayCustomAlert({
      display,
      isSuccess,
      text,
    });
  };

  return (
    <Fragment>
      <Header />

      <div className="blog-page pt-lg--7 pb-lg--7 pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <Searcharea
                search={searchCourse}
                handleModal={handleModal}
                handleDeleteFilters={handleDeleteFilters}
              />
            </div>
            <div className="col-lg-12 pt-2 mb-4">
              <h2 className="fw-400 font-lg">Resultados</h2>
            </div>

            <ServiceList
              handleAlert={handleAlert}
              queryFilter={searchProductByQuery}
              filterSelected={filterSelected}
            />

            {isOpenFiltersModal && (
              <FiltersModal handleModal={handleModal} setFilters={setFilters} />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default ServicesGrid;
