import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/";
import axios from "axios";

import {
  selectAllCourses,
  fetchCourses,
  getCoursesStatus,
} from "./coursesSlice";

import Card from "../../components/Card";
import { FETCH_STATUS } from "../../utils";

const ServiceList = ({ limit = false, queryFilter, filterSelected }) => {
  const { LOADING, SUCCEEDED, IDLE } = FETCH_STATUS;
  const dispatch = useDispatch();

  const [elementsToShow, setElementsToShow] = useState([]);

  const serviceData = useSelector(selectAllCourses);
  const servicesStatus = useSelector(getCoursesStatus);

  useEffect(() => {
    if (servicesStatus === IDLE) {
      dispatch(fetchCourses());
    }
  }, [servicesStatus, dispatch, IDLE]);

  useEffect(() => {
    const getProducts = async () => {
      let data = serviceData || [];
      const filter = queryFilter?.toLowerCase() || "";
      // const filteredData = await filterByItems(filterSelected);
      // if (filteredData) {
      //   data = filteredData;
      // }

      data = data.length
        ? data.filter(({ guide }) =>
            guide.username.toLowerCase().includes(filter)
          )
        : data;
      console.log(data);
      setElementsToShow(data);
    };

    getProducts();
  }, [queryFilter, serviceData, filterSelected]);

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

  return servicesStatus === LOADING ? (
    <div className="pl-3">Cargando...</div>
  ) : !elementsToShow.length ? (
    <div className="pl-3">No se encontraron cursos</div>
  ) : (
    elementsToShow
      .slice(0, limit || elementsToShow.length)
      .map((serice) => <Card key={serice.id} service={serice} />)
  );
};

export default ServiceList;
