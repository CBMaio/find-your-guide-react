import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FETCH_STATUS } from "../../utils";
import { convertBase64 } from "../../utils";

import {
  fetchServiceById,
  getSelectedService,
  updateMyServiceById,
} from "./coursesSlice";

import "./styles/add-form.scss";
import { CustomAlert } from "../../components/CustomAlert";

const EditServiceForm = () => {
  const { IDLE, SUCCEEDED, LOADING } = FETCH_STATUS;
  const { serviceId } = useParams();

  let service = useSelector(getSelectedService);
  const status = useSelector((state) => state.courses.status);

  const [succeededEdit, setSucceededEdit] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState(IDLE);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();

  const handleFile = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setSelectedImage(base64);
  };

  const canSave = (values) =>
    Object.values(values).every(Boolean) && addRequestStatus === IDLE;

  const save = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formattedData = Object.fromEntries(formData.entries());
    let finalData = formattedData;

    if (!canSave(Object.values(formattedData))) return;

    try {
      setAddRequestStatus(LOADING);
      const data = { ...formattedData, id: serviceId };
      if (selectedImage) {
        finalData = { ...data, image: selectedImage };
      } else {
        finalData = data;
      }

      dispatch(updateMyServiceById(finalData)).unwrap();
      setSucceededEdit(true);
      e.target.reset();
    } catch (error) {
      console.error("Failed to save the service: ", error);
    } finally {
      setAddRequestStatus(IDLE);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    dispatch(fetchServiceById(serviceId));
  }, [serviceId, dispatch, IDLE]);

  if (!service && status !== IDLE) return;
  if (!service) service = {};
  return (
    <div className="row">
      <div className="col-lg-12">
        <form className="contact_form" name="contact_form" onSubmit={save}>
          <div className="card border-0 px-4 pt-4 mt-2 rounded-lg admin-form">
            <div className="card-body d-block">
              {succeededEdit && (
                <CustomAlert
                  isSuccess={true}
                  text="Servicio editado con éxito!"
                />
              )}

              <h4 className="font-xss text-grey-800 mb-4 mt-0 fw-700">
                Información del servicio
              </h4>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb30">
                    <label htmlFor="product_sku" className="form-label">
                      Nombre del servicio
                    </label>
                    <input
                      name="name"
                      className="form-control form_control"
                      type="text"
                      required
                      placeholder="Nombre"
                      defaultValue={service.name}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb30">
                    <label htmlFor="product_sku" className="form-label">
                      Fecha
                    </label>
                    <input
                      name="date"
                      className="form-control form_control"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      defaultValue={service.date}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb30">
                    <label className="form-label">Tipo de service</label>
                    <select
                      name="serviceType"
                      className="form-control form_control"
                      defaultValue={service.serviceType}
                    >
                      <option value="TOURS_INDIVIDUALES">Individual</option>
                      <option value="TOURS_GRUPALES">Grupal</option>
                      <option value="TRADUCCIONES">Traducción</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb30">
                    <label className="form-label">Cupo disponible</label>
                    <input
                      name="quantity"
                      className="number-input form-control form_control"
                      type="text"
                      placeholder="Cantidad de personas (solo número)"
                      defaultValue={service.quantity}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb30">
                    <label htmlFor="product_sku" className="form-label">
                      País
                    </label>
                    <input
                      className="number-input form-control form_control"
                      type="text"
                      placeholder="País"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb30">
                    <label htmlFor="product_sku" className="form-label">
                      Ciudad
                    </label>
                    <input
                      className="number-input form-control form_control"
                      type="text"
                      placeholder="Ciudad"
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <label className="form-label">Descripción</label>
                    <textarea
                      name="description"
                      className="form-control h150"
                      rows="6"
                      placeholder="Descripción del servicio"
                      defaultValue={service.description}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-0 px-4 pt-4 mt-2 rounded-lg admin-form">
            <div className="card-body d-block">
              <h4 className="font-xss text-grey-800 mb-4 mt-0 fw-700">
                Subir imagen
              </h4>
              <div className="form-group mb30">
                <div className="input-file-container">
                  <input
                    className="upload-file-input"
                    type="file"
                    onChange={(event) => handleFile(event)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card border-0 p-4 mt-3 rounded-10 admin-form">
            <div className="card-body d-block">
              <h4 className="font-xss text-grey-800 mb-4 mt-0 fw-700">
                Precio
              </h4>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb30">
                    <label htmlFor="product_sku" className="form-label">
                      Precio
                    </label>
                    <input
                      name="price"
                      className="form-control form_control"
                      type="text"
                      placeholder="($)"
                      defaultValue={service.price}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card align-items-center border-0 p-4 mt-3 rounded-10 admin-form">
            <button className="col-md-6 form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceForm;
