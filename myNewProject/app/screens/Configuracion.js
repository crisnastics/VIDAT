import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../components/Loading";
import InfoUser from "../components/InfoUser";
import OpcionCuenta from "../components/OpcionCuenta";

const config = require('../../config.json');


export default function Configuracion(props) {
  const [userInfo, setUserInfo] = useState(null); // Estado para que me devuelva el estado del usaurio
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [realoadUserInfo, setRealoadUserInfo] = useState(false);
  const toastRef = useRef();
  //cada vez que realoadUserInfo cambie de false a true, se vuelva a ejecutar la funcion
  useEffect(() => {
       fetch(config.urlserver+'/demandante/'+obj_id_demandante)
       .then((response) => response.json())
       .then((json) => {
         setUserInfo(json);
       });
    setRealoadUserInfo(false); //vuelve a setear el estado realoadUserInfo a false
  }, []);

  const logout = () => {
      setLoading(false);
      props.navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
  };

  return (
    <View style={styles.viewUserInfo}>

      <OpcionCuenta userInfo={userInfo} // pasando informacion usaurioiario y toast por props
      toastRef={toastRef}
      setRealoadUserInfo = {setRealoadUserInfo}
       />


      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={logout}
      />
      <Toast ref={toastRef} position="center" opacity={0.9}  fadeInDuration ={1000} fadeOutDuration={1000} />
      <Loading text={loadingText} isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
    justifyContent:"center",

  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: "#00a680",
  },
});
