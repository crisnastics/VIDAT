import React, { useRef, useState } from "react";
import { StyleSheet, ScrollView, Image, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../components/LoginForm";
import LoginFacebook from "../components/LoginFacebook";

export default function Login(){

  const toastRef = useRef();

  return (

    <View>
    <ScrollView>
      <View style={{justifyContent: 'center',
      alignItems: 'center'}}>
        <Image
          source={require("../../assets/st2.jpg")}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <View style={styles.viewlogin}>
        <LoginForm toastRef={toastRef} />
        <CrearCuenta />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} fadeInDuration ={1000} fadeOutDuration={1000}/>
      <Divider style={styles.dividerRegister}/>
      <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} />
      </View>
    </ScrollView>

    </View>


  );
}

function CrearCuenta(){
  const navigation= useNavigation();
  return(
    <Text style={styles.textRegister}>
    ¿Aún no tienes cuenta?{" "}
      <Text style={styles.btnRegister}
      onPress={() => navigation.navigate("register")}
      >Regístrate
      </Text>
      <Text>          </Text>
      ¿Olvidaste tu contraseña?{" "}
      <Text style={styles.btnRegister}
      > Recuperar
      </Text>
    </Text>
  )
}
global.obj_photo_demandante="";



const styles = StyleSheet.create({
  logo:{
    marginTop:45,
    width:"60%",
    height:300,
  },
  viewContainer: {
   marginRight: 40,
   marginLeft: 40,

  },
  viewlogin:{
    marginRight:40,
    marginLeft:40,
  },
  textRegister:{
    marginRight:10,
    marginLeft:10,
    marginTop:15,

  },
  btnRegister:{
    color:"#00a680",
    fontWeight:"bold",
  },
  dividerRegister:{
    backgroundColor:"#00a680",
    marginTop: 20,
    marginRight:40,
    marginLeft:40,
  }
});
