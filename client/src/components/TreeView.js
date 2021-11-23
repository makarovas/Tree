import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Loader from "./../Story/Loader";
import NodeView from "./NodeView";

const useStyles = makeStyles({
  root: {
    minHeight: 260,
    flexGrow: 1,
    maxWidth: 420,
    paddingTop: 20,
  },
});

const MainTreeView = ({ tabValue }) => {
  const classes = useStyles();
  const { root, typeRoot, loading, error } = useSelector((state) => state);

  return (
    <div
      style={{
        padding: 8,
        border: "1px solid darkblue",
        borderTop: "none",
      }}
    >
      {loading && <Loader />}
      {!error && !loading && (
        <TreeView
          className={classes.root}
          defaultExpandIcon={<ExpandMoreIcon />}
          defaultCollapseIcon={<ExpandMoreIcon />}
        >
          <NodeView data={tabValue === 0 ? root : typeRoot} />
        </TreeView>
      )}
      {error && <h1>Fetching Error</h1>}
    </div>
  );
};
export default MainTreeView;
