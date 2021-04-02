import React from "react";
import PropTypes from "prop-types";
// material component
import { Tabs, Tab, Typography, Box } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const TabsUI = ({ labels, tabs, selected }) => {
  const defaultTab = selected ? selected : 0;
  const [value, setValue] = React.useState(defaultTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {labels &&
          labels.map((label, index) => (
            <Tab key={index} label={label} {...a11yProps(index)} />
          ))}
      </Tabs>
      {tabs &&
        labels.map((tabContent, index) => (
          <TabPanel
            className="custom-pane"
            value={value}
            index={index}
            key={index}
          >
            {tabs[index]}
          </TabPanel>
        ))}
    </>
  );
};
export default TabsUI;
