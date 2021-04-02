import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
//for dispatch actions
import { useDispatch, useSelector } from "react-redux";
import * as commonService from "utils/CommonService";
import * as actions from "redux/actions/HarmonyActions";
import HarmonyList from "../HarmonyList/HarmonyList";
import Pagination from "react-js-pagination";
import Filter from "./Filter";
import { Button } from "@material-ui/core";

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const { harmonyList, isLoading, count } = useSelector((state) => state.harmonyReducer);
  const [filterParams, setFilterParams] = useState({
    page: history.location.state && history.location.state.page ? history.location.state.page : 1,
    limit: 12,
    order_by: "desc"
  });
  const [ pagination, setDefaultPagination ] = useState(filterParams);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      dispatch(actions.getHarmonyList({...filterParams}))
    }
    return () => {
      return true;
    };
  },[loaded, filterParams, dispatch]);

  const handleDelete = harmony => {
    commonService.isDialogOpen.onNext({
      open: true,
      data: {
        message: "Are you sure you want to delete?"
      },
      cancelText: "Cancel",
      confirmText: "Okay",
      onCancel: () => commonService.isDialogOpen.onNext(false),
      onConfirm: () => deleteHarmony(harmony)
    });
  };

  const deleteHarmony = harmony => {
    if (harmony) dispatch(actions.deleteHarmony(harmony.id)).then(res => {
      commonService.forSuccess("Post deleted successfully!", "Success");
    });
    commonService.isDialogOpen.onNext(false);
  };

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

  const handlePageChange = (pageNumber) => {
    let params = { ...filterParams, page: pageNumber};
    setFilterParams(params);
    dispatch(actions.getHarmonyList({ ...params }));
  };

  return (
      <>
      <div>
      <div className="row ">
        <div className="col-sm-12 mb-3 float-right text-right"><Button variant="contained"
              color="primary"
              className="cursor-pointer mt-2" onClick={() => history.push(`/post/new`)}> Add New</Button></div></div>
        <Filter
            resetLeadFilterForm={resetLeadFilterForm}
            handleFilter={handleFilter}
            />
        <HarmonyList page={filterParams.page} handleDelete={handleDelete} harmonyList={harmonyList} isLoading={isLoading} />
        </div>
        <div className="row mt-3">
          <div className="col-md-4 col-sm-4 offset-md-8 harmony-page">
            {count > harmonyList.length ? (
                <Pagination
                    activePage={filterParams["page"]}
                    itemClass="page-item"
                    linkClass="page-link"
                    itemsCountPerPage={filterParams["limit"]}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    />
            ) : (
                ""
            )}
          </div>
        </div>
      </>
  )
}