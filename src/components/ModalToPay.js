import { Link } from "react-router-dom";

import "../scss/components/custom-modal.scss";

const ModalToPay = ({ service, close }) => {
  const closeModal = () => {
    close();
  };
  console.log(service);
  return (
    <div className="custom-modal">
      <div className="col-8 contact-wrap bg-white shadow-lg rounded-lg position-relative top-0 modal-content">
        <h1 className="text-grey-900 fw-700 display3-size mb-5 lh-1 text-center">
          Terminal de pagos
        </h1>
        <div className="row">
          <div className="col-12">
            <div className="mb-3 md-mb-2">
              <div className="w-100 pb-1 modal-description">
                El precio final del servicio es de: {service?.service?.price}
              </div>
              <div className="w-100 pt-1 modal-description">
                Monto restante a abonar:
              </div>
            </div>

            <div className="mb-2 mt-2" onClick={closeModal}>
              <div className="m-auto rounded-lg style1-input mb-0 bg-current text-white text-center font-xss fw-500 border-0 p-2 w175">
                Cancelar
              </div>
            </div>

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

export default ModalToPay;
