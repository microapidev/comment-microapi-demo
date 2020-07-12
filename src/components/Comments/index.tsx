import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

type TabPanelProps = {
  children: string;
  index: number;
  value: number;
  other?: any;
};

const TabPanel: FunctionComponent<TabPanelProps> = ({
  children,
  index,
  value,
  other,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
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

const Comments: FunctionComponent = () => {
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
          <Tab label="Comment Create" {...a11yProps(0)} />
          <Tab label="Comment Get" {...a11yProps(1)} />
          <Tab label="Comment Update" {...a11yProps(2)} />
          <Tab label="Comment Delete" {...a11yProps(3)} />
          <Tab label="Comment Vote" {...a11yProps(4)} />
          <Tab label="Comment Flag" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Comment Create Tab Panel
      </TabPanel>
      <TabPanel value={value} index={1}>
        Comment Get Tab Panel
      </TabPanel>
      <TabPanel value={value} index={2}>
        Comment Update Tab Panel
      </TabPanel>
      <TabPanel value={value} index={3}>
        Comment Delete Tab Panel
      </TabPanel>
      <TabPanel value={value} index={4}>
        Comment Vote Tab Panel
      </TabPanel>
      <TabPanel value={value} index={5}>
        Comment Flag Tab Panel
      </TabPanel>
    </div>
  );
};

export default Comments;
