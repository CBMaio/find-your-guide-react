import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategories, getCategories } from "../categories/categorySlice";
import { FETCH_STATUS } from "../../utils";
import { convertBase64 } from "../../utils";

import {
  fetchMyCourseById,
  selectedCourse,
  updateMyCourseById,
} from "./coursesSlice";

import "./styles/add-course-form.scss";
import { CustomAlert } from "../../components/CustomAlert";

const EditCourseForm = () => {
  const { IDLE, SUCCEEDED, LOADING } = FETCH_STATUS;
  const { courseId } = useParams();
  let course = useSelector(selectedCourse);
  console.log(course);
  const status = useSelector((state) => state.courses.myCourses.status);
  const { status: statusCategory } = useSelector((state) => state.category);
  const categories = useSelector(getCategories);

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

  const saveCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formattedData = Object.fromEntries(formData.entries());
    let finalData = formattedData;

    if (!canSave(Object.values(formattedData))) return;

    try {
      setAddRequestStatus(LOADING);
      const data = { ...formattedData, _id: courseId };
      if (selectedImage) {
        finalData = { ...data, image: selectedImage };
      } else {
        finalData = data;
      }
      dispatch(updateMyCourseById(finalData)).unwrap();
      setSucceededEdit(true);
      e.target.reset();
    } catch (error) {
      console.error("Failed to save the course: ", error);
    } finally {
      setAddRequestStatus(IDLE);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    dispatch(fetchMyCourseById(courseId));

    if (statusCategory === IDLE) {
      dispatch(fetchCategories());
    }
  }, [courseId, dispatch, IDLE, statusCategory, status]);

  if (!course && status !== IDLE) return;
  if (!course) course = {};
  return (
    <div className="row">
      <div className="col-lg-12">
        <form
          className="contact_form"
          name="contact_form"
          onSubmit={saveCourse}
        >
          <div className="card border-0 px-4 pt-4 mt-2 rounded-lg admin-form">
            <div className="card-body d-block">
              {succeededEdit && (
                <CustomAlert isSuccess={true} text="Curso editado con éxito!" />
              )}

              <h4 className="font-xss text-grey-800 mb-4 mt-0 fw-700">
                Información del curso
              </h4>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb30">
                    <label htmlFor="product_sku" className="form-label">
                      Título
                    </label>
                    <input
                      name="title"
                      className="form-control form_control"
                      type="text"
                      required
                      placeholder="Título"
                      defaultValue={course.title}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb30">
                    <label className="form-label">Categoría</label>
                    <select
                      name="category"
                      required
                      className="form-control form_control"
                      defaultValue={course.category?._id}
                    >
                      {categories.map(({ _id: id, title }) => (
                        <option key={id} value={id}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb30">
                    <label htmlFor="product_sku" className="form-label">
                      Duración del curso
                    </label>
                    <input
                      name="duration"
                      className="form-control form_control"
                      type="text"
                      placeholder="Duración (Semanas)"
                      required
                      defaultValue={course.duration}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb30">
                    <label className="form-label">Frecuencia</label>
                    <select
                      name="frequency"
                      required
                      className="form-control form_control"
                      defaultValue={course.frequency}
                    >
                      <option value="unica">Unica</option>
                      <option value="semanal">Semanal</option>
                      <option value="mensual">Mensual</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group mb30">
                    <label className="form-label">Tipo de curso</label>
                    <select
                      name="type"
                      required
                      className="form-control form_control"
                      defaultValue={course.type}
                    >
                      <option value="individual">Individual</option>
                      <option value="grupal">Grupal</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="product_sku" className="form-label">
                      Descripción
                    </label>
                    <textarea
                      required
                      name="description"
                      className="form-control h150"
                      rows="6"
                      placeholder="Descripción del curso"
                      defaultValue={course.description}
                    ></textarea>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="product_sku" className="form-label">
                      Requisitos
                    </label>
                    <textarea
                      name="requirements"
                      required
                      className="form-control h150"
                      rows="6"
                      placeholder="Requisitos del curso"
                      defaultValue={course.requirements}
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
                    name="course-image"
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
                      defaultValue={course.price}
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

export default EditCourseForm;
