import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { ListItem, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";
var socket = socketIOClient("https://locapic-backend-ek.herokuapp.com/");

function Chat(props) {

  const [messageToSend, setMessageToSend] = useState()
  const [messages, setMessages] = useState([])

  useEffect(() => {
   
    socket.on('sendMessageFromBack', (newMessage)=> {
      var myRegex1 = /:\)/gi;
      var myRegex2 = /:\(/gi;
      var myRegex3 = /:p/gi;
      var myRegex4 = /[^\s]*Fuck[^\s]*/gi
      var monTexte = newMessage.text
      monTexte = monTexte.replace(myRegex1, "\u263A");
      monTexte = monTexte.replace(myRegex2, "\u2639");
      monTexte = monTexte.replace(myRegex3, "\uD83D\uDE1B")
      monTexte = monTexte.replace(myRegex4, "***")

      setMessages([...messages, {name: newMessage.name, text:monTexte}])
    });
    
  }, [messages]);

  
  var datas = messages.map((message, i) => {
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
      <ScrollView style={{ flex: 1, marginTop: 50 }}>{datas}</ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginBottom: "3%",
            marginLeft: "3%",
          }}
        >
          <Input
            placeholder="Your Message"
            containerStyle={styles.input}
            multiline={true}
            onChangeText={(value)=>setMessageToSend(value)}
            value={messageToSend}
          ></Input>
          <View
            style={{
              width: "15%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="ios-send"
              size={40}
              color="#ff7d00"
              onPress={() => {
                socket.emit("sendMessage", {name:props.pseudo, text:messageToSend}),
                setMessageToSend()
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

function mapStateToProps(state) {
  return { pseudo: state.pseudo };
}

export default connect(mapStateToProps, null)(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf0ca",
  },
  input: {
    width: "85%",
    maxHeight: 100,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    position: "relative",
  },
});
