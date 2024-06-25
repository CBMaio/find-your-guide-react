import { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { BREAKPOIN_SMALL, FETCH_STATUS } from "../../utils";
import {
  fetchTrophies,
  getAllTrophies,
  getTrophiesStatus,
} from "./trophySlice";
import { isGuide } from "../auth/authSlice";

const MyTrophiesList = () => {
  const dispatch = useDispatch();
  const contextStatus = useSelector(getTrophiesStatus);
  const trophiesData = useSelector(getAllTrophies);
  const isGuideUser = useSelector(isGuide);

  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOIN_SMALL);

  const { IDLE } = FETCH_STATUS;

  const onResizeScrren = () => {
    setIsMobile(window.innerWidth < BREAKPOIN_SMALL);
  };

  window.addEventListener("resize", () => onResizeScrren());

  useEffect(() => {
    if (contextStatus === IDLE) {
      dispatch(fetchTrophies());
    }
  }, [contextStatus, dispatch, IDLE, isGuideUser]);

  return (
    <>
      {trophiesData &&
        trophiesData.map((value) => (
          <Fragment key={value.id}>
            {!isMobile ? (
              <tr className="my-course-line desktop-view">
                <td>
                  <b>{value.date}</b>
                </td>

                <td>
                  <b>Trofeo ganado!</b>
                </td>

                <td>
                  <b>{value.condition}</b>
                </td>
              </tr>
            ) : (
              <div className="my-course-line mobile-view course-row">
                <div className="course-title-container">
                  <b>{value.date}</b>
                </div>

                <div className="course-title-container">
                  <b>Trofeo ganado!</b>
                </div>

                <div className="course-title-container">
                  <b>{value.condition}</b>
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
    </>
  );
};

export default MyTrophiesList;
