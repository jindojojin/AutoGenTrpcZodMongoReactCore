import NodeCache from "node-cache";

export const NODE_CACHE = new NodeCache({
  checkperiod: 30, // used for the automatic delete check interval
  deleteOnExpire: true,
});
