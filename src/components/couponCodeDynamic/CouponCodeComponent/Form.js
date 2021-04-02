import React, { useEffect } from "react";
import {
  Button,
  TextField,
  FormGroup,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment
} from "@material-ui/core";
import moment from "moment";
import Datetime from 'react-datetime';
import { useDispatch } from "react-redux";
// for flash message
import * as commonService from "utils/CommonService";
import * as CodeAction from "redux/actions/CouponCodeActions";
import DrawerModel from "components/shared/ui-components/drawer-model/DrawerModel";
import "react-datetime/css/react-datetime.css";
const PageForm = ({ setLoaded, setCurrentCouponCode, currentCouponCode }) => {
  //const globalState = useContext(store);
  const dispatch = useDispatch();
  let defaultForm = {
    name: "",
    offer_type: "amount_off",
    offer_value: "",
    description: "",
    expires_at: new Date()
  };
  const [state, setState] = React.useState({ open: false });
  const [form, setForm] = React.useState({ ...defaultForm });

  useEffect(() => {
    if (currentCouponCode && !state.open) {
      setState({ open: true });
      setForm(currentCouponCode);
    }
  }, [currentCouponCode, state]);

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (currentCouponCode) setCurrentCouponCode(null);
    setState({ ...state, open });
    setForm(defaultForm);
  };


  const handleSubmit = e => {
    e.preventDefault();
    let coupon = { ...form };
    if (!moment(form.expires_at).isValid()) {
      setForm({ ...form, expires_at: new Date() })
      commonService.forError("Invalid Date time", "Error");
      return false
    }
    if (typeof coupon.expires_at !== "string") coupon.expires_at = coupon.expires_at.format("YYYY-MM-DDTHH:mm:ss")
    else {
      let diff = moment(coupon.expires_at).diff(moment().subtract(2, "minutes"));
        if (diff < 0) {
          commonService.forError("Invalid Date time", "Error");
          return false
        }
      coupon.expires_at = moment(coupon.expires_at).format("YYYY-MM-DDTHH:mm:ss")
    }
    dispatch(CodeAction
      .createCouponCodeDynamic({
        body: { coupon }
      }))
      .then(res => {
        commonService.forSuccess("Coupon Code created successfully!", "Success");
        setLoaded(false);
        setState({ ...state, open: false });
        setForm({ ...defaultForm });
      });

  };

  const handleChange = (target) => {
    if (target.name === "expires_at") {
      let diff;
      if (typeof target.value !== "string") {
        diff = moment(target.value).diff(moment().subtract(2, "minutes"));
        if (diff < 0) {
          commonService.forError("Invalid Date time", "Error");
          return false
        }
      }
    }
    setForm({ ...form, [target.name]: target.value });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className="btn-theme-primary mb-3"
        onClick={toggleDrawer(true)}
      >
        Add Coupon
        </Button>
      <DrawerModel
        toggleDrawer={toggleDrawer}
        open={state.open}
      >
        <form
          className="login100-form p-3"
          id="login_form"
          onSubmit={e => handleSubmit(e)}
        >
          <div className="inner_form">
            <div className="fields">
              <h6 className="mb-3 text-center">
                {currentCouponCode ? "Edit" : "New"} Coupon Code
                </h6>
              <div className="row p-2 ">
                <FormGroup className="col-12 pt-2 pb-2">
                  <TextField
                    variant="outlined"
                    label="Coupon Code"
                    name="name"
                    required
                    type="text"
                    value={form.name}
                    onChange={e => handleChange({ name: "name", value: e.target.value.toLocaleUpperCase() })}
                  />
                </FormGroup>
                <FormGroup className="col-12 pt-2 pb-2">
                  <InputLabel id="demo-simple-select-outlined-label">Expires on</InputLabel>
                  <Datetime
                    name="expires_at"
                    value={form.expires_at}
                    dateFormat="MM/DD/YYYY"
                    timeFormat="hh:mm:ss A"
                    onChange={e => handleChange({ name: "expires_at", value: e })}
                  />
                </FormGroup>
                <FormGroup className="col-12 pt-2 pb-2">
                  <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Offer Type(Annual)</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      label="Offer Type(Annual)"
                      className="w-100"
                      name="offer_type"
                      required
                      id="demo-simple-select"
                      value={form.offer_type}
                      onChange={e => handleChange(e.target)}
                    >
                      <MenuItem value={'amount_off'}>Dollar Amount Off</MenuItem>
                      <MenuItem value={'percent_off'}>Percentage Off</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
                <FormGroup className="col-12 pt-2 pb-2">
                  <TextField
                    variant="outlined"
                    label={`Offer Value`}
                    name="offer_value"
                    type="number"
                    required
                    value={form.offer_value}
                    onChange={e => handleChange(e.target)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment className="mr-1">
                          {form.offer_type === "amount_off" ? "$" : "%"}
                        </InputAdornment>
                      )
                    }}
                  />
                </FormGroup>

                <FormGroup className="col-12 pt-2 pb-2">
                  <TextField
                    rows={3}
                    multiline
                    variant="outlined"
                    label="description"
                    name="description"
                    required
                    value={form.description}
                    onChange={e => handleChange(e.target)}
                  />
                </FormGroup>

              </div>

              <div className="ml-2 mt-3">
                <Button
                  variant="contained"
                  color="default"
                  className="text-uppercase btn mr-2"
                  type="button"
                  onClick={toggleDrawer(false)}
                >
                  Cancel
                  </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="text-uppercase btn btn-primary "
                  id="submit"
                  type="submit"
                >
                  {currentCouponCode ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DrawerModel>
    </div>
  );
};

export default PageForm;
