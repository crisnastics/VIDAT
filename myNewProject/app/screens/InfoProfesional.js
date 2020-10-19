import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, ScrollView, Dimensions} from "react-native";
import { Button, Divider, Rating, ListItem, Icon } from "react-native-elements";
import Loading from "../components/Loading";
import Carousel from "../components/Carousel";
import { Avatar } from "react-native-elements";


const config = require('../../config.json');

const screenWidth = Dimensions.get("window").width;

export default function InfoProfesional(props){
  const { route, navigation } = props;
  const [infoProf, setInfoProf] = useState(null);
  var { id, nombre, photosServicio, email, direccion_solicitud} = route.params;

  //Buscar info foerente en api
  useEffect(() => {
    fetch(config.urlserver+'/oferente/'+id)
    .then((response) => response.json())
    .then((json) => {
      setInfoProf(json);
    });
  }, [setInfoProf]);

  //setear nombre en el titulo
  navigation.setOptions({ title: nombre });

  //ventana modal
  if(!infoProf) return <Loading isVisible={true} text = "Cargando..." />;

  //funcion redirect calentario
  const verHorario = () => {
    navigation.navigate('horarios', {
      id: id,
      direccion_solicitud: direccion_solicitud,
    });
  };
  return(
    <ScrollView>
      <Image
       source={infoProf.photosServicio ? { uri: infoProf.photosServicio } : require("../../assets/perfil_default.png")}
       style={{ width: screenWidth, height: 200 }}

    />
    <View style={styles.viewUserInfo}>
      <Avatar
       rounded
       size="large"
       source ={ infoProf.photoURL ? { uri: infoProf.photoURL } : require("../../assets/perfil_default.png") }
      />
        <View>
          <Text style={styles.displayName}>
            <Text>      </Text>
            {nombre}
          </Text>
          <Text style={styles.displayName}>
            <Text>      </Text>
            {email}
          </Text>
        </View>
    <Rating
          style={styles.rating}
          imageSize={25}
          ratingColor='#3498db'
          readonly
          startingValue={parseFloat(infoProf.puntuacion)}
        />
    </View>

      <Text style={styles.description}>Descripción: {infoProf.descripcion}</Text>
      <Text style={styles.description}>Estudios: {infoProf.estudios}</Text>
      <Text style={styles.description}>Honorarios CLP: {infoProf.honorarios}</Text>
      <Text style={styles.description}>Previsión: {infoProf.prevision}</Text>
      <Text style={styles.description}>Disponibildiad de horarios: </Text>
      <Text></Text>

      <View style={styles.viewMapBtn}>
      <Button
        title="Ver Horario"
        containerStyle={styles.viewMapBtnContainerSave}
        buttonStyle={styles.viewMapBtnSave}
        onPress={verHorario}
      />
      </View>
    </ScrollView>

  )
}


const styles = StyleSheet.create({


  displayName: {
    fontWeight: "bold",
    color: "grey"
  },

  viewUserInfo: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: "white"
  },

  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  viewMapBtnContainerSave: {
    width: "60%",
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680",
  },
  description: {
    marginTop: 20,
    fontWeight: 'bold',
    marginLeft: 30,
    marginRight: 20,
    color: "black",
  },
  rating: {
    position: "absolute",
    right: 0,
    marginRight: 10,
  },

});
