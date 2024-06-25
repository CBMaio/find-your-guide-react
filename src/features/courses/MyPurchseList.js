import { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { Button } from "react-bootstrap";
import { BREAKPOIN_SMALL, FETCH_STATUS } from "../../utils";
import {
  deleteRequest,
  getAllMyPurchases,
  selectAllTouristPurchase,
  selectRequestStatus,
} from "../requests/requestsSlice";

const MyPurchseList = () => {
  const dispatch = useDispatch();
  const myRequests = useSelector(selectAllTouristPurchase);
  const purchaseStatus = useSelector(selectRequestStatus);
  const [selectedService, setSelectedService] = useState(null);
  const [isOpenSerivceModal, setIsOpenSerivceModal] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOIN_SMALL);
  const { LOADING, IDLE } = FETCH_STATUS;

  const onResizeScrren = () => {
    setIsMobile(window.innerWidth < BREAKPOIN_SMALL);
  };

  window.addEventListener("resize", () => onResizeScrren());

  const openModal = (purchase) => {
    setSelectedService(purchase);
    setIsOpenSerivceModal(true);
  };

  const closeModal = () => setIsOpenSerivceModal(false);

  const cancelPurchase = (id) => {
    dispatch(deleteRequest(id));
    if (isOpenSerivceModal) {
      setIsOpenSerivceModal(false);
    }
  };

  useEffect(() => {
    if (purchaseStatus === IDLE) {
      dispatch(
        getAllMyPurchases(JSON.parse(localStorage.getItem("userData"))?.id)
      );
    }
  }, [purchaseStatus, dispatch, IDLE]);

  return (
    <>
      {myRequests &&
        myRequests.map((purchase) => (
          <Fragment key={purchase.id}>
            {!isMobile ? (
              <tr className="my-course-line desktop-view">
                <td className="product-thumbnail text-start ps-0">
                  <img
                    src={
                      purchase.service.image
                        ? purchase.service.image
                        : "/assets/images/FindYourGuide-images/noServiceImage.jpg"
                    }
                    alt="product"
                    style={{ height: "60px", objectFit: "cover" }}
                    className="d-inline-block p-0 bg-greylight rounded-lg overflow-hidden course-image"
                  />
                </td>

                <td>
                  <b>{purchase.service.name}</b>
                </td>

                <td>
                  $ <b>{purchase.service.price}</b>
                </td>
                <td>
                  <span
                    className={`font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 d-inline-block mr-1`}
                  >
                    {purchase.service.serviceType}
                  </span>
                </td>
                <td>
                  <b>{purchase.service.description}</b>
                </td>
                <td className="product-remove text-right">
                  <Button
                    className="bg-transparent border-0 course-action"
                    onClick={() => cancelPurchase(purchase.service.id)}
                  >
                    <i className="ti-trash  font-xs text-danger"></i>
                    <span className="button-legend">Cancelar reserva</span>
                  </Button>
                </td>
              </tr>
            ) : (
              <div
                className="my-course-line mobile-view course-row"
                onClick={() => openModal(purchase)}
              >
                <div className="product-thumbnail text-start ps-0 course-image-container">
                  <img
                    src={
                      purchase.service.image
                        ? purchase.service.image
                        : "/assets/images/FindYourGuide-images/noServiceImage.jpg"
                    }
                    alt="product"
                    style={{ height: "60px", objectFit: "cover" }}
                    className="d-inline-block p-0 bg-greylight rounded-lg overflow-hidden course-image"
                  />
                </div>

                <div className="course-title-container">
                  <b>{purchase.service.name}</b>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      {isOpenSerivceModal && (
        <div className="course-data-overlay">
          <div className="course-data-modal p-4 rounded-lg">
            <div className="close-btn" onClick={closeModal}>
              <i className="text-white font-lg text-grey-400 feather-x"></i>
            </div>
            <div className="course-title pt-3">
              <h1 className="text-grey-900 fw-700 mb-3 lh-3 text-center">
                {selectedService.service.name}
              </h1>
            </div>
            <div className="course-modal-body">
              <div>
                <span>Precio: </span>
                <span>
                  <b>$ {selectedService.service.price} </b>
                </span>
              </div>
              <div>
                <span>Tipo de servicio: </span>
                <span>
                  <b>{selectedService.service.serviceType} </b>
                </span>
              </div>
              <div>
                <span>Descripción: </span>
                <span>
                  <b>{selectedService.service.description} </b>
                </span>
              </div>

              <div className="mt-4 actions-container">
                <Button
                  onClick={() => cancelPurchase(selectedService.id)}
                  className="col-12 action-btn outline-btn"
                >
                  <span>Cancelar reserva</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPurchseList;
