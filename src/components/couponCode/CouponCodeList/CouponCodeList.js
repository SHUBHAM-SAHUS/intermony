import React, { useState, useEffect, useCallback } from "react";
import CommonTable from "components/shared/common-table/CommonTable";
import {Switch} from "@material-ui/core";
import { TextTruncate } from "utils/TextTruncate";

const CouponCodeTable = ({ toggleCouponCode, couponcodeList, totalCount, pagination, setPagination }) => {
  const [couponcodeData, setCouponCodeData] = useState([]);

  const keys = [
    "code",
    "description",
    "Email",
    "multi_user",
    "active"
  ];
  const couponcodeTableData = useCallback(() => {
    return couponcodeList.map(code => {
      return [
        <p className="code-text">{code.name}</p>,
        TextTruncate({str: code.description, limit: 30}),
        code.email,
        code.multi_user ? "YES" : "NO",
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
