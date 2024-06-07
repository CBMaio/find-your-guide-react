import { useDispatch, useSelector } from "react-redux";
import { addNewRequest } from "./requestsSlice";

const RequestAplicationForm = ({ setFormStatus, courseId }) => {
  const dispatch = useDispatch();

  const sendForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!courseId) {
      alert("Por favor, asegurese de estar en un curso existente");
      return;
    }

    dispatch(addNewRequest({ ...data, course: courseId }));
    setFormStatus(true);
  };

  return (
    <form action="#" onSubmit={sendForm}>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="form-group mb-3">
            <input
              type="text"
              required
              name="name"
              className="form-control style2-input bg-color-none text-grey-700"
              placeholder="Nombre"
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group mb-3">
            <input
              required
              type="email"
              name="email"
              className="form-control style2-input bg-color-none text-grey-700"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="form-group mb-3">
            <input
              required
              type="text"
              name="hours"
              className="form-control style2-input bg-color-none text-grey-700"
              placeholder="Horario de contacto de preferencia"
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group mb-3">
            <input
              required
              type="number"
              name="phone"
              className="number-input form-control style2-input bg-color-none text-grey-700"
              placeholder="Número de contacto"
            />
          </div>
        </div>

        <div className="col-12">
          <div className="form-group mb-3 md-mb-2">
            <textarea
              placeholder="Mensaje"
              className="w-100 h125 style2-textarea p-3 form-control"
              name="message"
              required
            />
          </div>
          <div className="text-left mt-3 float-left md-mb-2">
            <div className="font-xsss text-grey-500 fw-500">
              Gracias por ser parte de{" "}
              <span className="text-grey-600 fw-600">nuestra comunidad</span>
            </div>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="rounded-lg style1-input float-right bg-current text-white text-center font-xss fw-500 border-2 border-0 p-0 w175"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RequestAplicationForm;
