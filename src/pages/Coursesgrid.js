import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Searcharea from "../components/Searcharea";
import CourseList from "../features/courses/CourseList";
import FiltersModal from "../components/FiltersModal";

const Coursesgrid = () => {
  const [searchProductByQuery, setSearchProductByQuery] = useState(null);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(false);
  const [filterSelected, setFiltersSelected] = useState({});

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

  return (
    <Fragment>
      <Header />

      <div className="blog-page pt-lg--7 pb-lg--7 pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <Searcharea search={searchCourse} handleModal={handleModal} />
            </div>
            <div className="col-lg-12 pt-2 mb-4">
              <h2 className="fw-400 font-lg">Resultados</h2>
            </div>

            {/* <CourseList
              queryFilter={searchProductByQuery}
              filterSelected={filterSelected}
            /> */}

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

export default Coursesgrid;
