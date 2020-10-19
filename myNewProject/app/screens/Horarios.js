import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, FlatList , ScrollView} from "react-native";
import { Button, Icon } from "react-native-elements";
import Modal from "../components/Modal";
import { size } from "lodash";
import Toast from "react-native-easy-toast";
import Loading from "../components/Loading";
import {Calendar, CalendarList, LocaleConfig} from 'react-native-calendars';

const config = require('../../config.json');

LocaleConfig.locales['fr'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago','Sep.','Oct.','Nov.','Dic.'],
  dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Mie.','Jue.','Vie.','Sab.']
};


// var today = new Date();
// var month= today.getMonth();

export default function Horarios(props){
  const { route, navigation } = props;
  const [selected, setSelected] = useState();
  const [infoHora, setInfoHora] = useState(null);
  const [infoFecha, setInfoFecha] = useState(null);
  const [infoHorario, setInfoHorario] = useState(null);
  const [isVisibleSolicitud, setIsVisibleSolicitud] = useState(false);
  const [valorHorario, setValorHorario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();
  var { id, direccion_solicitud} = route.params;
  const id_oferente = id;
  const listaFechas = [];
  const listaHoras = [];
  const listaHorarios = [];

  navigation.setOptions({ title: "Horario"});
  //if(!infoFecha) return <Loading isVisible={true} text = "Cargando..." />

  // busca las reservas con el id y la fecha cada ve< que se apreta el calendario,

  useEffect(() => {
    fetch(config.urlserver+'/fechas/'+id+'/'+selected)
    .then((response) => response.json())
    .then((json) => {
      json.forEach((doc) => {
        listaFechas.push(doc.id);
      });
      setInfoFecha(listaFechas);
    });
  }, [selected]);

  //cada vez que se busca una fecha, busca la id de todo los bloques en la fecha selccionada
  useEffect(() => {
    if(infoFecha !== null){
      //cuando no hay reserva en el dia
      if(infoFecha.length === 0){
        setInfoHora(listaHoras);
      }else{
        for (var i = 0; i<infoFecha.length;i++){
          fetch(config.urlserver+'/horas_has_fecha/'+infoFecha[i])
          .then((response) => response.json())
          .then((json) => {
            json.forEach((doc) => {
              listaHoras.push(doc.horas_idhoras);
            });
            setInfoHora(listaHoras);
          });
        }
    }
  }
  }, [infoFecha]);

//setea en el estado los horarios disponibles en la tabla horas
  useEffect(() => {
    if(infoHora !== null){
      if(infoHora.length === 0){
        listaHorarios.push("No hay horarios disponibles");
        setInfoHorario(listaHorarios);
      }else{
      for (var i = 0; i<infoHora.length;i++){
        fetch(config.urlserver+'/horas/'+infoHora[i])
        .then((response) => response.json())
        .then((json) => {
          json.forEach((doc) => {
            listaHorarios.push(doc.horas);
          });
          setInfoHorario(listaHorarios);
        });
      }
    }
  }
  }, [infoHora]);


  const temp = (item) => {
    if(item !== "No hay horarios disponibles"){
      setIsVisibleSolicitud(true);
      setValorHorario(item);
    }
  };
  // Cada vez que se apreta un dia y cambia el estado select, quiero que se vuelve a cagar el calendario y se muestra
  // en pantalla el listado de los bloques disponibles
  if(selected != undefined) {
    return (
      <View>
        <Calendar
          pagingEnabled={true}
          markedDates={{[selected]: {selected: true, disableTouchEvent: false, selectedDotColor: 'green'}}}
          onDayPress={
            day => setSelected(day.dateString)
          }
          //onDayPress={(day) => {console.log('selected day', day)}}
          onDayLongPress={(day) => {console.log('selected day', day)}}
          minDate={new Date()}
          theme={{
             calendarBackground: '#ffffff',
             textSectionTitleColor: '#b6c1cd',
             selectedDayBackgroundColor: '#00adf5',
             selectedDayTextColor: '#ffffff',
             todayTextColor: '#00adf5',
             dayTextColor: '#2d4150',
             textDisabledColor: '#d9e1e8',
             dotColor: '#00adf5',
             selectedDotColor: '#ffffff',
             monthTextColor: '#00adf5',
             arrowColor: '#00adf5',
           }}
        />
        <View style={styles.formContainer}>
          <Text></Text>
          <Text></Text>
          <Text> Para el dia {selected} se registran los siguientes horarios:</Text>
          <Text></Text>
          <FlatList
            data={infoHorario}
            renderItem={({item}) =>
            <View style={styles.view}>
              <Button
              title={item}
              onPress={(e) => temp(item)}
              />
            </View>
          }
          />
        </View>
        <ModalEnviarSolicitud
          isVisibleSolicitud={isVisibleSolicitud}
          setIsVisibleSolicitud={setIsVisibleSolicitud}
          valorHorario={valorHorario}
          selected={selected}
          id_oferente={id_oferente}
          toastRef={toastRef}
          navigation={navigation}
          setIsLoading={setIsLoading}
          direccion_solicitud={direccion_solicitud}
        />
        <Toast ref={toastRef} position="center" opacity={0.9}  fadeInDuration ={1000} fadeOutDuration={1000} />
        <Loading text="Enviando solicitud" isVisible={isLoading} />
      </View>

      )
  };

  return (
    <View>
      <Calendar

      pagingEnabled={true}
      markedDates={{[selected]: {selected: true, disableTouchEvent: false, selectedDotColor: 'green'}}}
      onDayPress={
        day => setSelected(day.dateString)
      }
      //onDayPress={(day) => {console.log('selected day', day)}}
      onDayLongPress={(day) => {console.log('selected day', day)}}
      minDate={new Date()}

      theme={{
         calendarBackground: '#ffffff',
         textSectionTitleColor: '#b6c1cd',
         selectedDayBackgroundColor: '#00adf5',
         selectedDayTextColor: '#ffffff',
         todayTextColor: '#00adf5',
         dayTextColor: '#2d4150',
         textDisabledColor: '#d9e1e8',
         dotColor: '#00adf5',
         selectedDotColor: '#ffffff',
         monthTextColor: '#00adf5',
         arrowColor: '#00adf5',
       }}
    />
      <View style={styles.formContainer}>
        <Text></Text>
        <Text></Text>
        <Text >Seleccione un horario: </Text>
      </View>
    </View>
  );
}

//ventana modal de confirmarmacion par enviar todos los parametros a la tabla Solicitud
function ModalEnviarSolicitud(props){
  const { isVisibleSolicitud, setIsVisibleSolicitud, valorHorario,
    selected, id_oferente, toastRef, navigation, setIsLoading, direccion_solicitud } = props;


  //post guarda variables solicitud en la api
  const addSolicitud = () => {
    setIsVisibleSolicitud(false)
    setIsLoading(true);
    fetch(config.urlserver+'/solicitud', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "idSolcitud":1,
      "fecha": selected,
      "estado": 1,
      "demandante_id": obj_id_demandante,
      "oferente_id": id_oferente,
      "visible": 1,
      "direccion": direccion_solicitud,
      "horario": valorHorario
      })
    })
    setIsLoading(false);

    //redireccion y reset stack
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'busqueda',
        },
      ],
    })
    toastRef.current.show("Solicitud enviada. Espera por tu respuesta");
  };



  return(
    <Modal isVisible={isVisibleSolicitud} setIsVisible={setIsVisibleSolicitud}>
      <View style={styles.AceptarSolicitudStyle}>
        <Text style={{ fontSize: 20 }}> Reservas para el {selected} </Text><Text style={{ fontSize: 20 }}> en el horario {valorHorario}</Text>
        <Text style={{ fontSize: 20 }}> ¿Está correcto? </Text>
      </View>
      <View style={styles.viewMapBtn}>
        <Button
          title="Seleccionar"
          containerStyle={styles.viewMapBtnContainerSave}
          buttonStyle={styles.viewMapBtnSave}
          onPress={addSolicitud}
        />
        <Button
          title="Cancelar"
          containerStyle={styles.viewMapBtnContainerCancel}
          buttonStyle={styles.viewMapBtnCancel}
          onPress={() => setIsVisibleSolicitud(false)}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },

  viewMapBtnContainerCancel: {
    width: "45%",
  },
  viewMapBtnCancel: {
    backgroundColor: "#c2c2c2",
  },
  viewMapBtnContainerSave: {
    width: "40%",
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680",
  },

  AceptarSolicitudStyle: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },

  view: {
    marginTop: 10,
  },

  viewMapBtnContainerCancel: {
    width: "40%",
  },
  viewMapBtnCancel: {
    backgroundColor: "#c2c2c2",
  },

  formContainer:{
    alignItems: "center",

  },
})
