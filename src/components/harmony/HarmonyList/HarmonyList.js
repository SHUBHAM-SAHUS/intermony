import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import { TextTruncate } from "utils/TextTruncate";
import { secondsToMinutes } from "utils/CommonService";

export default ({page, harmonyList, handleDelete}) => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if(harmonyList.length) setLoaded(true);
  },[loaded, harmonyList])
  return (
        <div className="row">
          {!loaded || harmonyList.length ? harmonyList.map((harmony, index) =>
            <div className="col-xs-6 col-md-3 mb-3" key={index}>
              <div className="yog_panel stop_panic_bg"  >
              <div style={harmony.active_status==="deleted"?{opacity:0.6}:{opacity:1.0}} className="st_offer_box_wrapper float_left cursor-pointer">
                <img className="back_Card" src={harmony.photo_urls.medium} alt="thumb"/>
                <div className="panel-body">
                  <div className="panel_head">
                    <h6 className="sm_title text-capitalize" onClick={() => history.push({pathname: `/post/${harmony.id}/details`, state: {page}})}>{TextTruncate({str: harmony.title, limit: 30})}</h6>
                    <button onClick={e => history.push({pathname:`/post/${harmony.id}/edit`, state: {page}})} className="float-right icon-edit download_icn custom-card-btn"><i className="fa fa-edit"></i></button>
                    <button onClick={e => handleDelete(harmony)} className="float-right icon-delete custom-card-btn"> <DeleteIcon className="icon-color" /></button>
                  </div>
                  <div className="panel_ft">
                    <h6 className="sm_title">Duration <br/>{secondsToMinutes(harmony.duration_seconds)} Min</h6>
                  </div>
                </div>
                </div>
              </div>
            </div>
          ): <div className="col-md-12 text-center">No Posts Found</div>}
        </div>
  )
}