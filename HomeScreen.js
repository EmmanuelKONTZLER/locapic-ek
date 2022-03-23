import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home(props) {
  const [pseudo, setPseudo] = useState("Manu");
  const [pseudoInLocalStorage, setPseudoInLocalStorage] = useState();

  useEffect(() => {
    function getPseudoInLocalStorage() {
      AsyncStorage.getItem("pseudo", function (error, data) {
        setPseudoInLocalStorage(data);
      });
    }
    getPseudoInLocalStorage();
  }, []);

  if (pseudoInLocalStorage != null) {
    return (
      <View style={styles.container}>
        <Text style={styles.locapic}>LOCAPIC</Text>
        <Text style={styles.welcome}>Welcome back {pseudoInLocalStorage}</Text>
        <Button
        title="Go to ChatScreen"
        buttonStyle={{ backgroundColor: "#6096ba", marginTop: 50, }}
        onPress={() => {
          props.sendPseudo(pseudoInLocalStorage),
          props.navigation.navigate("BottomNav")
        }}
      />
        <Button
          title="Logout"
          buttonStyle={{ backgroundColor: "red", marginTop: 10, borderRadius:10 }}
          onPress={() => {
            AsyncStorage.removeItem("pseudo"),
            setPseudoInLocalStorage();
          }}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.locapic}>LOCAPIC</Text>
      <Input
        placeholder="Your Name"
        containerStyle={styles.input}
        inputStyle={{ marginLeft: 10 }}
        onChangeText={(value) => setPseudo(value)}
        value={pseudo}
      />
      <Button
        title="Go to ChatScreen"
        buttonStyle={{ backgroundColor: "#6096ba" }}
        onPress={() => {
          props.sendPseudo(pseudo),
          AsyncStorage.setItem("pseudo", pseudo),
          props.navigation.navigate("BottomNav")
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    sendPseudo: function (pseudo) {
      dispatch({ type: "sendPseudo", pseudo: pseudo });
    },
  };
}

export default connect(null, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf0ca",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: 25,
    width: "70%",
  },
  locapic: {
    marginBottom: 100,
    fontSize: 50,
    color: "#0d3b66",
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 20,
    color: "#0d3b66",
    fontWeight: "bold",
  },
});
