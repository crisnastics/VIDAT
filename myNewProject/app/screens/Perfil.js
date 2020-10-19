import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import { Input, Icon, Button, Text } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../components/Loading";
import InfoUser from "../components/InfoUser";

const config = require('../../config.json');


export default function Perfil() {
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
  }, [realoadUserInfo]);


  return (
    <ScrollView>
      {userInfo && ( //si user info tiene datos
        <InfoUser
          userInfo={userInfo} // pasamos por props el objeto con la informacion
          toastRef={toastRef}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
          setRealoadUserInfo={setRealoadUserInfo}
        />
      )}

      <View>
        <Text style={styles.descriptiontitle}> Enfermedades Crónicas</Text>
          <TextInput
            placeholder="Escribir aquí ..."
            placeholderTextColor='white'
            style={{height: 40, backgroundColor:"#3E6C99", color:"white", paddingLeft:20}}
            color="white"
          />
        <Text style={styles.descriptiontitle}> Alergias</Text>
          <TextInput
            placeholder="Escribir aquí ..."
            placeholderTextColor='white'
            style={{height: 40, backgroundColor:"#3E6C99", color:"white", paddingLeft:20}}
            color="white"
          />
        <Text style={styles.descriptiontitle}> Medicamentos que usa</Text>
          <TextInput
            placeholder="Escribir aquí ..."
            placeholderTextColor='white'
            style={{height: 40, backgroundColor:"#3E6C99", color:"white", paddingLeft:20}}
            color="white"
          />
        <Text style={styles.descriptiontitle}> Cirugías previas</Text>
          <TextInput
            placeholder="Escribir aquí ..."
            placeholderTextColor='white'
            style={{height: 40, backgroundColor:"#3E6C99", color:"white", paddingLeft:20}}
            color="white"
          />
        <Text style={styles.descriptiontitle}> Antecedentes familiares</Text>
          <TextInput
            placeholder="Escribir aquí ..."
            placeholderTextColor='white'
            style={{height: 40, backgroundColor:"#3E6C99", color:"white", paddingLeft:20}}
            color="white"
          />
      </View>

      <Loading text={loadingText} isVisible={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  btnCloseSession0: {
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopColor: "grey",
    borderTopWidth: 0.2,
    borderBottomColor: "grey",
    borderBottomWidth: 0.2,
  },

  btnCloseSession: {
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopColor: "grey",
    borderBottomWidth: 0.2,
    borderBottomColor: "grey",
  },

  descriptiontitle:{
    paddingLeft: 15,
    color: "#3E6C99",
    marginBottom: 5,
    marginTop: 10,
    fontWeight: 'bold'
  }
});
