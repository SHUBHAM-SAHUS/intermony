import React, { useState, useEffect, useCallback } from "react";
import CommonTable from "components/shared/common-table/CommonTable";
import {Switch} from "@material-ui/core";
import { TextTruncate } from "utils/TextTruncate";
import moment from "moment";
const CouponCodeTable = ({ toggleCouponCode, couponcodeList, totalCount, pagination, setPagination }) => {
  const [couponcodeData, setCouponCodeData] = useState([]);

  const keys = [
    "code",
    "description",
    "offer_type",
    "offer_value",
    "expires_on",
    "active"
  ];
  const couponcodeTableData = useCallback(() => {
    return couponcodeList.filter(e => e.offer_type !== null).map(code => {
      return [
        <p className="code-text">{code.name}</p>,
        TextTruncate({str: code.description, limit: 30}),
        code.offer_type.split('_').join(" "),
        code.offer_value, 
        code.expires_at ? moment(code.expires_at).utc().format("MM/DD/YYYY, hh:mm:ss A") : "",
        <Switch
          checked={code.active_status === "active" ? true : false}
          value={code.active_status === "active" ? true : false}
          onClick={e => toggleCouponCode(e.target.checked, code)}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
          />
      ];
    });
  },[couponcodeList, toggleCouponCode]);

  useEffect(() => {
    let couponcodeRowData = couponcodeTableData(couponcodeList);
    if (JSON.stringify(couponcodeRowData) !== JSON.stringify(couponcodeData)) {
      setCouponCodeData(couponcodeRowData);
    }
  }, [couponcodeTableData, couponcodeList, couponcodeData]);
  return <CommonTable data={couponcodeData} keys={keys} totalCount={totalCount} customPagination={pagination} setCustomPagination={setPagination}></CommonTable>;
};

export default  CouponCodeTable;
