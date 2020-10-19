import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../screens/Login";
import Register from "../screens/Register";
import Navigation from "./Navigation";


//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function CuentasStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle:{backgroundColor:'white'},
    }}
    >
      <Stack.Screen
      name="login"
      component={Login}
      cardStyle={{backgroundColor: 'white'}}
      options={{title: "Inicio Sesión"}}/>

      <Stack.Screen
      name="navigation"
      component={Navigation}
      options={{title: ""}}
      cardStyle={{backgroundColor: 'white'}}/>


      <Stack.Screen
      name="register"
      component={Register}
      back={false}
      options={{title: "Registro"}}/>


    </Stack.Navigator>


  );
}
