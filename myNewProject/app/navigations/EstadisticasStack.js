import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Estadisticas from "../screens/Estadisticas";

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function EstadisticasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Estadisticas" component={Estadisticas} options={{title: "Estadisticas del Usuario"}}/>
    </Stack.Navigator>
  );
}
