import React, {useCallback, useEffect, useState } from 'react';
import CommonTable from "components/shared/common-table/CommonTable";


const DownloadedList = ({isLoading, ...props}) => {
  const { played} = props.played;
    const keys = [
        "Name",
        "Count"
      ];
      const [playedData, setPayedData] = useState([]);

  const playedTableData = useCallback(() => {
    return played.map(play => {
      return [
        play.title,
        play.count

      ];
    });
  }, [played]);

  useEffect(() => {
    let playRowData = playedTableData(played);
    if (JSON.stringify(playRowData) !== JSON.stringify(playedData)) {
      setPayedData(playRowData);
    }
  }, [playedTableData, played, playedData]);

    return(
        <>{playedData.length ? <CommonTable data={playedData} keys={keys}  /> : <span className="text-center p-2">{isLoading ? "" : "No Data Found"}</span>}</>
    )
}

export default DownloadedList;