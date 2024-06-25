import React, { Fragment } from "react";

import Adminsidebar from "../components/Adminsidebar";
import AdminTopnav from "../components/AdminTopnav";
import Adminfooter from "../components/Adminfooter";
import AddServiceForm from "../features/courses/AddServiceForm";

const AddServicePage = () => {
  return (
    <Fragment>
      <div id="wrapper">
        <Adminsidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <AdminTopnav />

            <div className="container px-3 py-4">
              <div className="row">
                <div className="col-lg-12 d-flex mb-4">
                  <h2 className="text-grey-900 font-md fw-700">
                    Añadir servicio
                  </h2>
                  <i className="ml-auto feather-command font-lg text-grey-500"></i>
                </div>
              </div>
              <AddServiceForm />
            </div>

            <Adminfooter />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddServicePage;