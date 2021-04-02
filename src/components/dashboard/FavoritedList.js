import React, {useCallback, useEffect, useState } from 'react';
import CommonTable from "components/shared/common-table/CommonTable";


const DownloadedList = ({isLoading, ...props}) => {
  const {favourites} = props.favourites;
  const keys = [
    "Name",
    "Count"
  ];
  const [favouritesData, setPayedData] = useState([]);

  const favouritesTableData = useCallback(() => {
    return favourites.map(play => {
      return [
        play.title,
        play.count

      ];
    });
  }, [favourites]);

  useEffect(() => {
    let playRowData = favouritesTableData(favourites);
    if (JSON.stringify(playRowData) !== JSON.stringify(favouritesData)) {
      setPayedData(playRowData);
    }
  }, [favouritesTableData, favourites, favouritesData]);

  return(
  <>{favouritesData.length ? <CommonTable data={favouritesData} keys={keys}  />  : <span className="text-center p-2">{isLoading ? "" : "No Data Found"}</span>}</>
  )
}

export default DownloadedList;