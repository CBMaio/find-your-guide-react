import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo } from "../features/auth/authSlice";
import { updateUser } from "../features/auth/authActions";
import Adminsidebar from "../components/Adminsidebar";
import AdminTopnav from "../components/AdminTopnav";
import { convertBase64 } from "../utils";

import "../scss/pages/account-info.scss";

const Accountinfo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo) || {};
  const { loading } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);

  const updateAccount = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formattedData = Object.fromEntries(formData.entries());
    let finalData = formattedData;

    if (selectedImage) {
      finalData = { ...formattedData, picture: selectedImage };
    }

    dispatch(updateUser(finalData));
  };

  const handleFile = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setSelectedImage(base64);
  };

  const deleteImg = () => {
    setSelectedImage(null);
  };

  return (
    <Fragment>
      <div id="wrapper">
        <Adminsidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <AdminTopnav />

            <main className="main-section container px-3 py-4">
              <div className="card col-md-8 w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                  <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                    Detalles de la cuenta
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 text-center">
                      <figure className="avatar ml-auto mr-auto mb-0 mt-2 w100">
                        {userInfo.picture && (
                          <img
                            src={selectedImage || userInfo.picture}
                            id="imageProfile"
                            alt="avater"
                            className="shadow-sm rounded-lg w-100 account-user-img"
                          />
                        )}

                        <input
                          className="account-input-file"
                          type="file"
                          name="myImage"
                          onChange={(event) => handleFile(event)}
                        />
                      </figure>
                      {selectedImage && (
                        <div
                          className="mt-3 text-danger font-xssss delete-img-text"
                          onClick={deleteImg}
                        >
                          Eliminar Imagen
                        </div>
                      )}

                      <h2 className="fw-700 font-sm text-grey-900 mt-3">
                        {userInfo.name}{" "}
                      </h2>
                      <h4 className="text-grey-500 fw-500 mb-3 font-xsss mb-4">
                        {userInfo.degree}
                      </h4>
                    </div>
                  </div>

                  <form onSubmit={updateAccount}>
                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label
                            htmlFor="name"
                            className="mont-font fw-600 font-xsss"
                          >
                            Nombre Completo
                          </label>
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            defaultValue={userInfo.name}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label
                            htmlFor="email"
                            className="mont-font fw-600 font-xsss"
                          >
                            Email
                          </label>
                          <input
                            disabled
                            name="email"
                            type="text"
                            className="form-control"
                            defaultValue={userInfo.email}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label
                            htmlFor="number"
                            className="mont-font fw-600 font-xsss"
                          >
                            Teléfono
                          </label>
                          <input
                            name="number"
                            type="text"
                            className="form-control"
                            defaultValue={userInfo.number}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label
                            htmlFor="qualifications"
                            className="mont-font fw-600 font-xsss"
                          >
                            Título
                          </label>
                          <input
                            name="degree"
                            type="text"
                            className="form-control"
                            defaultValue={userInfo.degree}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Experiencia profesional
                          </label>
                          <input
                            name="experience"
                            type="text"
                            className="form-control"
                            defaultValue={userInfo.experience}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <button
                          type="submit"
                          className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block outline-none w-100"
                        >
                          {loading ? "Cargando" : "Guardar"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Accountinfo;
