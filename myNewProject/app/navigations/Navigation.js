import React from "react";
import { View, Text, Button } from "react-native";
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar } from "react-native-elements";
import HomeStack from "./HomeStack";
import PerfilStack from "./PerfilStack";
import HistorialStack from "./HistorialStack";
import EstadisticasStack from "./EstadisticasStack";
import PagoStack from "./PagoStack";
import ConfiguracionStack from "./ConfiguracionStack";
import DrawerContent from "../screens/DrawerContent";


const Drawer = createDrawerNavigator();

export default function Navigation(props) {
  const {route} = props;
  var obj_demandante = route.params;
  global.obj_id_demandante=obj_demandante.id;
  global.obj_name_demandante=obj_demandante.name;


  return (
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        contentOptions={{
          inactiveTintColor:"#646464",
          activeTintColor:"#00a680",
        }}
        screenOptions={({ route }) =>({
          drawerIcon: ({color}) => screenOptions(route,color),
        })}

      >
        <Drawer.Screen name="Home" component={HomeStack}/>
        <Drawer.Screen name="Perfil" component={PerfilStack}  />
        <Drawer.Screen name="Historial" component={HistorialStack}/>
        <Drawer.Screen name="Estadisticas" component={EstadisticasStack}/>
        <Drawer.Screen name="Pago" component={PagoStack}/>
        <Drawer.Screen name="Configuración" component={ConfiguracionStack} />

      </Drawer.Navigator>
  );
}

function screenOptions(route,color){
  let iconName;

  switch (route.name) {
    case "Home":
      iconName = "home-outline";
      break;
    case "Estadisticas":
      iconName = "chart-bar";
      break;
    case "Perfil":
      iconName = "account";
      break;
    case "Historial":
      iconName = "calendar-month-outline";
      break;
    case "Pago":
      iconName = "cash";
      break;
    case "Configuracion":
      iconName = "settings-outline";
      break;
    default:
      break;
  }
  return(
    <Icon type="material-community" name={iconName} size ={22} color={color}/>
  )
}
