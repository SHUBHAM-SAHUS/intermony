import React, { useState } from "react";
// ui component for page layout
import Header from "./components/shared/header";
import Sidebar from "./components/shared/sidebar";

import "./App.scss";

const App = ({ children }) => {
  const { history, categoryFilter, handleCategoryFilter } = children.props;

  // const [sidebarToggled] = useState(false);
  const [ resSidebarToggled, setResSidebarToggle] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light-theme");

  const changeTheme = () => {
    const theme = currentTheme === "dark-theme" ? "light-theme" : "dark-theme";
    if (theme !== currentTheme) setCurrentTheme(theme);
  };

  return (
      <div
          className={`pr_dash_main_wrapper float_left ${currentTheme} ${resSidebarToggled ? "left_sidebar_visible" : ""}`}

          onClick={(e) => {
    if (categoryFilter && e.target.name !== "category-search-dropdown") handleCategoryFilter(false);
  }}
          >

        <Sidebar
            resSidebarToggled={resSidebarToggled}
            setResSidebarToggle={setResSidebarToggle}
            changeTheme={changeTheme}
            history={history}
            />
        <div className="appContainer">
          <div className="gd_fav_right_cont_box">
            <Header resSidebarToggled={resSidebarToggled}
                    setResSidebarToggle={setResSidebarToggle} history={history}></Header>
            <main className="app-content-harmony pr_dash_right_boxes_main float_left">
              {children}
            </main>
          </div>
          <div className="gd_fav_bottom_footer float_left">
            <p>© 2020 Videosweat, Inc. All Rights Reserved.</p>
          </div>
        </div>
      </div>
  );
};

export default App;