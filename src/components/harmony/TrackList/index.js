import React, {useState, useEffect} from "react";
//for dispatch actions
import { useDispatch, useSelector } from "react-redux";
import * as commonService from "utils/CommonService";
import * as actions from "redux/actions/HarmonyActions";
import AdioList from "./AdioList.js";
import Filter from "./Filter";

export default (props) => {
  const defaultPagination = {
    page: 1,
    limit: 10,
    order_by: "desc"
  };
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [track, editTrack] = useState({});
  const { harmonyList, isLoading, count } = useSelector((state) => state.harmonyReducer);
  const [ pagination, setDefaultPagination ] = useState(defaultPagination);
  const [filterParams, setFilterParams] = useState({});

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      dispatch(actions.getHarmonyList({...pagination}))
    }
    return () => {
      return true;
    };
  },[loaded, filterParams, dispatch, pagination]);

  const handleFilter = (e, filterForm) => {
    
    e.preventDefault();
    setDefaultPagination({ ...pagination, page: 1 });
    setFilterParams(filterForm);
    actions.filterPosts({
      body: { ...pagination, page: 1, ...filterForm },
      dispatch
    });
  }

  const resetLeadFilterForm = (data) => {
    setFilterParams(data);
    setDefaultPagination({...pagination, page: 1});
    dispatch(actions.getHarmonyList({...pagination}));
  };

  const setPagination = (params) => {
    setDefaultPagination({...pagination,...params});
    dispatch (actions.getHarmonyList({...pagination,...params,...filterParams} ));
  };


  const saveRank = () => {
    let tempRank;
     const {is_featured, featured_rank} = track;
    if (!is_featured) tempRank=0;else tempRank=parseInt(featured_rank);
     dispatch(actions.addFeaturedPost({post: {is_featured, featured_rank: tempRank}}, track.id)).then(res => {
       editTrack({});
      commonService.forSuccess("Post updated successfully!", "Success");
    });
  };

  const editRank = (current_track) => {
    if (!track.is_featured && parseInt(current_track.featured_rank)) {
      editTrack({...current_track, featured_rank: 0});
      return commonService.forError("Please select featured to add featured rank!", "Error");
    }
    editTrack({...current_track})
  };

  const initEdit = (current_track) => {
    const {id, is_featured, featured_rank} = current_track;
    editTrack({id, is_featured, featured_rank});
  };
  return (
      <>
      <div className="p-2">
      <Filter
            resetLeadFilterForm={resetLeadFilterForm}
            handleFilter={handleFilter}
            />
        <AdioList editTrack={initEdit} editRank={editRank} saveRank={saveRank} track={track} audioList={harmonyList} isLoading={isLoading}
           totalCount={count} pagination={pagination} setPagination={setPagination}
         />
        </div>
      </>
  )
}