import React, {useState, useEffect} from "react";
import { StyleSheet,View,Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker"; //provee acceso a la galeria
const config = require('../../config.json');

export default function InfoUser(props){
  const { userInfo:{ id, photoURL, name, email }, toastRef, setLoading, setLoadingText, setRealoadUserInfo} = props;//queremos sacar el objeto photo del objec
  //funcion pedir permiso y obtener imagen
  const changeAvatar = async () =>{
    const resultPermission = await Permissions.askAsync( //paquete expo para permisos de camara roll
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if(resultPermissionCamera  === "denied"){
      toastRef.current.show("Debe aceptar los permisos para acceder a  la galería.")
    }else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing:true,
        aspect: [4,3]
      });
       if(result.cancelled){
         toastRef.current.show("Galería cancelada");
       }else{
         uploadImage(result.uri).then(()=>{
         }).cath(()=>{
           toastRef.current.show("Error al cargar la imagen de perfil");
         })
       }
    }
  };

  //funcion cargar imagen a mongo
  //uri = direccion fisica, de donde se encuentra la imgen en el telefono
   const uploadImage = async (uri) =>{
     setLoadingText("Actualizando avatar");
     setLoading(true);
     const response = await fetch(uri);


     //const blob = await response.blob();
     //console.log(JSON.stringify(blob));

     fetch(config.urlserver+'/demandante/'+id, {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         "photoURL": response.url,
         })
       }).then(() => {
         setRealoadUserInfo(true);
         setLoading(false);
         toastRef.current.show("Avatar actualizado");
         global.obj_photo_demandante=photoURL;
       })
   }

  return(
  <View style={styles.viewUserInfo}>
    <Avatar
     rounded
     size="xlarge"
     showEditButton // mostrar ell edit button
     onEditPress={changeAvatar} // editar avatar
     containeeStyle={styles.userInfoAvatar}
     source =//si photoURL tiene contenido se añade , de lo contrario añade en require de avatarDefault
     {
       photoURL ? { uri: photoURL } : require("../../assets/perfil_default.png")
     }
    />
    <View>
      <Text style={styles.displayName}>
        <Text>        </Text>
        {name ? name: "Anónimo"}
      </Text>
      <Text> <Text>      </Text>
        {email  ? email: "Social Login"}
      </Text>
    </View>

  </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 20,
    paddingBottom: 20,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
