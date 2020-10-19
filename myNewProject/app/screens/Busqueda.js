import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, Picker, TouchableOpacity } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Modal from "../components/Modal";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView from "react-native-maps";
const config = require('../../config.json');

export default function Busqueda(props){
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [isVisiblePicker, setIsVisiblePicker] = useState(false);
  const [locationDemandante, setLocationDemandante] = useState(null);
  const [formData, setFormData] = useState(defaultValue());
  const toastRef = useRef();
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("");

  const listProfesional = () => {
    if (isEmpty(selectedValue)) {
      toastRef.current.show("¿Qué necesitas?");
    }else{
      navigation.navigate('profesional', {
        profesion_solicitud: selectedValue,
        direccion_solicitud: locationDemandante,
      });
    }
  };


  // const onChange = (e,type) =>{
  //   setFormData({...formData,[type]: e.nativeEvent.text});
  //   console.log(formData);
  // };

  const goModalPicker = () => {
    setIsVisiblePicker(true);
  };

  const goModalMap = () => {
    setIsVisibleMap(true);
  };
  return(
    <ScrollView style={styles.scrollView}>
      <View style={styles.formContainer}>
        <Text> ¿Qué necesitas? </Text>
        <TouchableOpacity onPress={goModalPicker}>
          <View style={styles.formSolicitar}>
            <Input
                placeholder="Solicitar"
                value={selectedValue}
                disabled
                rightIcon={{
                    type:"material-community",
                    name:"magnify",
                    color:"#c2c2c2",
                }}
              />
          </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goModalMap}>
        <View style={styles.formSolicitar}>
          <Input
            placeholder="Dirección"
            disabled="true"
            defaultValue={locationDemandante || ""}
            rightIcon={{
              type: "material-community",
              name: "map-marker",
              color: locationDemandante ? "#00a680" : "#c2c2c2",
            }}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.formSolicitar}>
        <Button
          title="Buscar"
          containerStyle={styles.btnContainerLogin}
          buttonStyle={styles.btnLogin}
          onPress={listProfesional}
        />
      </View>
      </View>
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationDemandante={setLocationDemandante}
        locationDemandante={locationDemandante}
        toastRef={toastRef}
      />

      <Picker_solicitar
        isVisiblePicker={isVisiblePicker}
        setIsVisiblePicker={setIsVisiblePicker}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        toastRef={toastRef}
      />

      <Toast ref={toastRef} position="center" opacity={0.9} fadeInDuration ={1000} fadeOutDuration={1000}/>

    </ScrollView>
  );
}

function Picker_solicitar(props){
  const {isVisiblePicker, setIsVisiblePicker, selectedValue, setSelectedValue, toastRef} = props;


  return (
    <Modal isVisible={isVisiblePicker} setIsVisible={setIsVisiblePicker}>
      <View style={styles.pickerStyle} >
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Kinesióloga(o)" value="Kinesióloga(o)" />
        <Picker.Item label="Enfermera(o)" value="Enfermera(o)" />
        <Picker.Item label="Fonoaudióloga(o)" value="Fonoaudióloga(o)" />
        <Picker.Item label="Matron(a)" value="Matron(a)" />
        <Picker.Item label="Médica(o) general" value="Médica(o) general" />
        <Picker.Item label="Nutricionista" value="Nutricionista" />
        <Picker.Item label="Psicóloga(o)" value="Psicóloga(o)" />
        <Picker.Item label="Tecnólogo médico" value="Tecnólogo médico" />
        <Picker.Item label="Tens" value="Tens" />
        <Picker.Item label="Terapeuta ocupacional" value="Terapeuta ocupacional" />
      </Picker>
      </View>
    </Modal>
  );
}
//funcion ventana modal del mapa
function Map(props){
  const {isVisibleMap, setIsVisibleMap, setLocationDemandante, locationDemandante, toastRef} = props;
  const [location, setLocation] = useState(null);

 //espera a que me devuelvas la localiacion para continuar
  useEffect(() =>{
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      //permisos que debe aceptar el usuario
      const statusPermissions = resultPermissions.permissions.location.status;
      if (statusPermissions !== "granted") {
       toastRef.current.show(
         "Debe que aceptar los permisos de localizacion",
         3000
       );
     }else{ //guardar la localizacion en variables
       const loc = await Location.getCurrentPositionAsync({});
       setLocation({
         latitude: loc.coords.latitude,
         longitude: loc.coords.longitude,
         latitudeDelta: 0.001,
         longitudeDelta: 0.001,
       })
     }
    })();
  },[])


  //api google address
  const confirmLocation = () =>{
    toastRef.current.show("Localizacion guardada correctamente");
    setIsVisibleMap(false); //cerramos el mapa
    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+location.latitude+","+location.longitude+"&key=AIzaSyAld3q-jtBr6jHnYOm1We5T6_f5eVQo5ZU")
    .then((response) => response.json())
    .then((json) => {
      setLocationDemandante(json.results[1].formatted_address);
    })
  }


  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)} //permite mover el punto en el mapa
          >
            <MapView.Marker
              coordinate={{
                //obtiene coordenadas a medida que se mueve
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable //movimiento en el mapa
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Seleccionar"
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title="Cancelar"
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  )
}

function defaultValue(){
  return{
    profesion:"",
  };
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },

  formContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  formSolicitar: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: "80%",
    height:"20%",
  },
  btnContainerLogin: {
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#3E9EB3",
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },

  pickerStyle: {
    width: "100%",
    height: "30%",
  },

  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 10,
    width: "35%",
  },
  viewMapBtnCancel: {
    backgroundColor: "#c2c2c2",
  },
  viewMapBtnContainerSave: {
    paddingRight: 10,
    width: "35%",
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680",
  },

});
