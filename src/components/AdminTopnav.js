import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../features/auth/authSlice";
import { logout } from "../features/auth/authSlice";

import "../scss/components/admin-top-nav.scss";

const AdminTopnav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);

  const closeSession = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow-xs ">
      <ul className="navbar-nav ml-auto header-icons">
        <li className="nav-item dropdown no-arrow">
          <Link to="/account-information" className="navi-link dropdown-toggle">
            <img
              src={userInfo.picture}
              alt="user"
              className="w45 mt-n1 rounded-circle user-img"
            />
            <span className="d-none d-lg-inline text-grey-600 fw-700 ml-4 mr-4 font-xssss">
              {userInfo.name}
              <i className="font-xsssss d-block text-grey-500 fw-500 black-icon">
                {userInfo.degree}
              </i>
            </span>
          </Link>
        </li>

        <li className="nav-item dropdown no-arrow logout-icon">
          <div onClick={closeSession} className="navi-link dropdown-toggle">
            <i className="ms-3 feather-log-out d-none d-lg-block black-icon"></i>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default AdminTopnav;
