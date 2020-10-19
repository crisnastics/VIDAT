import React, { useState, useEffect, useRef, useCallback} from "react";
import { StyleSheet, View, Text, Button,  FlatList , ScrollView, TouchableOpacity, RefreshControl} from "react-native";
import Toast from "react-native-easy-toast";
import { Input, Icon, Divider, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const config = require('../../config.json');

export default function Muro(props){
  const [infoSolicitud, setInfoSolicitud] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const toastRef = useRef();
  const navigation = useNavigation();
  const lista_solicitudes_visibles=[];

  //obtener las soliciudes de la bd
  useEffect(() => {
    fetch(config.urlserver+'/solicitud/'+obj_id_demandante)
    .then((response) => response.json())
    .then((json) => {
      json.forEach((doc) => {
        lista_solicitudes_visibles.push(doc);
      });
      setInfoSolicitud(lista_solicitudes_visibles);
    });
  }, []);

  //tiempo recarga muro
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });

  }

  //funcion refresh muro
  const onRefresh = useCallback(() => {
    lista_solicitudes_visibles.length = 0;
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false)).then(
      fetch(config.urlserver+'/solicitud/'+obj_id_demandante)
      .then((response) => response.json())
      .then((json) => {
        json.forEach((doc) => {
          lista_solicitudes_visibles.push(doc);
        });
        setInfoSolicitud(lista_solicitudes_visibles);
      })
    );
  }, []);

  return (
    <View style={{ flex: 1, marginTop:20, marginLeft:25, marginRight:25 }}>
     <View style={styles.title}><Text>Mis solicitudes</Text>
     </View>
     <Text></Text>
     <ScrollView >
       <FlatList
         data={infoSolicitud}
         renderItem={(solicitud) =>
           <Lista_solicitud
           solicitud={solicitud}
           toastRef={toastRef}
           infoSolicitud={infoSolicitud}
           navigation={navigation}
           />
       }
       />
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
     </ScrollView>
     <Toast ref={toastRef} position="center" opacity={0.9} fadeInDuration ={1000} fadeOutDuration={1000}/>
    </View>
  );
}

function Lista_solicitud(props){
  const { solicitud , toastRef, infoSolicitud, navigation} = props;
  const { estado, fecha, horario, oferente_id, visible} = solicitud.item;
  const [name_profesional, set_name_profesional] = useState(null);
  const [urlAvatar, setUrlAvatar] = useState(null);
  const [profesion_profesional, set_profesion_profesional] = useState(null);

  //cambiar formato fecha para el return de la Lista_solicitud
  const fecha_format = new Date(fecha);
  const fecha_day=fecha_format.getDate();
  const fecha_month=fecha_format.getMonth()+1;
  const fecha_year=fecha_format.getFullYear();

  //Obtener informacion del oferente
  useEffect(() => {
    fetch(config.urlserver+'/oferente/'+oferente_id)
    .then((response) => response.json())
    .then((json) => {
      set_name_profesional(json.name);
      set_profesion_profesional(json.profesion);
      setUrlAvatar(json.photoURL);
    });
  }, [urlAvatar]);

  //iconos y color estados para el return
  if(estado == 1){
    var estado_solicitud = "Enviada";
    var color_state= '#f194ff';
  }else if(estado == 2){
    var estado_solicitud = "Aceptada";
    var color_state= 'green';
  }else if(estado == 3){
    var estado_solicitud = "Rechazada";
    var color_state= 'red';
  }else if(estado == 4){
    var estado_solicitud = "Terminada";
    var color_state= 'yellow';
  }
  const Separator = () => (
    <View style={styles.separator} />
  );

  //redireccion vista chat
  const goChat = () => {
    if(estado_solicitud == "Aceptada"){
      navigation.navigate('chat', {
      name_profesional: name_profesional,
      oferente_id:oferente_id,
      });
    }
  };

  return(
    <TouchableOpacity onPress={goChat} >
    <Separator />
      <View style={styles.viewSolicitud}>
        <View style={styles.viewProfesional}>
          <View style={styles.viewProfesionalImage}>
            <Avatar
             rounded
             size="medium"
             containeeStyle={styles.userInfoAvatar}
             source ={ urlAvatar ? { uri: urlAvatar } : require("../../assets/perfil_default.png") }
            />
          </View>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Icon type="material-community" name="account-arrow-right"  />
              <Text style={{ fontSize: 16, color: "black"}}> {profesion_profesional} : {name_profesional} </Text>

             </View>
             <View style={{ flexDirection: "row", marginTop:5 }}>
               <Icon type="material-community" name="calendar-range" />
               <Text style={{ fontSize: 16, color: "grey"}}> Fecha: {fecha_day}-{fecha_month}-{fecha_year} </Text>

            </View>
            <View style={{ flexDirection: "row", marginTop:5 }}>
              <Icon type="material-community" name="clock-outline" />
              <Text style={{ fontSize: 16, color: "grey"}}> Horario: {horario}</Text>

            </View>
            <View style={{ flexDirection: "row", marginTop:5 }}>
              <Icon type="material-community" name="swap-horizontal" color = {color_state}/>
              <Text style={{ fontSize: 16, color: "grey"}}> Estado: <Text style={{ color: color_state, fontSize:18}}>{estado_solicitud}</Text></Text>
            </View>
          </View>
        </View>
      </View>
    <Separator />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title:{
    alignItems: "center"
  },

  formContainer:{
    alignItems: "center",
    marginTop:20,
  },
  viewSolicitud: {
    margin: 25,
  },
  profesionalName: {
    fontWeight: "bold",
  },
  otherInfo: {
    paddingTop: 2,
    color: "grey",
    marginTop:10,
  },
  separator: {
    marginVertical: 0,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  viewProfesionalImage: {
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  viewProfesional: {
    flexDirection: "row",
  },
});
