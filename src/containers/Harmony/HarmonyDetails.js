import React, {useEffect, useState} from "react";
//for dispatch actions
import {useDispatch} from "react-redux";

import * as actions from "redux/actions/HarmonyActions";
import HarmonyPage from "components/harmony/HarmonyDetails";;

export default (props) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  let harmonyId = props.match.params.harmonyId;

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      dispatch(actions.getHarmony(harmonyId))
    }
  }, [loaded, dispatch, harmonyId])

  return <HarmonyPage {...props} formType="update"/>;
}