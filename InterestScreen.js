import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons'; 

function Interest(props) {
  const [poiList, setPoiList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    function getPoiFromStore() {
      let poi = props.poi;
      console.log("int", poi);
      setPoiList(poi);
    }
    getPoiFromStore();
  }, [isFocused]);

  let myPoi = poiList.map((poi, i) => {
    return (
      <ListItem
         key={i}
          bottomDivider
          containerStyle={{ backgroundColor: "#faf0ca" }}
        >
          <ListItem.Content style={{flexDirection:"row", justifyContent:"space-between"}}>
            <View>
            <ListItem.Title>Titre : {poi.title}</ListItem.Title>
            <ListItem.Subtitle>Desc : {poi.desc}</ListItem.Subtitle>
            </View>
            <Ionicons name="ios-trash" size={24} color="grey" onPress={() => console.log(i)} />
          </ListItem.Content>
        </ListItem>

    )
  })

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, marginTop: 50 }}>
        {myPoi}
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  return { poi: state.poi };
}

export default connect(mapStateToProps, null)(Interest);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf0ca",
  },
});
