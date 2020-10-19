import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Pago from "../screens/Pago";

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function PagoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pago" component={Pago} options={{title: "Información de Pago"}}/>
    </Stack.Navigator>
  );
}
