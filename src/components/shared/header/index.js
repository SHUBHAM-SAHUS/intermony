import React from "react";

import HeaderMenu from "./components/HeaderMenu.js";

import "./components/Header.scss";

const Header = ({
  resSidebarToggled,
  setSidebarToggle,
  setResSidebarToggle,
  history
}) => {

  const headerTitle =() => {
    let title = history.location.pathname.split('/')[1];
    title = title.split("-").join(" ");
    return title.trim() ? title : 'Dashboard';
  };

  return (
      <>
      <div className="gd_fav_right_top_header float_left">
        <div className="row">
          <div className="col-9">
            <div className="gd_fev_right_profile float_left">
              <div className="pr_dash_right_heading">
                <h3 className="text-capitalize">{headerTitle()}</h3>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="gd_fev_toggle"  onClick={() => setResSidebarToggle(!resSidebarToggled)}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
            <div className="br_top_profile">
              <HeaderMenu history={history}></HeaderMenu>
						</div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Header;
