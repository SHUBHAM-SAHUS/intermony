import React from "react";
import { NavLink, Link } from "react-router-dom";

/*
 * params set sidebar toggle and responsive sidebar toggle
 * */
const Sidebar = ({ history}) => {

    //const isActive = (path, match, location) => {
    //  let title = path.split('/')[1];
    //  return !!(match ||  location.pathname.includes(title));
    //};

  return (
      <div className="gd_fav_sidebar left_sidebar_wrapper">
        <div className="gd_fav_sidebar_heading float_left">
          <Link to="/" className="logo"><img src={require("assets/images/thumbnails/Full-Color-2x6-inHarmony crop.png")} alt="logo" /></Link>
          </div>
          <div className="gd_fav_sidebar_nav float_left">
            <ul>
              <li>
                <NavLink
                    className="app-menu__item"
                    to="/"
                    activeClassName="nav_active"
                    exact={true}
                    //isActive={isActive.bind(this, link)}
                    >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><defs><style></style></defs><path className="a" d="M10.021,8.667H1.9A1.9,1.9,0,0,1,0,6.771V1.9A1.9,1.9,0,0,1,1.9,0h8.125a1.9,1.9,0,0,1,1.9,1.9V6.771A1.9,1.9,0,0,1,10.021,8.667ZM1.9,1.625a.271.271,0,0,0-.271.271V6.771a.271.271,0,0,0,.271.271h8.125a.271.271,0,0,0,.271-.271V1.9a.271.271,0,0,0-.271-.271Zm0,0"/><path className="a" d="M10.021,228.5H1.9A1.9,1.9,0,0,1,0,226.6V215.228a1.9,1.9,0,0,1,1.9-1.9h8.125a1.9,1.9,0,0,1,1.9,1.9V226.6A1.9,1.9,0,0,1,10.021,228.5ZM1.9,214.957a.271.271,0,0,0-.271.271V226.6a.271.271,0,0,0,.271.271h8.125a.271.271,0,0,0,.271-.271V215.228a.271.271,0,0,0-.271-.271Zm0,0" transform="translate(0 -202.499)"/><path className="a" d="M287.353,350h-8.125a1.9,1.9,0,0,1-1.9-1.9v-4.875a1.9,1.9,0,0,1,1.9-1.9h8.125a1.9,1.9,0,0,1,1.9,1.9V348.1A1.9,1.9,0,0,1,287.353,350Zm-8.125-7.042a.271.271,0,0,0-.271.271V348.1a.271.271,0,0,0,.271.271h8.125a.271.271,0,0,0,.271-.271v-4.875a.271.271,0,0,0-.271-.271Zm0,0" transform="translate(-263.249 -323.999)"/><path className="a" d="M287.353,15.167h-8.125a1.9,1.9,0,0,1-1.9-1.9V1.9a1.9,1.9,0,0,1,1.9-1.9h8.125a1.9,1.9,0,0,1,1.9,1.9V13.271A1.9,1.9,0,0,1,287.353,15.167ZM279.228,1.625a.271.271,0,0,0-.271.271V13.271a.271.271,0,0,0,.271.271h8.125a.271.271,0,0,0,.271-.271V1.9a.271.271,0,0,0-.271-.271Zm0,0" transform="translate(-263.249)"/></svg>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                    className="app-menu__item"
                    to="/post"
                    activeClassName="nav_active"
                    exact={false}
                    ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.412 27.12"><defs></defs><g transform="translate(-44.794 0.15)"><g transform="translate(44.944)"><g transform="translate(0)"><path className="a" d="M66.9,6.646,60.41.16A.548.548,0,0,0,60.023,0H47.6a2.663,2.663,0,0,0-2.66,2.66v21.5a2.663,2.663,0,0,0,2.66,2.66H64.4a2.663,2.663,0,0,0,2.66-2.66V7.033A.548.548,0,0,0,66.9,6.646ZM60.57,1.869l4.616,4.616H62.136A1.565,1.565,0,0,1,60.57,4.92Zm5.39,22.291A1.567,1.567,0,0,1,64.4,25.726H47.6a1.567,1.567,0,0,1-1.565-1.565V2.66A1.567,1.567,0,0,1,47.6,1.095H59.476V4.92a2.66,2.66,0,0,0,2.66,2.66h3.825V24.16Z" transform="translate(-44.944 0)"/></g></g><g transform="translate(49.58 16.005)"><path className="a" d="M133.344,303.745h-.211a.471.471,0,1,0,0,.943h.211a.471.471,0,1,0,0-.943Z" transform="translate(-132.662 -303.745)"/></g><g transform="translate(52.448 16.005)"><path className="a" d="M180.064,303.745h-8.449a.471.471,0,1,0,0,.943h8.449a.471.471,0,1,0,0-.943Z" transform="translate(-171.144 -303.745)"/></g><g transform="translate(49.58 13.489)"><path className="a" d="M133.344,256h-.211a.471.471,0,1,0,0,.943h.211a.471.471,0,1,0,0-.943Z" transform="translate(-132.662 -256)"/></g><g transform="translate(52.448 13.489)"><path className="a" d="M180.064,256h-8.449a.471.471,0,1,0,0,.943h8.449a.471.471,0,1,0,0-.943Z" transform="translate(-171.144 -256)"/></g><g transform="translate(49.58 10.974)"><path className="a" d="M133.344,208.255h-.211a.471.471,0,0,0,0,.943h.211a.471.471,0,1,0,0-.943Z" transform="translate(-132.662 -208.255)"/></g><g transform="translate(52.448 10.974)"><path className="a" d="M180.064,208.255h-8.449a.471.471,0,1,0,0,.943h8.449a.471.471,0,1,0,0-.943Z" transform="translate(-171.144 -208.255)"/></g></g></svg><span>Post</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                    className="app-menu__item"
                    to="/user"
                    activeClassName="nav_active"
                    exact={false}
                    //isActive={isActive.bind(this, link)}
                    ><i className="fas fa-users" style={{fontSize: "20px"}}></i><span>Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                    className="app-menu__item"
                    to="/track-list"
                    activeClassName="nav_active"
                    exact={false}
                    //isActive={isActive.bind(this, link)}
                    ><i className="fa fa-music" style={{fontSize: "20px"}}></i><span>Track List</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                    className="app-menu__item"
                    to="/coupons"
                    activeClassName="nav_active"
                    exact={false}
                    //isActive={isActive.bind(this, link)}
                    ><i className="fa fa-code" style={{fontSize: "20px"}}></i><span className="coupon-text">Coupons</span>
                </NavLink>
              </li>

            </ul>
          </div>
        </div>
  );
};

export default Sidebar;
