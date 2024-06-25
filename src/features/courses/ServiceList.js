import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/";
import axios from "axios";

import {
  selectAllCourses,
  fetchCourses,
  getCoursesStatus,
} from "./coursesSlice";

import Card from "../../components/Card";
import { FETCH_STATUS, isEmptyObject } from "../../utils";
import axiosInstance from "../../services/AxiosInstance";

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
      const filteredData = await filterByItems(filterSelected);

      if (filteredData) {
        const usernamesList = filteredData.map(({ username }) => username);
        data = data.filter(({ guide }) =>
          usernamesList.includes(guide.username)
        );
      }

      setElementsToShow(data);
    };

    getProducts();
  }, [queryFilter, serviceData, filterSelected]);

  const filterByItems = async (filters) => {
    if (isEmptyObject(filters)) {
      return;
    }

    const endpoint = `${process.env.REACT_APP_JAVA_BACK_URL}/api/v1/user`;
    const queryString = Object.entries(filters)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    const url = `${endpoint}?${queryString}`;
    const { data } = await axiosInstance.get(url);

    if (data.statusCode === "OK") {
      return data.data;
    }
  };

  return servicesStatus === LOADING ? (
    <div className="pl-3">Cargando...</div>
  ) : !elementsToShow.length ? (
    <div className="pl-3">No se encontraron coincidencias con la búsqueda</div>
  ) : (
    elementsToShow
      .slice(0, limit || elementsToShow.length)
      .map((serice) => <Card key={serice.id} service={serice} />)
  );
};

export default ServiceList;
