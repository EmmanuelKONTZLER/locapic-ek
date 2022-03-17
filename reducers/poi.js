export default function (poi = [], action) {
    if (action.type == "sendPoi") {
        let copyPoi = [...poi]
        copyPoi.push(action.poi)
        console.log("poi",copyPoi)
      return copyPoi;
    } else {
        console.log('poi ko')
      return poi;
    }
  }
  