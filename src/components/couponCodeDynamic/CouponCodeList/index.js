import React, { useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import * as CodeAction from "redux/actions/CouponCodeActions";
import CouponCodeTable from "./CouponCodeList.js";
import Form from "../CouponCodeComponent/Form";

const CouponCodeList = () => {
  const defaultPagination = {
    page: 1,
    limit: 10,
    orderBy: "desc",
    type: "dynamic"
  };
  //const globalState = useContext(store);
  const dispatch = useDispatch();
  const { couponcodeList, status, count } = useSelector(store => store.couponCodeReducer);
  const [rowData, setRowData] = useState([]);
  const [currentCouponCode, setCurrentCouponCode] = useState(null);
  const [ pagination, setDefaultPagination ] = useState(defaultPagination);
  const [loaded, setLoaded] = useState(false);
  //const [filterParams] = useState({});

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      dispatch(CodeAction.getCouponCodes({body: {...pagination}}));
    }
  }, [loaded, pagination, dispatch]);

  useEffect(() => {
    if (rowData.length !== couponcodeList.length || status !== "init") {
      const rows = couponcodeList;
      setRowData(rows);
    }
  }, [rowData, status, couponcodeList]);

  const setPagination = (params) => {
    setDefaultPagination({...pagination,...params});
    dispatch(CodeAction.getCouponCodes({body: {...pagination,...params}}));
  }
  //const setPagination = (params) => {
  //  setDefaultPagination({...pagination,...params});
  //  CodeAction.getCouponCodes({ body: {...pagination,...params,...filterParams}, dispatch: couponcodeDispatch });
  //};
  const toggleCouponCode = (checked, {id}) => {
    let active = checked;
    dispatch(CodeAction.toggleCouponCode({body: {active}, id}));
  }
  return (
    <>
      <div className="p-2">
        <div className="row">
            <div className="col-md-8">
              <Form currentCouponCode={currentCouponCode} setLoaded={setLoaded}
                setCurrentCouponCode={setCurrentCouponCode}>
              </Form>
            </div>
        </div>
        <div className="coupenTable">
          <CouponCodeTable
          toggleCouponCode={toggleCouponCode}
              setCurrentCouponCode={setCurrentCouponCode}
            couponcodeList={rowData}
            totalCount={count}
            pagination={pagination}
            setPagination={setPagination}
          ></CouponCodeTable>
        </div>
      </div>
    </>
  );
};

export default CouponCodeList;
