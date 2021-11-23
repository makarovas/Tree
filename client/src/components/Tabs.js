import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const PaperTabs = ({ tabValue, handleTabChange }) => {
  return (
    <div>
      <Paper
        variant="outlined"
        elevation={12}
        style={{
          padding: 8,
          border: "1px solid darkblue",
        }}
      >
        <Tabs
          value={tabValue}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleTabChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Tree View" />
          <Tab label="Grouping by type" />
        </Tabs>
      </Paper>
    </div>
  );
};

export default PaperTabs;
