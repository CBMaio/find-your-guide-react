import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./app/store";

import "./main.scss";

import * as serviceWorker from "./serviceWorker";
import About from "./pages/About";
import Accountinfo from "./pages/Accountinfo";
import AddCoursePage from "./pages/AddCoursePage";
import AdminDraftList from "./pages/AdminDraftList";
import Adminproductlist from "./pages/Adminproductlist";
import AdminRequests from "./pages/AdminRequests";
import Adminreview from "./pages/Adminreview";
import AuthorProfile from "./pages/AuthorProfile";
import Contact from "./pages/Contact";
import CourseRegistration from "./pages/CourseRegistration";
import Coursedetails from "./pages/Coursedetails";
import Coursesgridone from "./pages/Coursesgrid";
import EditCoursePage from "./pages/EditCoursePage";
import Forgot from "./pages/Forgot";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import Password from "./pages/Password";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";
import WelcomeAdmin from "./pages/WelcomeAdmin";
import Reset from "./pages/Reset";

import ProtectedRoute from "./pages/ProtectedRoute";
import Chat from "./pages/Chat";

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={"/"}>
          <Routes>
            <Route exact path={`/`} element={<Home />} />

            <Route exact path={`/login`} element={<Login />} />

            <Route exact path={`/register`} element={<Register />} />

            <Route exact path={`/forgot`} element={<Forgot />} />

            <Route exact path={`/notfound`} element={<Notfound />} />

            <Route exact path={`/contact`} element={<Contact />} />

            <Route exact path={`/about`} element={<About />} />

            <Route exact path={`/courses-grid`} element={<Coursesgridone />} />

            <Route exact path={`/chat`} element={<Chat />} />

            <Route
              exact
              path={`/author-profile/:authorId`}
              element={<AuthorProfile />}
            />

            <Route
              exact
              path={`/course-detail/:courseId`}
              element={<Coursedetails />}
            />

            <Route
              exact
              path={`/course-registration/:courseId`}
              element={<CourseRegistration />}
            />

            <Route exact path={`/reset`} element={<Reset />} />

            {/* privates routes */}
            <Route element={<ProtectedRoute />}>
              <Route exact path={`/admin`} element={<WelcomeAdmin />} />
              <Route
                exact
                path={`/admin-productlist`}
                element={<Adminproductlist />}
              />

              <Route exact path={`/add-course`} element={<AddCoursePage />} />

              <Route
                exact
                path={`/edit-course/:courseId`}
                element={<EditCoursePage />}
              />

              <Route
                exact
                path={`/admin-draft-list`}
                element={<AdminDraftList />}
              />

              <Route exact path={`/admin-review`} element={<Adminreview />} />

              <Route
                exact
                path={`/account-information`}
                element={<Accountinfo />}
              />

              <Route exact path={`/password`} element={<Password />} />

              <Route exact path={`/welcome-admin`} element={<WelcomeAdmin />} />

              <Route
                exact
                path={`/admin-requests`}
                element={<AdminRequests />}
              />
            </Route>
          </Routes>
          <ScrollToTop />
        </BrowserRouter>
      </Provider>
    );
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Root />);
serviceWorker.register();
