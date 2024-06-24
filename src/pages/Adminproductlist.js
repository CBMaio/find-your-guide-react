import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import Adminsidebar from "../components/Adminsidebar";
import AdminTopnav from "../components/AdminTopnav";
import Adminfooter from "../components/Adminfooter";
import MyCoursesList from "../features/courses/MyCoursesList";
import { BREAKPOIN_SMALL } from "../utils";
import { isGuide, isTourist } from "../features/auth/authSlice";

import "../scss/pages/admin-product-list.scss";

const Adminproductlist = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOIN_SMALL);
  const isGuideUser = useSelector(isGuide);
  const isTouristUser = useSelector(isTourist);
  const onResizeScrren = () => {
    setIsMobile(window.innerWidth < BREAKPOIN_SMALL);
  };

  window.addEventListener("resize", () => onResizeScrren());
  return (
    <Fragment>
      <div id="wrapper">
        <Adminsidebar />

        <div
          id="content-wrapper"
          className="d-flex flex-column admin-product-list-section"
        >
          <div id="content" className="admin-product-list-main">
            <AdminTopnav />

            <div className="container min-height-container px-3 py-4">
              <div className="row">
                <div className="col-lg-12 mt-4">
                  <div className="card border-0 mt-2 rounded-10">
                    <div className="card-body d-flex px-4 pb-0 pt-4">
                      <h4 className="font-xss text-grey-800 mt-3 fw-700">
                        {isGuideUser && <span>Mis servicios publicados</span>}
                        {isTouristUser && (
                          <span>Mis servicios contratados</span>
                        )}
                      </h4>
                    </div>
                    <div className="card-body p-2">
                      {!isMobile ? (
                        <div className="table-responsive desktop-view">
                          <table className="table table-admin mb-0">
                            <thead className="bg-greylight rounded-10 ovh">
                              <tr>
                                <th className="border-0"></th>
                                <th className="border-0" scope="col">
                                  Nombre
                                </th>
                                <th className="border-0" scope="col">
                                  Precio
                                </th>
                                <th className="border-0" scope="col">
                                  Tipo de servicio
                                </th>
                                <th className="border-0" scope="col">
                                  Descripción
                                </th>
                                <th scope="col" className="text-right border-0">
                                  Acciones
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <MyCoursesList />
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="table-responsive mobile-view">
                          <div className="table table-admin mb-0">
                            <div className="bg-greylight rounded-10 ovh">
                              <div className="table-header">
                                <div className="border-0 title-header">
                                  Nombre
                                </div>
                              </div>
                            </div>
                            <div>
                              <MyCoursesList />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Adminfooter />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Adminproductlist;
