import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Overlay, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";


function Map(props) {
  const [pseudo, setPseudo] = useState("");
  const [firstLatitude, setFirstLatitude] = useState();
  const [firstLongitude, setFirstLongitude] = useState();
  const [myLatitude, setMyLatitude] = useState(0);
  const [myLongitude, setMyLongitude] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [POI, setPOI] = useState({});
  const [POITitle, setPOITitle] = useState("");
  const [POIDesc, setPOIDesc] = useState("");
  const [POIList, setPOIList] = useState([]);
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  useEffect(() => {
    async function askPermissions() {
      setPseudo(props.pseudo);
      var { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        // Position à la connexion → Servira à centrer la carte sur
        var location = await Location.getCurrentPositionAsync({});
        console.log("location", location.coords);
        setFirstLatitude(location.coords.latitude);
        setFirstLongitude(location.coords.longitude);
        // Position actualisée
        Location.watchPositionAsync({ distanceInterval: 1 }, (location) => {
          console.log("updated location", location);
        });
        setMyLatitude(location.coords.latitude);
        setMyLongitude(location.coords.longitude);
      }
    }
    askPermissions();
  }, []);

  // Option du bouton d'activation du mode POI en fonction du statut
  var buttonOption = {};
  {
    !isActive
      ? ((buttonOption.iconName = "ios-pin"),
        (buttonOption.title = "Click to active POI mode"))
      : ((buttonOption.iconName = "ios-close-circle-outline"),
        (buttonOption.title = "Click to close POI mode"));
  }

  // ------ Ajout de POI ------

  // Activation du mode Add POI en cliquant sur le bouton
  var activePoi = () => {
    setIsActive(!isActive);
  };

  // Envoi et stockage temporaire des coordonnées du POI + ouverture d'un overlay pour saisir Title et Desc
  var addPoiCoords = (coords) => {
    if (isActive) {
      var position = { lat: coords.latitude, lon: coords.longitude };
      setPOI({ ...POI, position });
      setOverlayIsVisible(true);
    }
  };

  // Confirmation du POI via l'overlay, le POI est stocké dans un tableau avec les autres POI
  var confirmPOI = () => {
    setPOIList([
      ...POIList,
      {
        lat: POI.position.lat,
        lon: POI.position.lon,
        title: POITitle,
        desc: POIDesc,
      },
    ]);
    setPOI({});
    setPOITitle("");
    setPOIDesc("");
    setOverlayIsVisible(false);
    setIsActive(false);
  };

  // Annulation du POI via Overlay ou clic en dehors de l'overlay, les infos concernant le POI sont effacées, le POI n'est pas enregistré
  var cancelPOI = () => {
    setPOI({});
    setPOITitle("");
    setPOIDesc("");
    setOverlayIsVisible(false);
    setIsActive(false);
  };

  // Création des Markers de POI
  if (POIList.length > 0) {
    console.log("POIList", POIList);
    var POIMarkers = POIList.map((element, i) => {
      return (
        <Marker
          key={i}
          pinColor="blue"
          coordinate={{ latitude: element.lat, longitude: element.lon }}
          title={element.title}
          description={element.desc}
        />
      );
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <Overlay
        isVisible={overlayIsVisible}
        onBackdropPress={() => cancelPOI()}
        overlayStyle={{ width: "75%" }}
      >
        <Input
          placeholder="Title"
          containerStyle={styles.bold}
          onChangeText={(value) => setPOITitle(value)}
          value={POITitle}
        />
        <Input
          placeholder="Description"
          multiline={true}
          onChangeText={(value) => setPOIDesc(value)}
          value={POIDesc}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            title="Cancel"
            buttonStyle={{ backgroundColor: "#6096ba" }}
            onPress={() => cancelPOI()}
          />
          <Button
            title="Confirm"
            buttonStyle={{ backgroundColor: "#6096ba" }}
            onPress={() => confirmPOI()}
          />
        </View>
      </Overlay>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: firstLatitude,
          longitude: firstLongitude,
          latitudeDelta: 0.1844,
          longitudeDelta: 0.3,
        }}
        onPress={(e) => addPoiCoords(e.nativeEvent.coordinate)}
      >
        {POIMarkers}
        {myLatitude && myLongitude && pseudo ? (
          <Marker
            coordinate={{ latitude: myLatitude, longitude: myLongitude }}
            title={pseudo}
            description="I am here"
          />
        ) : (
          <></>
        )}
      </MapView>
      <Button
        title={buttonOption.title}
        buttonStyle={{ backgroundColor: "#6096ba" }}
        onPress={() => activePoi()}
        icon={
          <Ionicons
            name={buttonOption.iconName}
            color={"#ffffff"}
            style={{ marginRight: "auto" }}
          />
        }
        iconRight
      />
    </View>
  );
}

function mapStateToProps(state) {
  return { pseudo: state.pseudo };
}

export default connect(mapStateToProps, null)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bold: {
    fontWeight: "bold",
  },
});
