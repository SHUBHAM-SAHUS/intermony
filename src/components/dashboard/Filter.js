import React, { useState } from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
export default ({
  isUserLastTrackList,
  defaultParams,
  action,
  setFilterParams,
  setPagination,
}) => {
  const dispatch = useDispatch();
  const defaultFilterParams = {
    startDate: new Date(moment().subtract(1, "months")),
    endDate: new Date(),
  };

  const [startDate, setStartDate] = useState(defaultFilterParams.startDate);
  //const [endDate, setEndDate] = useState(defaultFilterParams.endDate);
  const [filterOpt, setFilterOpt] = useState("year");

  const onChange = (params) => {
    if (params.startDate > params.endDate) {
      return false;
    }
    setStartDate(params.startDate);
    let paramsData = filterOpt === "month" ? params : {};
    if (defaultParams) setPagination(defaultParams);
    if (setFilterParams) setFilterParams(paramsData);
    if (isUserLastTrackList) paramsData = { ...defaultParams, ...paramsData }
      dispatch(action(paramsData));
  };
  //const pickerType = filterOpt === "month" ? showMonthYearPicker : showYearPicker
  return (
    <div className="p-2 text-right mt-3 border-bottom">
      <div className="row">
        {" "}
        <div className="col-4">
          {filterOpt === "month" && (
            <DatePicker
              className="form-control d-inline-block input-block-custom"
              selected={startDate}
              onChange={(date) =>
                onChange({
                  startDate: date,
                  endDate: new Date(moment(date).endOf("month")),
                })
              }
              selectsStart
              startDate={startDate}
              dateFormat={filterOpt === "month" ? "MMM" : "yyyy"}
              showMonthYearPicker={filterOpt === "month"}
              showYearPicker={filterOpt === "year"}
            />
          )}
        </div>
        <div className="col-8">
          <ButtonGroup size="small">
            <Button
              color="primary"
              className={filterOpt === `year` ? "btn-primary active" : ""}
              onClick={(e) => [
                setFilterOpt("year"),
                onChange({}),
              ]}
            >
              All Time
            </Button>
            <Button
              color="primary"
              className={filterOpt === `month` ? "btn-primary active" : ""}
              onClick={(e) => setFilterOpt("month")}
            >
              Month
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};
