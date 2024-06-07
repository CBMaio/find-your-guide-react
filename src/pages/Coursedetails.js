import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SingleCoursePage from "../features/courses/SingleCoursePage";

const Coursedetails = () => {
  return (
    <Fragment>
      <Header />
      <div className="course-details pt-lg--7 pb-lg--7 pt-5 pb-5">
        <div className="container">
          <SingleCoursePage />
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default Coursedetails;
