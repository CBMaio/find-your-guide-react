import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getUserData } from "../features/auth/authActions";
import { isAuthenticated } from "../features/auth/authSlice";
import { USER_ROL } from "../utils";
import "../scss/pages/login-register.scss";
import "../scss/variables.scss";
import { CustomAlert } from "../components/CustomAlert";

const Login = () => {
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.auth);
  const isAuth = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const [userRol, setUserRol] = useState(USER_ROL.UNDEFINED);
  const [displayCustomAlert, setDisplayCustomAlert] = useState({
    display: false,
    isSuccess: false,
    text: "",
  });

  const validateUser = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
    dispatch(loginUser({ user: data, type: userRol }));

    if (userInfo) {
      navigate("/welcome-admin");
    }
  };

  const togglePw = (elementId) => {
    const element = document.querySelector(`#${elementId}`);
    element.type = element.type === "password" ? "text" : "password";
  };

  const setRol = (rol) => {
    setUserRol(rol);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/welcome-admin");
      dispatch(getUserData({ user: userInfo.username, type: userInfo.type }));
    }

    if (error) {
      setDisplayCustomAlert({
        display: true,
        isSuccess: false,
        text: "Hubo un error. Por favor inténtelo nuevamente",
      });
    }
  }, [error, userInfo, isAuth]);

  return (
    <Fragment>
      <div className="main-wrap">
        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `url('assets/images/login.jpg')`,
              backgroundPosition: "center",
            }}
          ></div>

          <div className="col-xl-7 vh-lg-100 align-items-center d-flex bg-white rounded-lg overflow-hidden">
            <div className="card shadow-none border-0 ml-auto mr-auto login-card col-10">
              <div className="card-body rounded-0 text-left">
                <Link to="/">
                  <h1 className="fredoka-font ls-3 fw-700 text-current font-xxl">
                    TourFinder
                    <span className="d-block font-xsssss ls-1 text-grey-500 open-font ">
                      Tu guía perfecto para cada destino
                    </span>
                  </h1>
                </Link>
                <h2 className="fw-700 display1-size display2-md-size mb-3">
                  Iniciar Sesión <br />
                </h2>

                {displayCustomAlert.display && (
                  <CustomAlert
                    isSuccess={displayCustomAlert.isSuccess}
                    text={displayCustomAlert.text}
                  />
                )}

                {userRol === USER_ROL.UNDEFINED ? (
                  <>
                    <div className="form-group mb-1">
                      <button
                        onClick={() => setRol(USER_ROL.GUIDE)}
                        className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 mb-3"
                      >
                        Soy guía
                      </button>
                    </div>

                    <div className="form-group mb-1">
                      <button
                        onClick={() => setRol(USER_ROL.TOURIST)}
                        className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                      >
                        Soy turista
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={validateUser}>
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-email text-grey-500 pr-0"></i>
                      <input
                        type="text"
                        // required
                        className="style2-input pl-5 form-control text-grey-900 font-xssss fw-600"
                        placeholder="Nombre de usuario"
                        name="username"
                      />
                    </div>
                    <div className="form-group icon-input mb-1">
                      <input
                        type="Password"
                        // required
                        id="password"
                        className="style2-input pl-5 form-control text-grey-900 font-xssss ls-3"
                        placeholder="Contraseña"
                        name="password"
                      />
                      <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                      <i
                        onClick={() => togglePw("password")}
                        className="font-sm ti-eye text-grey-500 pr-0 toggle-pw-icon"
                      ></i>
                    </div>
                    {error && (
                      <div className="font-xssss text-danger mb-2">
                        Usuario o contraseña incorrectos
                      </div>
                    )}

                    <div className="form-check text-left mb-5">
                      <a
                        href="/forgot"
                        className="fw-600 font-xssss text-grey-700 mt-1 float-right"
                      >
                        Olvidaste tu contraseña?
                      </a>
                    </div>
                    <div className="col-sm-12 p-0 text-left">
                      <div className="form-group mb-1">
                        <button
                          type="submit"
                          className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                        >
                          {loading ? "Cargando" : "Iniciar sesión"}
                        </button>
                      </div>
                      <h6 className="text-grey-500 font-xssss fw-500 mt-0 mb-0 lh-32">
                        No tienes una cuenta?{" "}
                        <a href="/register" className="link fw-700 ml-1">
                          Registrarme
                        </a>
                      </h6>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
