import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { Input, Icon, Button, Divider, Avatar } from "react-native-elements";
import Toast from "react-native-easy-toast";
import { size } from "lodash";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import Modal from "../components/Modal";
const config = require('../../config.json');

export default function Profesional(props){
  const [totalProfesional, setTotalProfesinoal] = useState(null);
  const [loading, setLoading] = useState(false);
  const toastRef = useRef();
  const navigation = useNavigation();
  const { route } = props;
  var { profesion_solicitud, direccion_solicitud } = route.params;
  const listaProfesionales = [];

  //consulta bd infomacion oferente y setea en el estado listaprofesional
  useEffect(() => {
    fetch(config.urlserver+'/oferente/')
    .then((response) => response.json())
    .then((json) => {
      json.forEach((doc) => {
        if(doc.profesion === profesion_solicitud ){
          listaProfesionales.push(doc);
        }
      });
      setTotalProfesinoal(listaProfesionales);
    });
  }, []);

  return(
    <ScrollView style={styles.scrollView}>
      <View style={styles.formContainer}>
        <Text>{profesion_solicitud}</Text>
        <Text></Text>
          {size(totalProfesional) > 0 ? (
            <FlatList
              data={totalProfesional}
              renderItem={(prof) => (
                <Lista
                prof={prof}
                toastRef={toastRef}
                navigation={navigation}
                direccion_solicitud={direccion_solicitud}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.5}
            />
          ) : (
            <View style={styles.loaderRestaurants}>
              <ActivityIndicator size="large" color="#3E9EB3" />
              <Text style={styles.textloading}>Cargando profeionales</Text>
            </View>
          )}

      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} fadeInDuration ={1000} fadeOutDuration={1000}/>

    </ScrollView>
  );
}



function Lista(props) {
  const { prof , toastRef, navigation, direccion_solicitud  } = props;
  const { id, photoURL, photosServicio, name, email, direccion} = prof.item;

  //funcion redirect a info profesional
  const goInfoProfesinal = () => {
    navigation.navigate('infoProfesional', {
    id: id,
    nombre: name,
    photosServicio : photosServicio,
    email: email,
    direccion_solicitud: direccion_solicitud,
    });
  };

  return (
    <TouchableOpacity onPress={goInfoProfesinal}>
    <Divider style={styles.dividerRegister}/>
      <View style={styles.viewProfesional}>
        <View style={styles.viewProfesionalImage}>
        <Avatar
         rounded
         size="large"
         containeeStyle={styles.userInfoAvatar}
         source ={ photoURL ? { uri: photoURL } : require("../../assets/perfil_default.png") }
        />
        </View>
        <View>
          <Text>        </Text>
          <Text style={styles.profesionalName}>{name}</Text>
          <Text style={styles.profesionalAddress}>{email}</Text>
          <Text style={styles.profesionalAddress}>{direccion}</Text>
        </View>
      </View>
    <Divider style={styles.dividerRegisterdown}/>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({

  dividerRegister:{
    backgroundColor:"#00a680",
    height:1,
  },

  textloading: {
    color: "#3E9EB3",
    textTransform: "uppercase",
    marginTop: 10,
  },

  dividerRegisterdown:{
    backgroundColor:"#00a680",
    height:1,
  },

  userInfoAvatar: {
    marginRight: 10,
  },

  scrollView: {
    height: "100%",
  },

  formContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },

  loaderRestaurants: {
   marginTop: 10,
   marginBottom: 10,
   alignItems: "center",
 },
 viewProfesional: {
   flexDirection: "row",
   margin: 10,
 },
 viewProfesionalImage: {
   marginRight: 15,
   marginTop: 10,
 },
 profesionalName: {
   fontWeight: "bold",
 },
 profesionalAddress: {
   paddingTop: 2,
   color: "grey",
 },
 restaurantDescription: {
   paddingTop: 2,
   color: "grey",
   width: 300,
 },
 notFoundRestaurants: {
   marginTop: 10,
   marginBottom: 20,
   alignItems: "center",
 },

});
