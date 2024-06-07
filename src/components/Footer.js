import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-wrapper pt-1 layer-after bg-dark mt-0">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 lower-footer"></div>
          <div className="col-sm-6">
            <p className="copyright-text">
              © 2023 copyright. Todos los derechos reservados
            </p>
          </div>
          <div className="col-sm-6 text-right">
            <p className="float-right copyright-text">
              Ante cualquier problema, <Link to="/contact">contactanos</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
