export var NetworkMode;
(function(NetworkMode2) {
  NetworkMode2["LTEm"] = "ltem";
  NetworkMode2["NBIoT"] = "nbiot";
})(NetworkMode || (NetworkMode = {}));
export const cellId = ({
  nw,
  area,
  mccmnc,
  cell
}) => `${nw}-${cell}-${mccmnc}-${area}`;
