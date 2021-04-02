import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CouponCodeList from "components/couponCode/CouponCodeList";
import DynamicCouponCodeList from "components/couponCodeDynamic/CouponCodeList";

export default ({ history }) => {
  let tab = history.location.state && history.location.state.currentTab ? history.location.state.currentTab : "single";
  const [currentTab, setTab] = useState(tab)
  return (
    <div>
      <ButtonGroup size="large" color="primary" aria-label="outlined primary button group">
        <Button className={currentTab === "single" ? "btn-primary active" : ""} onClick={() => [setTab("single"), history.push({ pathname: "coupons", state: { currentTab: "single" } })]}> Single Use Coupon</Button>
        <Button className={currentTab !== "single" ? "btn-primary active" : ""} onClick={() => [setTab("dynamic"), history.push({ pathname: "coupons", state: { currentTab: "dynamic" } })]}>Dynamic coupon</Button>
      </ButtonGroup>
      {
        currentTab === "single" ? <CouponCodeList /> : <DynamicCouponCodeList />
      }


    </div>
  )
}