export default function (poi = [], action) {
  if (action.type == "sendPoi") {
    let copyPoi = [...poi];
    copyPoi.push(action.poi);
    return copyPoi;
  } else if (action.type == "deletePoi") {
    let copyPoi = [...poi];
    copyPoi.splice(action.index, 1);
    return copyPoi;
  } else {
    return poi;
  }
}
