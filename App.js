import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Applyleave from "./scr/Components/Applyleave";
import DrawerContent from "./scr/Components/DrawerContent";
import Expense from "./scr/Components/Expence&Advance";
import SearchItems from "./scr/Components/HomeScreen";
import Holidays from "./scr/Components/Holiday";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import LoginScreen from "./scr/Components/LoginScreen";
import { NativeBaseProvider } from "native-base";
// import DisplayDataScreen from "./scr/Components/Displayloads";
// import LoadsDisplay from "./scr/Components/Loads&DisplayStack";
import Loads from './scr/Components/Loads'
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Stack.Navigator
          initialRouteName={userLoggedIn ? "SearchItems" : "LoginScreen"}
        >
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerStyle: {
                backgroundColor: "blue",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchItems"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="ApplyLeaves"
        component={Applyleave}
        options={{ title: "Apply Leaves" }}
      />
      <Drawer.Screen
        name="Expenses"
        component={Expense}
        options={{ title: "Expenses" }}
      />
      <Drawer.Screen
        name="Holidays"
        component={Holidays}
        options={{ title: "Holidays" }}
      />
        <Drawer.Screen
        name="Loads"
        component={Loads}
        options={{ title: "Loads" }}
      />
    </Drawer.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="SeachItem"
        component={SearchItems}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Loads"
        component={Loads}
        options={{
          tabBarLabel: "Loads",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
};

export default App;
