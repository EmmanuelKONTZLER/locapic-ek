import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";

export default function Home(props) {

  const [pseudo, setPseudo] = useState("")

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
        onPress={() =>{console.log(pseudo), props.navigation.navigate("BottomNav")}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

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
