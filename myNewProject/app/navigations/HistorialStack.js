import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

import Historial from "../screens/Historial";

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function HistorialStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Historial" component={Historial} options={{ headerLeft: () => (
          <IconButton icon='menu' size={32} color='#5085C4' onPress={() => props.navigation.openDrawer()}/>
        )
        }}/>
    </Stack.Navigator>
  );
}
