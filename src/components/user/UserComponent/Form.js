import React, { useEffect } from "react";
import {  Button, TextField, FormGroup, Switch} from "@material-ui/core";
// for flash message
import * as commonService from "utils/CommonService";
import * as UserAction from "redux/actions/UserActions";
import { useDispatch } from "react-redux";
import DrawerModel from "components/shared/ui-components/drawer-model/DrawerModel";

const PageForm = ({ setCurrentUser, currentUser }) => {
  const dispatch = useDispatch();
  let defaultForm = {
    first_name: "",
    last_name: "",
    email: "",
    lifetime: false
  };
  const [state, setState] = React.useState({ open: false });
  const [form, setForm] = React.useState({ ...defaultForm });
  // const { trialDurations } = useSelector(store => store.configReducer.configList);
  useEffect(() => {
    if (currentUser && !state.open) {
      setState({ open: true });
      setForm(currentUser);
    }
  }, [currentUser, state]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (currentUser) setCurrentUser(null);
    setState({ ...state, open });
    setForm(defaultForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
       
        UserAction
          .createUser({
            body: { user: form },
            dispatch
          })
          .then(res => {
            commonService.forSuccess("User Created Successfully!", "Success");
            setState({ ...state, open: false });
            setForm({ ...defaultForm });
          });
    
    };

  const handleChange = (target) => {
    setForm({ ...form, [target.name]: target.value });
  };
  const toggleLifetime = (checked) => {
    setForm({ ...form, lifetime: checked });
  };

  return (
      <>
        <div className="text-right mb-3">
          <Button
              variant="contained"
              color="primary"
              className="cursor-pointer mt-2 "
              onClick={toggleDrawer(true)}
              >
             Add New
          </Button>
        </div>
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
                  {currentUser ? "Edit" : "New"} User
                </h6>
                <div className="row p-2 ">
                  <FormGroup className="col-12 pt-2 pb-2">
                    <TextField
                    focused={false}
                       
                        label="First name"
                        name="first_name"
                        required
                        value={form.first_name}
                        onChange={e => handleChange(e.target)}
                        />
                  </FormGroup>
                  <FormGroup className="col-12 pt-2 pb-2">
                    <TextField
                        variant="outlined"
                        label="Last name"
                        name="last_name"
                        required
                        value={form.last_name}
                        onChange={e => handleChange(e.target)}
                        />
                  </FormGroup>
                  <FormGroup className="col-12 pt-2 pb-2">
                    <TextField
                        variant="outlined"
                        label="Email"
                        name="email"
                        required
                        value={form.email}
                        onChange={e => handleChange({name: "email", value: e.target.value.toLocaleLowerCase()})}
                        />
                  </FormGroup>
                  
                  <FormGroup className="col-12 pt-2 pb-2">
                  <div className="row align-items-center">
                    <label className="col-4 mb-0">Life Time</label>
                    <div className="col-8">
                      <Switch
                        checked={form.lifetime}
                        value={form.lifetime}
                        onClick={(e) => toggleLifetime(e.target.checked)}
                        color="primary"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </div>
                  </div>
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
                    {currentUser ? "Update" : "Add User"}
                  </Button>
                </div>
              </div>
            </div>
        </form>
      </DrawerModel>
    </>
  );
};

export default PageForm;
