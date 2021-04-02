import React from "react";
import { NavLink } from "react-router-dom";

const SideMenu = ({ icon, title, link, exact }) => {
  const isActive = (path, match, location) => {
    return !!(match ||  location.pathname.includes(title));
  };

  return (
      <li>
        <NavLink
            className="app-menu__item"
            to={link}
            activeClassName="active"
            exact={exact}
            isActive={isActive.bind(this, link)}
            >
          <i className={`fas ${icon} sidebar-icon pr-3`}></i>
          <span className="app_menu__label  text-capitalize">{title}</span>
        </NavLink>
      </li>
  );
};

export default SideMenu;
