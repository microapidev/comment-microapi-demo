import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import CreateComment from "./CreateComment";
import GetComment from "./GetComment";
import UpdateComment from "./UpdateComment";
import DeleteComment from "./DeleteComment";
import VoteComment from "./VoteComment";
import FlagComment from "./FlagComment";

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
        <CreateComment></CreateComment>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GetComment></GetComment>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UpdateComment></UpdateComment>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DeleteComment></DeleteComment>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <VoteComment></VoteComment>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <FlagComment></FlagComment>
      </TabPanel>
    </div>
  );
};

export default Comments;
