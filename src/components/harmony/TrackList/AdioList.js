import React, { useState, useEffect, useCallback } from "react";
import { Icon, Avatar, Checkbox ,Button, ButtonGroup } from "@material-ui/core";

import { TextTruncate } from "utils/TextTruncate";
import CommonTable from "components/shared/common-table/CommonTable";
import { secondsToMinutes } from "utils/CommonService";

export default ({editTrack, track, audioList, editRank, saveRank, totalCount, pagination, setPagination }) => {
  const [audioData, setUserData] = useState([]);
  let limit;
  if (typeof window === "object") {
    if (window.innerWidth < 1450) limit = 25;//desc_limit= 35}
    else if (window.innerWidth < 1653) limit = 45;//desc_limit= 35}
    else if (window.innerWidth < 1921) limit = 100;//desc_limit= 50}
    else if (window.innerWidth < 2500) limit = 200;//desc_limit= 60}
    else limit = 200;
  }
  else {
    limit = 25;
  }
  //  const toggleActive = useCallback(
  //   (checked, audio) => {
  //     //audio.active_status = checked ? 1 : 0;
  //     UsersAction.toggleActive({ body: { active: checked } , id: audio.id, dispatch: audiosDispatch });
  //   },
  //   [UsersAction, audiosDispatch]
  // );

  const handleKeypress = (e) => {
    const characterCode = e.key
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      } else if (characterNumber === 0) {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }


  const keys = [
    "id",
    "Title",
    "duration",
    "category",
    "Is Featured",
    "Featured Rank",
    "Action"
  ];

  const audioTableData = useCallback(() => {
    return audioList.map(audio => {
      return [
        audio.id,
        <div className="d-inline audio-img">
          <Avatar
              alt="Natacha"
              className="float-left mr-1"
              src={audio.photo_urls && audio.photo_urls.medium}
              />
          <span className="mt-2 d-inline-block">{TextTruncate({str: audio.title, limit})}</span>
        </div>,
        
        `${secondsToMinutes(audio.duration_seconds)} Min`,
        TextTruncate({str: audio.categories.map(e => e.name).join(", "), limit: limit-10}),
        track.id === audio.id ? <Checkbox
            className={`p-0`}
            checked={track.is_featured}
            value={track.is_featured}
            onChange={e => editRank({...track, is_featured: e.target.checked})}
            color="primary"
            name="is_featured"
            inputProps={{ 'aria-label': 'primary checkbox' }}
            /> : <Checkbox
            className={`p-0 pointer-none `}
            checked={audio.is_featured}
            value={audio.is_featured}
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
            />,
        track.id === audio.id ? <input className="form-control" style={{width: "75px"}} onKeyDown={handleKeypress} type="number" min="0" value={track.featured_rank} name="featured_rank" onChange={e => editRank({...track, featured_rank: e.target.value})}/> : audio.featured_rank ,
        track.id === audio.id ? <ButtonGroup><Button onClick={() => saveRank(track)}><Icon color="primary">done_icon</Icon></Button><Button onClick={() => editRank({})}><Icon>close_icon</Icon></Button></ButtonGroup> :  <Button variant="contained" onClick={() => editTrack(JSON.parse(JSON.stringify(audio)))}>Edit Rank</Button>

      ];
    });
  }, [audioList, track, editRank, saveRank, editTrack, limit]);

  useEffect(() => {
    let audioRowData = audioTableData(audioList);
    if (JSON.stringify(audioRowData) !== JSON.stringify(audioData)) {
      setUserData(audioRowData);
    }
  }, [audioTableData, audioList, audioData]);

  return <CommonTable   data={audioData} keys={keys}  totalCount={totalCount} customPagination={pagination}
  setCustomPagination={setPagination}></CommonTable>;
};

