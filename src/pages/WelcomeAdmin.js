import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/auth/authSlice";

import Adminsidebar from "../components/Adminsidebar";
import AdminTopnav from "../components/AdminTopnav";

import "../scss/pages/welcome-admin.scss";

const WelcomeAdmin = () => {
  const user = useSelector(selectUserInfo);
  if (!user) {
    localStorage.removeItem("userToken");
    return;
  }
  return (
    <Fragment>
      <div id="wrapper">
        <Adminsidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <AdminTopnav />

            <main className="main-section container px-3 py-4">
              <h1 className="col-12 display4-xs-size">
                Bienvenido/a,
                <br /> {user?.username || "Usuario"}!
              </h1>
              <div className="row">
                <div className="illustration-container">
                  <img
                    src="/assets/images/welcome-admin.svg"
                    alt="welcome illustration"
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WelcomeAdmin;
