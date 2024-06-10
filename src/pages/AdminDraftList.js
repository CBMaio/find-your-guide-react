import React, { Fragment, useState } from "react";

import Adminsidebar from "../components/Adminsidebar";
import AdminTopnav from "../components/AdminTopnav";
import Adminfooter from "../components/Adminfooter";
import Pagination from "../components/Pagination";
import DraftCoursesList from "../features/courses/DraftCoursesList";
import { BREAKPOIN_SMALL } from "../utils";

import "../scss/pages/admin-product-list.scss";

const AdminDraftList = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOIN_SMALL);

  const onResizeScrren = () => {
    setIsMobile(window.innerWidth < BREAKPOIN_SMALL);
  };

  window.addEventListener("resize", () => onResizeScrren());
  return (
    <Fragment>
      <div id="wrapper">
        <Adminsidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="admin-product-list-main">
            <AdminTopnav />

            <div className="container min-height-container px-3 py-4">
              <div className="row">
                <div className="col-lg-12 mt-4">
                  <div className="card border-0 mt-2 rounded-10">
                    <div className="card-body d-flex px-4 pb-0 pt-4">
                      <h4 className="font-xss text-grey-800 mt-3 fw-700">
                        Lista de cursos sin publicar
                      </h4>
                    </div>
                    <div className="card-body p-4">
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
                                  Categoria
                                </th>
                                <th className="border-0" scope="col">
                                  Frecuencia
                                </th>
                                <th scope="col" className="text-right border-0">
                                  Acciones
                                </th>
                              </tr>
                            </thead>
                            <tbody>{/* <DraftCoursesList /> */}</tbody>
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
                            <div>{/* <DraftCoursesList /> */}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <Pagination divClass="pagination justify-content-center mt-5" /> */}
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

export default AdminDraftList;
