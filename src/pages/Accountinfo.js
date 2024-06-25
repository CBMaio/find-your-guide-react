import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isGuide, selectUserInfo } from "../features/auth/authSlice";
import { updateUser } from "../features/auth/authActions";
import { CustomAlert } from "../components/CustomAlert";
import Adminsidebar from "../components/Adminsidebar";
import AdminTopnav from "../components/AdminTopnav";
import { convertBase64 } from "../utils";

import "../scss/pages/account-info.scss";

const Accountinfo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo) || {};
  const isUserGuide = useSelector(isGuide);
  const { loading, error, success } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [credentialImage, setCredentialImage] = useState(null);
  const [displayCustomAlert, setDisplayCustomAlert] = useState({
    display: false,
    isSuccess: false,
    text: "",
  });
  const userImage = userInfo.picture || "../assets/images/user.png";
  const defaultImage = "../assets/images/user.png";

  const updateAccount = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formattedData = Object.fromEntries(formData.entries());
    let finalData = {
      ...formattedData,
      username: userInfo.username,
      email: userInfo.email,
    };

    if (credentialImage) {
      finalData = {
        ...finalData,
        credentialPhoto: "credentialImage",
      };
    }

    dispatch(updateUser({ user: finalData, type: userInfo.type }));
  };

  const handleFile = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    if (event.target.name === "credentialPhoto") {
      setCredentialImage(base64);
      return;
    }

    setSelectedImage(base64);
  };

  const deleteImg = () => {
    setSelectedImage(null);
  };

  const handleSuccess = () => {
    setDisplayCustomAlert({
      display: true,
      isSuccess: true,
      text: "Datos actualizados! Vuelva a iniciar sesión para ver sus cambios",
    });

    setTimeout(() => {
      setDisplayCustomAlert({
        display: false,
      });
    }, 2000);
  };

  const handleError = () => {
    setDisplayCustomAlert({
      display: true,
      isSuccess: false,
      text: "Hubo un error actualizando sus datos. Por favor inténtelo nuevamente",
    });

    setTimeout(() => {
      setDisplayCustomAlert({
        display: false,
      });
    }, 2000);
  };

  useEffect(() => {
    setDisplayCustomAlert({ display: false });

    if (error) {
      handleError();
    }

    if (success) {
      handleSuccess();
    }
  }, [loading, error, success]);

  return (
    <Fragment>
      <div id="wrapper">
        <Adminsidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <AdminTopnav />

            {displayCustomAlert.display && (
              <CustomAlert
                isSuccess={displayCustomAlert.isSuccess}
                text={displayCustomAlert.text}
              />
            )}

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
                        {userImage && (
                          <img
                            src={selectedImage || userImage}
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
                        {userInfo.username}
                      </h2>
                      <h4 className="text-grey-500 fw-500 mb-3 font-xsss mb-4">
                        Perfil: {isUserGuide ? "Guía" : "Turista"}
                      </h4>
                    </div>
                  </div>

                  <form onSubmit={updateAccount}>
                    <div className="row">
                      <div className="col-lg-6 col-12 mb-3">
                        <div className="form-group">
                          <label
                            htmlFor="name"
                            className="mont-font fw-600 font-xsss"
                          >
                            Nombre
                          </label>
                          <input
                            name="firstName"
                            type="text"
                            className="form-control"
                            defaultValue={userInfo.firstName}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-12 mb-3">
                        <div className="form-group">
                          <label
                            htmlFor="name"
                            className="mont-font fw-600 font-xsss"
                          >
                            Apellido
                          </label>
                          <input
                            name="lastName"
                            type="text"
                            className="form-control"
                            defaultValue={userInfo.lastName}
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
                            name="phone"
                            type="text"
                            className="form-control"
                            defaultValue={userInfo.phone}
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
                            Sexo
                          </label>
                          <input
                            name="gender"
                            type="text"
                            className="form-control"
                            defaultValue={userInfo.gender}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            DNI
                          </label>
                          <input
                            name="dni"
                            type="text"
                            className="form-control"
                            defaultValue={userInfo.dni}
                          />
                        </div>
                      </div>
                      {isUserGuide && (
                        <>
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss">
                                Lenguaje
                              </label>
                              <select
                                name="language"
                                type="text"
                                className="style2-input form-control font-xsss fw-600"
                                placeholder="Lenguaje"
                              >
                                <option value="ES">Español</option>
                                <option value="EN">Inglés</option>
                                <option value="RU">Ruso</option>
                                <option value="GER">Aleman</option>
                                <option value="POR">Portugués</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss">
                                Foto de credencial
                              </label>
                              <figure className="avatar ml-auto mr-auto mb-0 mt-2">
                                <img
                                  src={credentialImage || defaultImage}
                                  id="imageProfile"
                                  alt="avater"
                                  className="shadow-sm rounded-lg account-user-img"
                                />

                                <input
                                  className="account-input-file"
                                  type="file"
                                  onChange={(event) => handleFile(event)}
                                />
                              </figure>
                            </div>
                          </div>
                        </>
                      )}
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
