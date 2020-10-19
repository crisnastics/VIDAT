import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from "react-native-elements";
import { IconButton } from 'react-native-paper';
import Muro from "../screens/Muro";
import Chat from "../screens/Chat";

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MuroStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="muro" component={Muro} options={{title: "Home", headerLeft: () => (
        <IconButton icon='menu' size={32} color='#5085C4' onPress={() => props.navigation.openDrawer()}/>
      )
    }} />
      <Stack.Screen name="chat" component={Chat} options={{title: "Home"}}/>
    </Stack.Navigator>
  );
}
