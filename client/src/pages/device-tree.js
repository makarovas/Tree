import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { fetchData } from "./../store/action";
import PaperTabs from "../components/Tabs";
import TreeView from "../components/TreeView";
import { alert } from "./../Story/alert";

const socket = io("http://localhost:3002/");

const DeviceTree = () => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    socket.on("update", (message) => {
      alert(message, "success");
      dispatch(fetchData());
    });

    dispatch(fetchData());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  return (
    <div>
      <PaperTabs handleTabChange={handleTabChange} tabValue={tabValue} />
      {<TreeView tabValue={tabValue} />}
    </div>
  );
};

export default DeviceTree;
