import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import Busqueda from "../screens/Busqueda";
import Profesional from "../screens/Profesional";
import InfoProfesional from "../screens/InfoProfesional";
import Horarios from "../screens/Horarios";

const Stack = createStackNavigator();

export default function BusquedaStack(props) {
  return (
    <Stack.Navigator
    >
      <Stack.Screen
      name="busqueda"
      component={Busqueda}
      cardStyle={{backgroundColor: 'white'}}
      options={{title: "Home", headerLeft: () => (
        <IconButton icon='menu' size={32} color='#5085C4' onPress={() => props.navigation.openDrawer()}/>
      )
      }}/>

      <Stack.Screen
      name="profesional"
      component={Profesional}
      options={{title: "Busqueda"}}
      cardStyle={{backgroundColor: 'white'}}/>

      <Stack.Screen
      name="infoProfesional"
      component={InfoProfesional}
      options={{title: "Home"}}
      cardStyle={{backgroundColor: 'white'}}/>

      <Stack.Screen
      name="horarios"
      component={Horarios}
      options={{title: "Home"}}
      cardStyle={{backgroundColor: 'white'}}/>

    </Stack.Navigator>
  );
}
