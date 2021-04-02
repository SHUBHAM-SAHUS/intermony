import React from "react";
import {useHistory} from "react-router-dom"
//for dispatch actions
import { useDispatch, useSelector } from "react-redux";
import {Switch, Button} from '@material-ui/core';
import * as actions from "redux/actions/HarmonyActions";
import { secondsToMinutes } from "utils/CommonService";

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { harmonyDetails } = useSelector((state) => state.harmonyReducer);
  const toggleActive = (checked, harmonyDetails) => {
    // harmonyDetails.active_status = checked ? "active" : "inactive";
    if (harmonyDetails.active_status === "active") dispatch(actions.deactivateHarmony(harmonyDetails.id));
    else dispatch(actions.activateHarmony(harmonyDetails.id));
  };
   
   
  return (
    <>
    <div className="row ml-2 mb-2">
      <Button  onClick={() => history.push({pathname: `/post`, state: history.location.state})}  variant="contained" color="secondary">
         Back
       </Button>
      </div>
    <div className="pr_dash_right_boxes_main float_left store-details-page">
      <div className="row">
        {harmonyDetails && (
          <div className="card m-3 p-3 w-90">
            <div className="img-container-harmony text-center">
              {harmonyDetails.photo_urls && <img className="img-harmony-detail"
                src={harmonyDetails.photo_urls.medium}
                alt="img"
              />}
            </div>
            <div className="vs_cat_upload_input_box float_left row">
              <div className="col-3">
                <label>Title</label>
              </div>
              <div className="col-9 mt-1">
                <span className="text-capitalize">{harmonyDetails.title}</span>
              </div>
              <div className="col-3">
                <label>Duration</label>
              </div>
              <div className="col-9 mt-1">
                <span className="text-capitalize">{harmonyDetails.duration}</span>
              </div>
              <div className="col-3">
                <label>Is Featured</label>
              </div>
              <div className="col-9 mt-1">
                <span className="text-capitalize">{harmonyDetails.is_featured === "true" ? "true" : "false"}</span>
              </div>
              <div className="col-3">
                <label>Duration Rank</label>
              </div>
              <div className="col-9 mt-1">
                <span className="text-capitalize">{harmonyDetails.duration_rank}</span>
              </div>
              <div className="col-3">
                <label>Featured Rank</label>
              </div>
              <div className="col-9 mt-1">
                <span className="text-capitalize">{harmonyDetails.featured_rank}</span>
              </div>
              <div className="col-3">
                <label>Duration Second</label>
              </div>
              <div className="col-9 mt-1">
                <span className="text-capitalize">{secondsToMinutes(harmonyDetails.duration_seconds)} min</span>
              </div>
              <div className="col-3">
                <label>Status</label>
              </div>
              <div className="col-9 mt-1">
               <Switch
                    checked={harmonyDetails.active_status === "active" ? true : false}
                    value={harmonyDetails.active_status}
                    onClick={e => toggleActive(e.target.checked, harmonyDetails)}
                    color="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                    />
              </div>
              <div className="col-3">
                <label>Category</label>
              </div>
              <div className="col-9 mt-1">
                <span className="text-capitalize">{harmonyDetails.categories && harmonyDetails.categories.map((con, index) => <p key={index}>{con.name}</p>)}</span>
              </div>
              <div className="col-3">
                <label>Audio</label>
              </div>
              <div className="col-9 mt-1">
              {harmonyDetails && harmonyDetails.audio_url ? <audio controls>
                          <source src={harmonyDetails && harmonyDetails.audio_url} type="audio/mp3"/>
                          Your browser does not support the audio tag.
                        </audio> :
                            ""}
                
              </div>
              <div className="col-3">
                <label>Description</label>
              </div>
              <div className="col-12 mt-1">
                <span className="text-capitalize">{harmonyDetails.description}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};
