export default function (pseudo = "pouet", action) {
  if (action.type == "sendPseudo") {
    return action.pseudo;
  } else {
    return pseudo;
  }
}
