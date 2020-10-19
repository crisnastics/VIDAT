import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CuentasStack from "./CuentasStack";

export default function Index() {
  return (
    <NavigationContainer>
      <CuentasStack/>
    </NavigationContainer>
  );
}
