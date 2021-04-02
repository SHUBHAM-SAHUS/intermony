import React, {useState, useEffect} from "react";

import * as DashboardAction from "redux/actions/DashboardActions";
// import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import FavoriteList from './FavoritedList'
import DownloadedList from './DownloadList'
import PlayedList from './PlayedList';
import UserPosts from './UserPosts';
import Filter from './Filter';
import { EqualHeight, EqualHeightElement } from 'react-equal-height';
//import {Link} from "react-router-dom";

const DashboardPage = () => {
  const defaultParams = {
    page: 1, limit: 10, orderBy: "desc"
  }
  const [ pagination, setDefaultPagination ] = useState(defaultParams);
  const [filterParams, setFilterParams] = useState({});
  const { isLoading, played, favourites, downloads, summery, user_played, count } = useSelector((state) => state.dashboardReducer);
	const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		if (!loaded) {
		  setLoaded(true);
		  dispatch(DashboardAction.getSummery());
		  dispatch(DashboardAction.playedAnalytics());
		  dispatch(DashboardAction.downloadsAnalytics());
      dispatch(DashboardAction.favouritesAnalytics());
      dispatch(DashboardAction.userPlayedPost(defaultParams));
		}
		return () => {
		  return true;
		};
    },[defaultParams, loaded, dispatch]);

    const sortUsers = () =>{
      let tempPagination = {...pagination};
      tempPagination.orderBy = tempPagination.orderBy === "desc" ? "asc" : "desc";
      setDefaultPagination(tempPagination);
      dispatch(DashboardAction.userPlayedPost({...pagination,...filterParams}));
    }
    
  
  const setPagination = (params) => {
    setDefaultPagination({...pagination,...params});
    dispatch(DashboardAction.userPlayedPost({...pagination,...params,...filterParams}));
  };

  
  return (
  	<>
	  <div className="pr_dash_right_boxes_main float_left dashboard">
        <div className="row">
          <div className="col-md-3">
            <div className="vs_dash_users_box text-center card-height">
              <h4>Total no. of Users</h4>
              <h2>{summery.user_count}</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="vs_dash_users_box text-center card-height">
              <h4>Active Monthly Subscribers</h4>
		          <h2>{summery.monthly_subscription_count}</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="vs_dash_users_box text-center card-height">
              <h4>Active Yearly Subscribers</h4>
              <h2>{summery.yearly_subscription_count}</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="vs_dash_users_box text-center card-height">
              <h4>Monthly Revenue(in $)</h4>
		          <h2>{summery.current_month_revenue ? summery.current_month_revenue.toFixed(2) : ""}</h2>
            </div>
          </div>
        <div className="row mt-3">
        <EqualHeight>
        <div className="col-sm-6 col-lg-4 mt-2 card-dashboard">
        {favourites && <EqualHeightElement name="Name">          
            <div className="card">
              <h6 className="text-center mt-2">Number of times a song is favourited</h6>
              <Filter action={DashboardAction.favouritesAnalytics}/>
               <FavoriteList isLoading={isLoading} favourites={favourites}/>
           
          </div>
          </EqualHeightElement>}
          </div>
          <div className="col-sm-6 col-lg-4 mt-2 card-dashboard" >
          {downloads && <EqualHeightElement name="Name">          
            <div className="card">
              <h6 className="text-center mt-2">Number of times a song is downloaded</h6>
              <Filter action={DashboardAction.downloadsAnalytics}/>
              <DownloadedList isLoading={isLoading} downloads={downloads}/>            
          </div>
          </EqualHeightElement>}
          </div>
          <div className="col-sm-6 col-lg-4 mt-2 card-dashboard">
          {played && <EqualHeightElement name="Name">
            <div className="card">
              <h6 className="text-center mt-2">Number of times a song is played</h6>
              <Filter action={DashboardAction.playedAnalytics}/>
              <PlayedList isLoading={isLoading} played={played} />
            </div>         
          </EqualHeightElement>
}
          </div>
          </EqualHeight>
          <div className="col-sm-12 col-lg-12 mt-3">
          {user_played && <div className="card">
              <h5 className="text-center mt-2">Last Played post</h5>
              <Filter isUserLastTrackList={true} defaultParams={defaultParams} action={DashboardAction.userPlayedPost} setPagination={setDefaultPagination} setFilterParams={setFilterParams}/>
             <UserPosts isLoading={isLoading} user_played={user_played} sortUsers={sortUsers} totalCount={count} setPagination={setPagination}  pagination={pagination}/>
            </div>}
          </div>
        </div>
        </div>
      
</div>
	</>
  )
};

export default DashboardPage;
