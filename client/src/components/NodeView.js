import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";

const NodeView = ({ data }) => {
  const { id, markerId, productId, deviceName, type, isAvailable, children } =
    data;
  return (
    <TreeItem nodeId={id + "1"} label={`${deviceName}`}>
      {type !== "Server" && type !== "Devices" && type !== "Hubs" && (
        <TreeItem nodeId={id + "2"} label={`markerId : ${markerId}`} />
      )}
      {type !== "Server" && type !== "Devices" && type !== "Hubs" && (
        <TreeItem nodeId={id + "3"} label={`productId : ${productId}`} />
      )}
      <TreeItem nodeId={id + "4"} label={`type : ${type}`} />
      <TreeItem nodeId={id + "5"} label={`status : ${isAvailable}`} />
      {children &&
        children.map((child, index) => (
          <NodeView data={child} key={id + index} />
        ))}
    </TreeItem>
  );
};

export default NodeView;
