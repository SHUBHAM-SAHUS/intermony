// public routes
import Login from "../containers/login";

//private routes
import Dashboard from "containers/dashboard";

import Harmony from "containers/Harmony";
import NewHarmony from "containers/Harmony/New";
import EditHarmony from "containers/Harmony/Edit";
import HarmonyDetails from "containers/Harmony/HarmonyDetails";

import TrackList from "containers/Harmony/TrackList";

import CouponCode from "containers/couponCode";

import User from "containers/user";

export const publicRoutes = [
  {
    key: "login",
    path: "/login",
    component: Login,
    exact: true
  }
];

export const privateRoutes = [
  {
    key: "dashboard",
    path: "/",
    component: Dashboard,
    exact: true
  },
  {
    key: "Harmony",
    path: "/post",
    component: Harmony,
    exact: true
  },
  {
    key: "Harmony",
    path: "/post/new",
    component: NewHarmony,
    exact: true
  },
  {
    key: "Harmony",
    path: "/post/:harmonyId/edit",
    component: EditHarmony,
    exact: true
  },
  {
    key: "Harmony Details",
    path: "/post/:harmonyId/details",
    component: HarmonyDetails,
    exact: true
  },
  {
    key: "User",
    path: "/user",
    component: User,
    exact: true
  },
  {
    key: "Track",
    path: "/track-list",
    component: TrackList,
    exact: true
  },
  {
    key: "Coupon Code",
    path: "/coupons",
    component: CouponCode,
    exact: true
  }
];
