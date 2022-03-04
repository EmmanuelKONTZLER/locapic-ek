export default function (pseudo = "", action) {
  if (action.type == "sendPseudo") {
    return action.pseudo;
  } else {
    return pseudo;
  }
}
