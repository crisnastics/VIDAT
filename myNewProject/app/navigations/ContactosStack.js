import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Contactos from "../screens/Contactos";

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function ContactosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="contactos" component={Contactos} options={{title: "Home"}}/>
    </Stack.Navigator>
  );
}
