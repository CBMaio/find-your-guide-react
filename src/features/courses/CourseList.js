import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/";
import axios from "axios";
import {
  selectAllCourses,
  fetchCourses,
  getCoursesStatus,
} from "./coursesSlice";
import { fetchAuthors } from "../authors/authorsSlice";
import CourseCard from "../../components/CourseCard";
import { FETCH_STATUS } from "../../utils";

const CourseList = ({ limit = false, queryFilter, filterSelected }) => {
  const { LOADING, SUCCEEDED, IDLE } = FETCH_STATUS;
  const dispatch = useDispatch();
  const [coursesToShow, setCoursesToShow] = useState([]);
  const courseData = useSelector(selectAllCourses);
  const coursesStatus = useSelector(getCoursesStatus);

  const authorsStatus = useSelector((state) => state.authors.status);

  useEffect(() => {
    if (coursesStatus === IDLE) {
      dispatch(fetchCourses());
    }

    // if (authorsStatus === IDLE) {
    //   dispatch(fetchAuthors());
    // }
  }, [coursesStatus, authorsStatus, dispatch, IDLE]);

  useEffect(() => {
    const getProducts = async () => {
      let data = courseData || [];
      const filter = queryFilter?.toLowerCase() || "";
      // const filteredData = await filterByItems(filterSelected);
      // if (filteredData) {
      //   data = filteredData;
      // }

      data = data.length
        ? data.filter(({ name }) => name.toLowerCase().includes(filter))
        : data;
      console.log(data);
      setCoursesToShow(data);
    };

    getProducts();
  }, [queryFilter, courseData, filterSelected]);

  // const filterByItems = async (filters) => {
  //   console.log(filters);
  //   if (!filters) {
  //     return null;
  //   }
  //   const { category = "", frequency = "", ranking = "", type = "" } = filters;
  //   const params = `type=${type}&frequency=${frequency}&category=${category}&avg_rating=${ranking}`;
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_JAVA_BACK_URL}/course?${params}`
  //   );

  //   if (response.status === 200) {
  //     return response.data.data;
  //   }
  // };

  return coursesStatus === LOADING ? (
    <div className="pl-3">Cargando...</div>
  ) : !coursesToShow.length ? (
    <div className="pl-3">No se encontraron cursos</div>
  ) : (
    coursesToShow
      .slice(0, limit || coursesToShow.length)
      .map((serice) => <CourseCard key={serice.id} service={serice} />)
  );
};

export default CourseList;
