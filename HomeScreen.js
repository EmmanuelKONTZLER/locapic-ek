import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import {connect} from 'react-redux';

function Home(props) {

  const [pseudo, setPseudo] = useState("Manu")

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
        onPress={() =>{props.sendPseudo(pseudo), props.navigation.navigate("BottomNav")}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    sendPseudo: function(pseudo) {
    dispatch( {type: 'sendPseudo', pseudo: pseudo })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Home);

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
});
