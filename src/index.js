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

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={"/"}>
          <Routes>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              element={<Home />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              element={<Login />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register`}
              element={<Register />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/forgot`}
              element={<Forgot />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/notfound`}
              element={<Notfound />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/contact`}
              element={<Contact />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/about`}
              element={<About />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/courses-grid`}
              element={<Coursesgridone />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/author-profile/:authorId`}
              element={<AuthorProfile />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/course-detail/:courseId`}
              element={<Coursedetails />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/course-registration/:courseId`}
              element={<CourseRegistration />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/reset`}
              element={<Reset />}
            />

            {/* privates routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/admin`}
                element={<WelcomeAdmin />}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/admin-productlist`}
                element={<Adminproductlist />}
              />

              <Route
                exact
                path={`${process.env.PUBLIC_URL}/add-course`}
                element={<AddCoursePage />}
              />

              <Route
                exact
                path={`${process.env.PUBLIC_URL}/edit-course/:courseId`}
                element={<EditCoursePage />}
              />

              <Route
                exact
                path={`${process.env.PUBLIC_URL}/admin-draft-list`}
                element={<AdminDraftList />}
              />

              <Route
                exact
                path={`${process.env.PUBLIC_URL}/admin-review`}
                element={<Adminreview />}
              />

              <Route
                exact
                path={`${process.env.PUBLIC_URL}/account-information`}
                element={<Accountinfo />}
              />

              <Route
                exact
                path={`${process.env.PUBLIC_URL}/password`}
                element={<Password />}
              />

              <Route
                exact
                path={`${process.env.PUBLIC_URL}/welcome-admin`}
                element={<WelcomeAdmin />}
              />

              <Route
                exact
                path={`${process.env.PUBLIC_URL}/admin-requests`}
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
