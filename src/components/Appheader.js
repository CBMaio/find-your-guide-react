import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Appheader extends Component {
  state = {
    isOpen: false,
    isActive: false,
  };
  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
  toggleActive = () => this.setState({ isActive: !this.state.isActive });

  render() {
    const navClass = `${this.state.isOpen ? " nav-active" : ""}`;
    const searchClass = `${this.state.isActive ? " show" : ""}`;

    return (
      <div className="middle-sidebar-header bg-white">
        <div className={`app-header-search ${searchClass}`}>
          <form className="search-form">
            <div className="form-group searchbox mb-0 border-0 p-1">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Buscar..."
              />
              <i className="input-icon">
                <ion-icon
                  name="search-outline"
                  role="img"
                  className="md hydrated"
                  aria-label="search outline"
                ></ion-icon>
              </i>
              <span className="ms-1 mt-1 d-inline-block close searchbox-close">
                <i className="ti-close font-xs" onClick={this.toggleActive}></i>
              </span>
            </div>
          </form>
        </div>

        <button onClick={this.toggleOpen} className="header-menu"></button>
        <form action="#" className="float-left header-search">
          <div className="form-group mb-0 icon-input">
            <i className="feather-search font-lg text-grey-400"></i>
            <input
              type="text"
              placeholder="Comienza a escribir para buscar.."
              className="bg-transparent border-0 lh-32 pt-2 pb-2 pl-5 pr-3 font-xsss fw-500 rounded-xl w350"
            />
          </div>
        </form>
        <ul className="d-flex ml-auto right-menu-icon">
          <li>
            <Link to="#">
              <span className="dot-count bg-warning"></span>
              <i className="feather-bell font-xl text-current"></i>
              <div className="menu-dropdown">
                <h4 className="fw-700 font-xs mb-4">Notificación</h4>
                <div className="card bg-transparent-card w-100 border-0 pl-5 mb-3">
                  <img
                    src="/assets/images//user-8.png"
                    alt="user"
                    className="w40 position-absolute left-0"
                  />
                  <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                    Hendrix Stamp
                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                      3 min
                    </span>
                  </h5>
                  <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                    There are many variations of pass..
                  </h6>
                </div>
                <div className="card bg-transparent-card w-100 border-0 pl-5 mb-3">
                  <img
                    src="/assets/images//user-4.png"
                    alt="user"
                    className="w40 position-absolute left-0"
                  />
                  <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                    Goria Coast
                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                      2 min
                    </span>
                  </h5>
                  <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                    Mobile Apps UI Designer is require..
                  </h6>
                </div>

                <div className="card bg-transparent-card w-100 border-0 pl-5 mb-3">
                  <img
                    src="/assets/images//user-7.png"
                    alt="user"
                    className="w40 position-absolute left-0"
                  />
                  <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                    Surfiya Zakir
                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                      1 min
                    </span>
                  </h5>
                  <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                    Mobile Apps UI Designer is require..
                  </h6>
                </div>
                <div className="card bg-transparent-card w-100 border-0 pl-5">
                  <img
                    src="/assets/images//user-6.png"
                    alt="user"
                    className="w40 position-absolute left-0"
                  />
                  <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                    Victor Exrixon
                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                      30 sec
                    </span>
                  </h5>
                  <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                    Mobile Apps UI Designer is require..
                  </h6>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link to="/message">
              <i className="feather-message-square font-xl text-current"></i>
            </Link>
          </li>
          <li>
            <Link to="/default-user-profile">
              <img
                src="/assets/images//user.png"
                alt="user"
                className="w40 mt--1 rounded-circle"
              />
            </Link>
          </li>
          <li>
            <span onClick={this.toggleActive} className="menu-search-icon">
              <i className="feather-search text-grey-900 font-lg"></i>
            </span>
          </li>
        </ul>

        <nav className={`navigation scroll-bar ${navClass}`}>
          <div className="container pl-0 pr-0">
            <div className="nav-content">
              <div className="nav-top">
                <Link to="/">
                  <i className="feather-slack text-success display1-size mr-3 ml-3"></i>
                  <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xl logo-text mb-0">
                    TourFinder
                  </span>
                </Link>
                <span
                  onClick={this.toggleOpen}
                  className="close-nav d-inline-block d-lg-none"
                >
                  <i className="ti-close bg-grey mb-4 btn-round-sm font-xssss fw-700 text-dark ml-auto mr-2 "></i>
                </span>
              </div>
              <div className="nav-caption fw-600 font-xssss text-grey-500">
                <span>Nuevos </span>Feeds
              </div>
              <ul className="mb-3">
                <li className="logo d-none d-xl-block d-lg-block"></li>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/default"
                    className="nav-content-bttn open-font"
                    data-tab="chats"
                  >
                    <i className="feather-tv mr-3"></i>
                    <span>Feed</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/default-follower"
                    className=" nav-content-bttn open-font"
                    data-tab="friends"
                  >
                    <i className="feather-shopping-bag mr-3"></i>
                    <span>Seguidores</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/default-channel"
                    className="nav-content-bttn open-font"
                    data-tab="favorites"
                  >
                    <i className="feather-globe mr-3"></i>
                    <span>Explorar</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/default-live-stream"
                    className="nav-content-bttn open-font"
                    data-tab="favorites"
                  >
                    <i className="feather-play-circle mr-3"></i>
                    <span>En vivo</span>
                  </NavLink>
                </li>
                <li className="flex-lg-brackets">
                  <NavLink
                    activeclassname="active"
                    to="/default-user-profile"
                    data-tab="archived"
                    className="nav-content-bttn open-font"
                  >
                    <i className="feather-video mr-3"></i>
                    <span>Cursos guardados</span>
                  </NavLink>
                </li>
              </ul>

              <div className="nav-caption fw-600 font-xssss text-grey-500">
                <span>Siguiendo </span>Autor
              </div>
              <ul className="mb-3">
                <li>
                  <Link
                    to="/default-author-profile"
                    className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"
                    data-tab="chats"
                  >
                    <img
                      src="/assets/images//user.png"
                      alt="user"
                      className="w40 mr-2 rounded-circle"
                    />
                    <span>Surfiya Zakir </span>
                    <span className="circle-icon bg-success mt-3"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/default-author-profile"
                    className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"
                    data-tab="chats"
                  >
                    <img
                      src="/assets/images//user.png"
                      alt="user"
                      className="w40 mr-2 rounded-circle"
                    />
                    <span>Vincent Parks </span>
                    <span className="circle-icon bg-warning mt-3"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/default-author-profile"
                    className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"
                    data-tab="chats"
                  >
                    <img
                      src="/assets/images//user.png"
                      alt="user"
                      className="w40 mr-2 rounded-circle"
                    />
                    <span>Richard Bowers </span>
                    <span className="circle-icon bg-success mt-3"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/default-author-profile"
                    className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"
                    data-tab="chats"
                  >
                    <img
                      src="/assets/images//user.png"
                      alt="user"
                      className="w40 mr-2 rounded-circle"
                    />
                    <span>John Lambert </span>
                    <span className="circle-icon bg-success mt-3"></span>
                  </Link>
                </li>
              </ul>
              <div className="nav-caption fw-600 font-xssss text-grey-500">
                <span></span> Cuenta
              </div>
              <ul className="mb-3">
                <li className="logo d-none d-xl-block d-lg-block"></li>
                <li>
                  <Link
                    to="/default-settings"
                    className="nav-content-bttn open-font h-auto pt-2 pb-2"
                  >
                    <i className="font-sm feather-settings mr-3 text-grey-500"></i>
                    <span>Ajustes</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/default-analytics"
                    className="nav-content-bttn open-font h-auto pt-2 pb-2"
                  >
                    <i className="font-sm feather-pie-chart mr-3 text-grey-500"></i>
                    <span>Estadísticas</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/message"
                    className="nav-content-bttn open-font h-auto pt-2 pb-2"
                  >
                    <i className="font-sm feather-message-square mr-3 text-grey-500"></i>
                    <span>Chat</span>
                    <span className="circle-count bg-warning mt-0">23</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Appheader;
