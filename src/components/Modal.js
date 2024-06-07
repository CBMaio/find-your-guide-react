import { Link } from "react-router-dom";

import "../scss/components/custom-modal.scss";

const Modal = ({
  title,
  description,
  secondBtn = false,
  textSecondBtn = "",
  action,
}) => {
  return (
    <div className="custom-modal">
      <div className="col-8 contact-wrap bg-white shadow-lg rounded-lg position-relative top-0 modal-content">
        <h1 className="text-grey-900 fw-700 display3-size mb-5 lh-1 text-center">
          {title}
        </h1>
        <div className="row">
          <div className="col-12">
            <div className="mb-3 md-mb-2">
              <div className="w-100 p-3 modal-description">{description}</div>
            </div>

            {secondBtn && (
              <div className="mb-2">
                <div className="w-100 p-3 modal-description">
                  {textSecondBtn}
                </div>
                <div
                  onClick={action}
                  className="m-auto rounded-lg style1-input mb-0 bg-current text-white text-center font-xss fw-500 border-0 p-2 w175"
                >
                  Reenviar
                </div>
              </div>
            )}

            <div className="form-group mb-0">
              <Link
                to="/"
                className="m-auto rounded-lg style1-input mb-0 bg-current text-white text-center font-xss fw-500 border-0 p-0 w175"
              >
                Ir al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
