import React from 'react';
import Index from "./app/navigations/Index";
import { YellowBox } from "react-native";
import { firebaseApp } from "./app/utils/firebase";
import { decode, encode } from "base-64";

YellowBox.ignoreWarnings([""]);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return <Index />;
}
