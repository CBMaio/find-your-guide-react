import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendEmailForReset } from "../features/auth/authActions";
import Modal from "../components/Modal";

const Forgot = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [submittedForm, setSubmittedForm] = useState(false);
  const [exitMessage, setExitMessage] = useState({
    title: "",
    description: "",
  });

  const sendForm = () => {
    if (!email) return;
    dispatch(sendEmailForReset(email));
    setExitMessage({
      title: "Petición enviada correctamente!",
      description:
        "Dentro de los próximos minutos recibirá un mail con las instrucciones para el cambio de contraseña. Muchas gracias!",
    });
    setSubmittedForm(true);
  };

  return (
    <Fragment>
      {!submittedForm ? (
        <div className="main-wrap">
          <div className="row">
            <div
              className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
              style={{
                backgroundImage: `url('assets/images/register.jpg')`,
              }}
            ></div>

            <div className="col-xl-7 vh-lg-100 align-items-center d-flex bg-white rounded-lg overflow-hidden">
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
                    Restablecer <br />
                    contraseña
                  </h2>
                  <form className="mb-4">
                    <div className="form-group icon-input mb-3">
                      <input
                        type="email"
                        className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <i className="font-sm ti-email text-grey-500 pr-0"></i>
                    </div>

                    <div className="col-sm-12 p-0 text-left">
                      <div className="form-group mb-1">
                        <button
                          type="submit"
                          onClick={sendForm}
                          className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Modal
          title={exitMessage.title}
          description={exitMessage.description}
        />
      )}
    </Fragment>
  );
};

export default Forgot;
