import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./HomeScreen";
import Chat from "./ChatScreen";
import Map from "./MapScreen";
import Interest from "./InterestScreen";
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Map") {
            iconName = "ios-map";
          } else if (route.name === "Chat") {
            iconName = "ios-chatbubbles";
          } else if (route.name === "Pt Of Interest") {
            iconName = "ios-save";
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#ff7d00",
        inactiveTintColor: "#e0e1dd",
        style : {
          backgroundColor : "#6096ba"
        }
      }}
    >
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Pt Of Interest" component={Interest} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BottomNav" component={BottomNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
