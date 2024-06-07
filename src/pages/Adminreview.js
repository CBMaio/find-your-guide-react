import React, { Fragment } from "react";

import Adminsidebar from "../components/Adminsidebar";
import AdminTopnav from "../components/AdminTopnav";
import Adminfooter from "../components/Adminfooter";
import CommentList from "../features/comments/CommentList";

const Adminreview = () => {
  return (
    <Fragment>
      <div id="wrapper">
        <Adminsidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <AdminTopnav />
            <CommentList />

            <Adminfooter />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Adminreview;
