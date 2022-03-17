export default function (poi = [], action) {
  if (action.type == "sendPoi") {
    let copyPoi = [...poi];
    copyPoi.push(action.poi);
    console.log("poi", copyPoi);
    return copyPoi;
  } else if (action.type == "deletePoi") {
    let copyPoi = [...poi];
    copyPoi.splice(action.index, 1);
    console.log("poi", copyPoi);
    return copyPoi;
  } else {
    console.log("poi ko");
    return poi;
  }
}
