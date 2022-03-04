import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { ListItem, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

function Chat(props) {

  var data = [
    { name: "Manu", text: "Salut tout le monde" },
    { name: "Abi", text: "Salut Manu, moi c'est Abi" },
    { name: "Jen", text: "Salut Manu, aalut Abi, moi c'est Jen" },
    { name: "Manu", text: "Salut Jen, salut Abi" },
    { name: "Abi", text: "Salut Jen, comment ca va ?" },
    { name: "Jen", text: "Bien et vous ?" },
    { name: "Manu", text: "Ca va" },
    { name: "Manu", text: "☺" },
  ];
  var messages = data.map((message, i) => {
    return (
      <ListItem
        key={i}
        bottomDivider
        containerStyle={{ backgroundColor: "#faf0ca" }}
      >
        <ListItem.Content>
          <ListItem.Title>{message.name}</ListItem.Title>
          <ListItem.Subtitle>{message.text}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  });
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, marginTop: 50 }}>{messages}</ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom:3, marginLeft:"3%", marginTop:0, maxHeight:200 }}>
        <Input placeholder="Your Message" containerStyle={styles.input} multiline = {true} >
        </Input>
        <View
          style={{ width: "15%", flexDirection: "row",  justifyContent: "center"}}
        >
          <Ionicons name="ios-send" size={40} color="#ff7d00" onPress={()=>console.log('send message by', props.pseudo)}/>
        </View>
      </View>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

function mapStateToProps(state){
  return {pseudo: state.pseudo}
}

export default connect(
  mapStateToProps,
  null
)(Chat)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf0ca",
  },
  input: {
    width: "85%",
    height: "70%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    position: "relative"
  },
});
