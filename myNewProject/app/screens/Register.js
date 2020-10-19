import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import RegisterForm from "../components/RegisterForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";

export default function Register() {
  const toastRef = useRef();
  return (
    <KeyboardAwareScrollView>
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} fadeInDuration ={1000} fadeOutDuration={1000}/>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
