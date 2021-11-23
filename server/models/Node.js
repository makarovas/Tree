function Node(id, markerId, productId, deviceName, type, isAvailable, children) {
  this.id = (id === undefined ? 0: id)
  this.markerId = markerId === undefined ? 0 : markerId;
  this.productId = productId === undefined ? 0 : productId;
  this.deviceName = deviceName === undefined ? null : deviceName;
  this.type = type === undefined ? "Device" : type;
  this.isAvailable = isAvailable === undefined ? "Available" : isAvailable;
  this.children = children === undefined ? [] : children;
}

module.exports = Node;
