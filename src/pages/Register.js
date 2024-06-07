import React, { Fragment, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { registerUser } from "../features/auth/authActions";
import { getUserInfo } from "../features/auth/authActions";
import { API_URL } from "../features/constants";

import { isAuthenticated } from "../features/auth/authSlice";

import "../scss/pages/login-register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const isAuth = useSelector(isAuthenticated);

  const [userData, setUserData] = useState({});
  const [step, setStep] = useState(0);
  const [existingEmail, setExistingEmail] = useState(false);

  const updateStep = async (e, nextStep) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
    if (nextStep === 1 && !isValidPassword(data)) {
      return;
    }

    if (nextStep === 1) {
      // current step = 0
      const { email } = data;
      const invalidEmail = await isInvalidEmail(email);
      if (invalidEmail) {
        setExistingEmail(true);
        setTimeout(() => {
          setExistingEmail(false);
        }, 2000);
        return;
      }
    }

    if (nextStep === 2) {
      registrationAction(data);
      return;
    }

    delete data.confirmPassword;
    setUserData({ ...userData, ...data });
    setStep(nextStep);
  };

  const isValidPassword = (data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return false;
    }

    setUserData({ ...userData, ...data });
    return true;
  };

  const registrationAction = async (newData) => {
    const payload = { ...userData, ...newData };
    dispatch(registerUser(payload));
    setTimeout(() => {
      if (!loading && !error) {
        navigate("/login");
      }
    }, 1000);
  };

  const togglePw = (elementId) => {
    const element = document.querySelector(`#${elementId}`);
    element.type = element.type === "password" ? "text" : "password";
  };

  const isInvalidEmail = async (email) => {
    const AUTH_API_COMPLETE = `${API_URL}/users`;
    try {
      const response = await axios.get(
        `${AUTH_API_COMPLETE}/verify?email=${email}`
      );

      return response.data.message;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="main-wrap">
        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `url('assets/images/register.jpg')`,
            }}
          ></div>

          <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-lg overflow-hidden">
            <div className="card shadow-none border-0 ml-auto mr-auto login-card col-10">
              <div className="card-body rounded-0 text-left">
                <Link to="/">
                  <h1 className="fredoka-font ls-3 fw-700 text-current font-xxl">
                    MarketClass
                    <span className="d-block font-xsssss ls-1 text-grey-500 open-font ">
                      El camino hacia el éxito comienza aquí
                    </span>
                  </h1>
                </Link>
                <h2 className="fw-700 display1-size display2-md-size mb-4">
                  Crea tu cuenta <br />
                </h2>
                {/* Fitst step */}
                {step === 0 && (
                  <>
                    <form onSubmit={(e) => updateStep(e, 1)}>
                      <div className="form-group icon-input mb-3">
                        <i className="font-sm ti-user text-grey-500 pr-0"></i>
                        <input
                          required
                          type="text"
                          name="name"
                          className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                          placeholder="Nombre y apellido"
                        />
                      </div>

                      <div className="form-group icon-input mb-3">
                        <i className="font-sm ti-email text-grey-500 pr-0"></i>
                        <input
                          required
                          type="email"
                          name="email"
                          className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                          placeholder="Tu correo"
                        />
                        {existingEmail && (
                          <div className="font-xssss text-danger mb-2">
                            Email ya existente
                          </div>
                        )}
                      </div>
                      <div className="form-group icon-input mb-3">
                        <i className="font-sm feather-phone text-grey-500 pr-0"></i>
                        <input
                          required
                          name="number"
                          type="number"
                          className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600 number-input"
                          placeholder="Tu Número"
                        />
                      </div>

                      <div className="form-group icon-input mb-3">
                        <input
                          name="password"
                          id="password"
                          type="Password"
                          className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                          placeholder="Contraseña"
                        />
                        <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                        <i
                          onClick={() => togglePw("password")}
                          className="font-sm ti-eye text-grey-500 pr-0 toggle-pw-icon"
                        ></i>
                      </div>
                      <div className="form-group icon-input mb-1">
                        <input
                          name="confirmPassword"
                          id="confirm-password"
                          type="Password"
                          className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                          placeholder="Confirmar Contraseña"
                        />
                        <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                        <i
                          onClick={() => togglePw("confirm-password")}
                          className="font-sm ti-eye text-grey-500 pr-0 toggle-pw-icon"
                        ></i>
                      </div>

                      <div className="col-sm-12 p-0 text-left">
                        <div className="form-group mb-1">
                          <button className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">
                            Siguiente
                          </button>
                        </div>
                        <h6 className="text-grey-500 font-xssss fw-500 mt-0 mb-0 lh-32">
                          Ya estas registrado?{" "}
                          <a href="/login" className="link fw-700 ml-1">
                            Iniciar sesión
                          </a>
                        </h6>
                      </div>
                    </form>
                  </>
                )}

                {/* Second step */}
                {step === 1 && (
                  <>
                    <form onSubmit={(e) => updateStep(e, 2)}>
                      <div className="form-group icon-input mb-3">
                        <i className="font-sm ti-user text-grey-500 pr-0"></i>
                        <input
                          required
                          name="degree"
                          type="text"
                          className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                          placeholder="Titulo"
                        />
                      </div>
                      <div className="form-group icon-input mb-3">
                        <i className="font-sm ti-user text-grey-500 pr-0"></i>
                        <textarea
                          name="experience"
                          className="pl-5 form-control text-grey-900 font-xsss fw-600"
                          required
                          rows="2"
                          placeholder="Experiencia Profesional"
                        ></textarea>
                      </div>

                      <div className="col-sm-12 p-0 text-left">
                        <div className="form-group mb-1">
                          <button className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">
                            {loading ? "Cargando" : "Registrarme"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
