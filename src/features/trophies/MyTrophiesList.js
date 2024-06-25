import { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { BREAKPOIN_SMALL, FETCH_STATUS } from "../../utils";
import {
  fetchTrophies,
  getAllTrophies,
  getTrophiesStatus,
} from "./trophySlice";

const MyTrophiesList = () => {
  const dispatch = useDispatch();
  const contextStatus = useSelector(getTrophiesStatus);
  const trophiesData = useSelector(getAllTrophies);

  const [selectedService, setSelectedService] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOIN_SMALL);

  const { IDLE } = FETCH_STATUS;

  const onResizeScrren = () => {
    setIsMobile(window.innerWidth < BREAKPOIN_SMALL);
  };

  window.addEventListener("resize", () => onResizeScrren());

  const openModal = (course) => {
    setSelectedService(course);
    setIsOpenModal(true);
  };

  const closeModal = () => setIsOpenModal(false);

  useEffect(() => {
    if (contextStatus === IDLE) {
      dispatch(fetchTrophies());
    }
  }, [contextStatus, dispatch, IDLE]);

  return (
    <>
      {trophiesData &&
        trophiesData.map((value) => (
          <Fragment key={value.id}>
            {!isMobile ? (
              <tr className="my-course-line desktop-view">
                <td>
                  <b>{value.name}</b>
                </td>

                <td>
                  <b>{value.description}</b>
                </td>
              </tr>
            ) : (
              <div
                className="my-course-line mobile-view course-row"
                onClick={() => openModal(value)}
              >
                <div className="product-thumbnail text-start ps-0 course-image-container">
                  <img
                    src={
                      value.image
                        ? value.image
                        : "/assets/images/FindYourGuide-images/noServiceImage.jpg"
                    }
                    alt="product"
                    style={{ height: "60px", objectFit: "cover" }}
                    className="d-inline-block p-0 bg-greylight rounded-lg overflow-hidden course-image"
                  />
                </div>

                <div className="course-title-container">
                  <b>{value.name}</b>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      {!trophiesData?.length && (
        <div className="mt-4 course-title-container">
          No tienes trofeos en este momento. Sigue intentando para conseguirlos!
        </div>
      )}
      {isOpenModal && (
        <div className="course-data-overlay">
          <div className="course-data-modal p-4 rounded-lg">
            <div className="close-btn" onClick={closeModal}>
              <i className="text-white font-lg text-grey-400 feather-x"></i>
            </div>
            <div className="course-title pt-3">
              <h1 className="text-grey-900 fw-700 mb-3 lh-3 text-center">
                {selectedService.name}
              </h1>
            </div>
            <div className="course-modal-body">
              <div>
                <span>Precio: </span>
                <span>
                  <b>$ {selectedService.price} </b>
                </span>
              </div>
              <div>
                <span>Tipo de servicio: </span>
                <span>
                  <b>{selectedService.serviceType} </b>
                </span>
              </div>
              <div>
                <span>Descripción: </span>
                <span>
                  <b>{selectedService.description} </b>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyTrophiesList;
