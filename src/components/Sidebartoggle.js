import React from "react";

import "../scss/components/sidebar-toggle.scss";

const Sidebartoggle = () => {
  let clickedClass = "feather-x";
  const body = document.body;
  const hiddenSidebar = "sidebar-deactive";
  const activeSidebar = "sidebar-toggled";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === hiddenSidebar || theme === activeSidebar) {
    body.classList.add(theme);
  } else {
    body.classList.add(hiddenSidebar);
  }

  const switchTheme = (e) => {
    if (theme === activeSidebar) {
      body.classList.replace(activeSidebar, hiddenSidebar);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "sidebar-deactive");
      theme = hiddenSidebar;
    } else {
      body.classList.replace(hiddenSidebar, activeSidebar);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "sidebar-toggled");
      theme = activeSidebar;
    }
  };

  return (
    <button
      id="sidebarToggle"
      className={`border-0 ms-4 bg-transparent mt-0 ${
        theme === "dark" ? clickedClass : ""
      }`}
      onClick={(e) => switchTheme(e)}
    >
      <i className="feather-menu text-white font-lg text-grey-400"></i>
    </button>
  );
};

export default Sidebartoggle;
