import { Link } from "react-router-dom";

import "../scss/components/custom-modal.scss";
import axiosInstance from "../services/AxiosInstance";

const ModalToPay = ({ service, close }) => {
  const BASE_URL = process.env.REACT_APP_JAVA_BACK_URL;
  const closeModal = () => {
    close();
  };

  const handdleFullPay = () => {
    const response = axiosInstance.put(`${BASE_URL}/api/v1/buys/status`, {
      id: service?.id,
      status: "FULL_PAID",
    });
    window.location.reload();
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
                Monto restante a abonar:{" "}
                {service?.service?.price - service?.balancePaid}
              </div>
            </div>

            {service?.status !== "PENDING" ? (
              <>
                <div className="mb-2 mt-2" onClick={handdleFullPay}>
                  <div className="m-auto rounded-lg style1-input mb-0 bg-current text-white text-center font-xss fw-500 border-0 p-2 w175">
                    Pagar
                  </div>
                </div>
                <div className="form-group mb-0" onClick={closeModal}>
                  <div className="m-auto rounded-lg style1-input mb-0 bg-current text-white text-center font-xss fw-500 border-0 p-0 w175">
                    Cancelar
                  </div>
                </div>
              </>
            ) : (
              <div className="form-group mb-0" onClick={closeModal}>
                <div className="m-auto rounded-lg style1-input mb-0 bg-current text-white text-center font-xss fw-500 border-0 p-0 w175">
                  Espera a que el guia acepte tu viaje
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalToPay;
