import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Interest(props) {
  const [poiList, setPoiList] = useState([]);
  const [allPoiList, setAllPoiList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    function getPoiFromAsyncStorage() {
      AsyncStorage.getItem("poi", function (error, data) {
        data = JSON.parse(data);
        setAllPoiList(data)
        if(data){
          data = data.filter((e) => e.pseudo === props.pseudo);
          setPoiList(data);
        }
      });
    }
    getPoiFromAsyncStorage();
  }, [isFocused]);

  var deletePoi = (poi,i) => {
    var updatePoi = [...poiList];
    updatePoi.splice(i, 1);
    setPoiList(updatePoi);
    props.deletePoi(i);
    console.log(allPoiList.length)
    let poideleted = [...allPoiList].filter(e=> e!=poi)
    AsyncStorage.setItem("poi", JSON.stringify(poideleted))
  };

  let myPoi = poiList.map((poi, i) => {
    return (
      <ListItem
        key={i}
        bottomDivider
        containerStyle={{ backgroundColor: "#faf0ca" }}
      >
        <ListItem.Content
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View>
            <ListItem.Title>Titre : {poi.title}</ListItem.Title>
            <ListItem.Subtitle>Desc : {poi.desc}</ListItem.Subtitle>
          </View>
          <Ionicons
            name="ios-trash"
            size={24}
            color="grey"
            onPress={() => deletePoi(poi,i)}
          />
        </ListItem.Content>
      </ListItem>
    );
  });

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, marginTop: 50 }}>{myPoi}</ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  return { poi: state.poi, pseudo: state.pseudo };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePoi: function (index) {
      dispatch({ type: "deletePoi", index: index });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Interest);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf0ca",
  },
});
