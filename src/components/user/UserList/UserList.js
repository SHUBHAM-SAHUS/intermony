import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Switch, ButtonGroup, Icon,  Button  } from "@material-ui/core";
import moment from 'moment';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import CommonTable from "components/shared/common-table/CommonTable";

const UserTable = ({resendPassword, handleDelete, toggleActive, userList, totalCount, pagination, setPagination, sortUsers }) => {
  const [userData, setUserData] = useState([]);  

  const keys = [
    "id",
    "Name",
    "email",
    "Device Info",
    "Verification Code",
    "Subscription Type",
    "Life Time",
    "verified",
    //"status",
    <span onClick={e => sortUsers()}>joined at {pagination.orderBy === "ASC" ? <ArrowDownwardIcon/> : <ArrowUpwardIcon /> }</span>,
      "Actions"
  ];

  const userTableData = useCallback(() => {
    return userList.map(user => {
      return [
        user.id,
        <div className="d-inline user-img">
          <Avatar
            alt="Natacha"
            className="float-left mr-1"
            src={user.photo_urls && user.photo_urls.medium}
          />
          <span className="mt-2 d-inline-block">{user.first_name + " " + user.last_name}</span>
        </div>,
        user.email,
        user.deviceinfo ? user.deviceinfo.platform : "",
        user.verification_token,
        user.subscription_type && user.subscription_type !== "lifetime" ? user.subscription_type : '',
        !user.subscription_platform || user.subscription_platform === "admin" ? <Switch
          checked={user.subscription_platform === "admin" ? true : false}
          value={user.subscription_platform ? true : false}
          onClick={e => toggleActive(e.target.checked, user)}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
          /> : "",
        user.verified  ? "Verified" : "Not Verified",           
        moment(user.created_at).format("DD MMM YYYY") ,
        <ButtonGroup
            variant="text"
            color="secondary"
            aria-label="text primary button group"
            >
          <Button className="cursor-pointer" onClick={e => handleDelete(user)}>
            <Icon color="primary">delete_icon</Icon>
          </Button>
          <Button enabled={user.is_password_set} className="cursor-pointer" onClick={e => resendPassword(user)}>
            Resend Password
          </Button>
        </ButtonGroup>
        
      ];
    });
  }, [userList, toggleActive, handleDelete, resendPassword]);

  useEffect(() => {
    let userRowData = userTableData(userList);
    if (JSON.stringify(userRowData) !== JSON.stringify(userData)) {
      setUserData(userRowData);
    }
  }, [userTableData, userList, userData]);
  return <CommonTable   data={userData} keys={keys} totalCount={totalCount} customPagination={pagination}
  setCustomPagination={setPagination}></CommonTable>;
};

export default UserTable;