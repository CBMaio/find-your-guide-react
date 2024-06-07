import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { selectCoursesByAuthor } from "../courses/coursesSlice";
import {
  selectAuthorById,
  selectAuthorStatus,
  fetchAuthors,
} from "./authorsSlice";
import CourseCard from "../../components/CourseCard";

const AuthorData = () => {
  const { authorId } = useParams();
  const authorStatus = useSelector(selectAuthorStatus);
  const author = useSelector((state) => selectAuthorById(state, authorId));
  const dispatch = useDispatch();

  const coursesForAuthor = useSelector((state) =>
    selectCoursesByAuthor(state, authorId)
  );

  useEffect(() => {
    if (authorStatus === "idle") {
      dispatch(fetchAuthors());
    }
  });

  if (!author) {
    return <section>Autor no encontrado!</section>;
  }

  const { name, email, experience, degree, picture } = author;

  return (
    <div className="course-details pb-lg--7 pt-4 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="middle-sidebar-left">
              <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden mb-3">
                <div className="card-body p-lg-5 p-4 bg-black-08">
                  <div className="clearfix"></div>
                  <div className="row">
                    <div className="col-lg-12 pl-xl-5 pt-xl-5">
                      <figure className="avatar ml-0 mb-4 position-relative w100 z-index-1">
                        <img
                          src={`${
                            picture || "/assets/images/learn-illustration.svg"
                          }`}
                          alt="avater"
                          className="float-right p-1 bg-white w-100"
                        />
                      </figure>
                    </div>
                    <div className="col-xl-4 col-lg-6 pl-xl-5 pb-xl-5 pb-3">
                      <h4 className="fw-700 font-md text-white mt-3 mb-1">
                        {name}
                      </h4>
                      <span className="font-xssss fw-600 text-grey-500 d-inline-block ml-0">
                        {email}
                      </span>
                      <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
                    </div>
                  </div>
                </div>
              </div>

              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3 nav nav-tabs profile xs-p-4 d-flex align-items-center justify-content-around product-info-tab border-bottom-0 bg-white shadow-xss rounded-lg"
              >
                <Tab eventKey="profile" title="Perfil">
                  <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                    <div className="card-body mb-lg-3 pb-0">
                      <h2 className="fw-400 font-lg d-block">
                        <b>Sobre mí</b>
                      </h2>
                    </div>
                    <div className="card-body pb-0">
                      <div className="row">
                        <div className="col-xl-12">
                          <p className="font-xssss fw-600 lh-28 text-grey-500 pl-0">
                            {experience}
                          </p>
                          <p className="font-xssss fw-600 lh-28 text-grey-500 pl-0">
                            {degree}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="courses" title="Cursos">
                  <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                    <div className="card-body mb-lg-3 pb-0">
                      <h2 className="fw-400 font-lg d-block">
                        Mis <b>Cursos</b>
                      </h2>
                    </div>
                    <div className="card-body pb-0">
                      <div className="row">
                        {coursesForAuthor.map((value) => (
                          <CourseCard course={value} key={value._id} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorData;
