import React, {useCallback, useEffect, useState } from 'react';
import CommonTable from "components/shared/common-table/CommonTable";


const DownloadedList = ({isLoading, ...props}) => {
  const {downloads} = props.downloads;
  const keys = [
    "Name",
    "Count"
  ];
  const [downloadsData, setPayedData] = useState([]);

  const downloadsTableData = useCallback(() => {
    return downloads.map(play => {
      return [
        play.title,
        play.count

      ];
    });
  }, [downloads]);

  useEffect(() => {
    let playRowData = downloadsTableData(downloads);
    if (JSON.stringify(playRowData) !== JSON.stringify(downloadsData)) {
      setPayedData(playRowData);
    }
  }, [downloadsTableData, downloads, downloadsData]);

  return(
      <>{downloadsData.length ? <CommonTable data={downloadsData} keys={keys}  /> : <span className="text-center p-2">{isLoading ? "" : "No Data Found"}</span>}</>
  )
}

export default DownloadedList;