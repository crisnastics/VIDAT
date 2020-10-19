import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { View, Text, Button } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactosStack from "./ContactosStack";
import BusquedaStack from "./BusquedaStack";
import MuroStack from "./MuroStack";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();


export default function HomeStack(props){
  return (
      <Tab.Navigator
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#00a680",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          headerShown: false,
        })}
      >
        <Tab.Screen name="Muro" component={MuroStack} />
        <Tab.Screen name="Busqueda" component={BusquedaStack} />
        <Tab.Screen name="Contactos" component={ContactosStack}/>

      </Tab.Navigator>


  );
}

function screenOptions(route,color){
  let iconName;

  switch (route.name) {
    case "Contactos":
      iconName = "contacts";
      break;
    case "Busqueda":
      iconName = "magnify";
      break;
    case "Muro":
      iconName = "compass-outline";
      break;
  }
  return(
    <Icon type="material-community" name={iconName} size ={22} color={color}/>
  )
}
