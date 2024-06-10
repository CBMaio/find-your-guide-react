import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Navbar, Nav } from "react-bootstrap";
import { isAuthenticated } from "../features/auth/authSlice";

import "../scss/components/header.scss";

const Header = () => {
  const isAuth = useSelector(isAuthenticated);
  return (
    <div className={`header-wrapper pt-3 pb-3 shadow-xss`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-9 navbar pt-0 pb-0">
            <div className="w-100">
              <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                  <Link to="/">
                    <h1 className="fredoka-font ls-3 fw-700 text-current font-xxl">
                      TourFinder
                      <span className="d-block font-xsssss ls-1 text-grey-500 open-font ">
                        Tu guía perfecto para cada destino
                      </span>
                    </h1>
                  </Link>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="ml-3 desktop-header"
                  >
                    <Nav className="me-auto header-navbar">
                      <NavLink to="/about" className="text-dark">
                        Sobre nosotros
                      </NavLink>
                      <NavLink to="/courses-grid" className="text-dark">
                        Todos los tours
                      </NavLink>
                      {/* <NavLink to="/contact" className="text-dark">
                        Contacto
                      </NavLink> */}
                      <NavLink
                        to="/login"
                        className="account-navlink text-dark"
                      >
                        <b>Cuenta</b>
                      </NavLink>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </div>
          </div>
          <div className="col-lg-3 text-right account-container">
            <Link
              to={isAuth ? "/welcome-admin" : "/login"}
              className={`float-right d-none d-lg-block text-center mt-1 ml-4 text-grey-800`}
            >
              <i className="ti-user font-lg"></i>
              <span className="font-xssss fw-500 d-block lh-1">
                {isAuth ? "Cuenta" : "Inicia Sesión"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
