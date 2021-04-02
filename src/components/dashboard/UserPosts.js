import React, {useCallback, useEffect, useState } from 'react';
import CommonTable from "components/shared/common-table/CommonTable";
import moment from "moment";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const UserPosts = ({pagination , setPagination, totalCount, isLoading, sortUsers, ...props}) => {
  const {user_played} = props;
  
  const keys = [
    "Username",
    "User email ID",
    "Last played track",
    <span onClick={e => sortUsers()}>Date and time {pagination.orderBy === "asc" ? <ArrowDownwardIcon/> : <ArrowUpwardIcon /> }</span>
  ];
  const [user_playedData, setPayedData] = useState([]);

  const user_playedTableData = useCallback(() => {
    
    return user_played.map(play => {
      return [        
        `${play.user.first_name} ${play.user.last_name}`,
        play.user.email,
        play.post.title,
        moment(play.created_at).format("MM/DD/YYYY, hh:mm A")

      ];
    });
  }, [user_played]);

  useEffect(() => {
    let playRowData = user_playedTableData(user_played);
    if (JSON.stringify(playRowData) !== JSON.stringify(user_playedData)) {
      setPayedData(playRowData);
    }
  }, [user_playedTableData, user_played, user_playedData]);

  return(
  <>{user_playedData.length ? <CommonTable data={user_playedData} keys={keys} totalCount={totalCount} customPagination={pagination}
  setCustomPagination={setPagination} />  : <span className="text-center p-2">{isLoading ? "" : "No Data Found"}</span>}</>
  )
}

export default UserPosts;