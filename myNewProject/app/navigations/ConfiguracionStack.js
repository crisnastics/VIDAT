import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import Configuracion from "../screens/Configuracion";

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function ConfiguracionStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Configuracion" component={Configuracion}  options={{title: "Configuración", headerLeft: () => (
          <IconButton icon='menu' size={32} color='#5085C4' onPress={() => props.navigation.openDrawer()}/>
        )
        }}/>
    </Stack.Navigator>
  );
}
