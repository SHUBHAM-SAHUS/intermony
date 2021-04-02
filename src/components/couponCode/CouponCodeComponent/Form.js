import React, { useEffect } from "react";
import {
    Button,
    TextField,
    FormGroup
} from "@material-ui/core";

import { useDispatch} from "react-redux";
// for flash message
import * as commonService from "utils/CommonService";
import * as CodeAction from "redux/actions/CouponCodeActions";
import DrawerModel from "components/shared/ui-components/drawer-model/DrawerModel";

const PageForm = ({setLoaded, setCurrentCouponCode,currentCouponCode}) => {
  //const globalState = useContext(store);
  const dispatch = useDispatch();
  let defaultForm = {
    email: "",
    description: ""
  };
  const [state, setState] = React.useState({ open: false });
  const [form, setForm] = React.useState({ ...defaultForm });

  useEffect(() => {
    if (currentCouponCode  && !state.open) {
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
    if (!form.email) delete form.email;
    dispatch(CodeAction
          .createCouponCode({
            body: {coupon: form}
          }))
          .then(res => {
            commonService.forSuccess("Coupon Code created successfully!", "Success");
            setLoaded(false);
            setState({ ...state, open: false });
            setForm({ ...defaultForm });
          });
   
    };

  const handleChange= (target) => {
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
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={e => handleChange({name: "email", value: e.target.value.toLocaleLowerCase()})}
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
