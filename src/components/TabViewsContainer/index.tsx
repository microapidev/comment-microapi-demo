import React, { FunctionComponent, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";

type TabViewsContainerProps = {
  tabLabels: string[];
  tabViews: ReactElement[];
};

function a11yProps(index: number) {
  return {
    id: `comment-tab-${index}`,
    "aria-controls": `comment-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TabViewsContainer: FunctionComponent<TabViewsContainerProps> = ({
  tabLabels,
  tabViews,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="The tabs for the different comment functionalities."
        >
          {tabLabels.map((tabLabel, index) => {
            return <Tab label={tabLabel} {...a11yProps(index)} />;
          })}
        </Tabs>
      </AppBar>
      {tabViews.map((tabView, index) => {
        return (
          <TabPanel value={value} index={index}>
            {tabView}
          </TabPanel>
        );
      })}
    </div>
  );
};

export default TabViewsContainer;
