import React, { useState } from "react";

import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  FormGroup
} from "@material-ui/core";
//custom form component
import {
  SelectInput,
  FormInput,
  FormButton
} from "components/shared/ui-components/form-components";

import { Durations } from "config";

const Filter = ({ handleFilter, resetLeadFilterForm }) => {
  const [filterForm, setFilterForm] = useState({
    name: "",
    duration: ""
  });
  // reset filter form and data
  const handleReset = () => {
    const data = {
      name: "",
     duration: ""

    };
    setFilterForm(data);
    resetLeadFilterForm(data);
  };

  // filter lead table according to filed value changes
  const handleChanges = (key, value) => {
    const data = { ...filterForm, [key]: value };
    setFilterForm(data);
  };

  return (
    <div className="row mb-5">
      <div className="col-12">
        <Card>
          <CardContent>
            <form onSubmit={e => handleFilter(e, filterForm)}>
              <div className="row">
                <div className="col-10">
                  <div className="row">
                    <FormGroup className="col-md-4 col-sm-5">
                      <FormInput
                        label="Title"
                        name="name"
                        value={filterForm.name || ""}
                        onChange={e => handleChanges("name", e.target.value)}
                      />
                    </FormGroup>

                    
                        <FormGroup className="col-md-4 col-sm-5">
                          <FormControl >
                            <InputLabel id="label">Duration</InputLabel>
                            <SelectInput
                                name="duration"
                                placeholder="Duration"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={e =>
                               handleChanges("duration", e.target.value)}
                        
                                value={filterForm.duration}
                                options={Durations }
                                
                                />
                          </FormControl>

                        </FormGroup>
                      

                  </div>
                </div>
                <div className="col-2">
                  <div className="row pt-2">
                    <FormButton
                      variant="contained"
                      color="secondary"
                      className="btn btn-primary "
                      type="submit"
                    >
                      go
                    </FormButton>
                    <FormButton
                      variant="contained"
                      color="default"
                      className="btn btn-dark ml-2"
                      onClick={handleReset}
                      type="button"
                    >
                      Reset
                    </FormButton>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Filter;
