import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useEffect, useState } from "react";
import { connect } from "react-redux";

function Map(props) {

  const [pseudo, setPseudo] = useState("anonymous")
  const [firstLatitude, setFirstLatitude] = useState()
  const [firstLongitude, setFirstLongitude] = useState()
  const [myLatitude, setMyLatitude] = useState(0)
  const [myLongitude, setMyLongitude] = useState(0)

  useEffect(() => {
    async function askPermissions() {
      console.log('pseuso dans map',props.pseudo)
      setPseudo(props.pseudo)
      var { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        // Position à la connexion → Servira à centrer la carte sur
        var location = await Location.getCurrentPositionAsync({});
        console.log('location', location.coords)
        setFirstLatitude(location.coords.latitude)
        setFirstLongitude(location.coords.longitude)
        // Position actualisée
        Location.watchPositionAsync({ distanceInterval: 1 },
          (location) => {
            console.log(location);
          }
        );
        setMyLatitude(location.coords.latitude)
        setMyLongitude(location.coords.longitude)
      }
    }
    askPermissions();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: firstLatitude,
        longitude: firstLongitude,
        latitudeDelta: 0.1844,
        longitudeDelta: 0.3,
      }}
    >
      {myLatitude && myLongitude && pseudo ?
      <Marker 
      coordinate={{ latitude: myLatitude, longitude: myLongitude}} 
      title={pseudo}
      description="I am here"
      />
    :<></>
    }
    </MapView>

  );
}

function mapStateToProps(state){
  return {pseudo: state.pseudo}
}

export default connect(
  mapStateToProps,
  null
)(Map)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
