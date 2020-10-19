import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import Perfil from "../screens/Perfil";

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function PerfilStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={Perfil}  options={{ headerLeft: () => (
          <IconButton icon='menu' size={32} color='#5085C4' onPress={() => props.navigation.openDrawer()}/>
        )
        }}/>
    </Stack.Navigator>
  );
}
