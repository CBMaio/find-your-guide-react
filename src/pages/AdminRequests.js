import React, { Fragment } from "react";

import Adminsidebar from "../components/Adminsidebar";
import AdminTopnav from "../components/AdminTopnav";
import Adminfooter from "../components/Adminfooter";
import RequestsList from "../features/requests/RequestsList";

import "../scss/pages/admin-requests.scss";

const AdminRequests = () => {
  return (
    <Fragment>
      <div id="wrapper">
        <Adminsidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <AdminTopnav />
            <div className="requests-container">
              <RequestsList />
            </div>

            <Adminfooter />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminRequests;
