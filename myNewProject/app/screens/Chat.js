// @refresh reset
import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat, Bubble, Send, InputToolbar } from 'react-native-gifted-chat'
import { StyleSheet, TextInput, View, YellowBox, Button } from 'react-native'
import Loading from "../components/Loading";
import { IconButton } from 'react-native-paper';
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

export default function Chat(props) {
    const {navigation, route} = props;
    const [name, setName] = useState('');
    const [total, setTotal] = useState(0);
    const [messages, setMessages] = useState([]);
    var { oferente_id, name_profesional} = route.params;
    const user = { obj_id_demandante,  obj_name_demandante }
    navigation.setOptions({ title: name_profesional });
    const db = firebase.firestore();

    //carga de mensajes de firebase en la vista
    //if(!messages) return <Loading isVisible={true} text = "Cargando..." />;
    useEffect(() => {
        var docRef = db.collection("Chats").doc(obj_id_demandante.toString()).collection("oferente")
        .doc(oferente_id.toString()).collection('MESSAGES');
        docRef.orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data();
            const data = {
              _id: doc.id,
              text: '',
              createdAt: new Date().getTime(),
              ...firebaseData
            };
            return data;
          });
          setMessages(messages);
        });
    }, [setMessages]);


    //enviar mensajes al firebase
    async function handleSend(messages){
      const text = messages[0].text;
      db.collection("Chats")
      .doc(obj_id_demandante.toString())
      .collection("oferente")
      .doc(oferente_id.toString())
      .collection('MESSAGES')
        .add({
          text,
          createdAt: new Date().getTime(),
          user: {
            _id: oferente_id,
            name: name_profesional,
          }
        })
      }


    //burbuja de mensajes
    function renderBubble(props) {
      return (
        // Step 3: return the component
        <Bubble {...props}
          wrapperStyle={{
            right: {backgroundColor: '#5085C4'}
          }}
          textStyle={{
            right: {color: 'white'}
          }}
          containerStyle={{ height: '15%', }}
        />
      );
    }

    //imagen flecha envio mensajes
    function renderSend(props) {
      return (
        <Send {...props}>
          <View style={styles.sendingContainer}>
            <IconButton icon='send-circle' size={32} color='#5085C4' />
          </View>
        </Send>
      );
    }

    //configuracion caja de textos input
    const customtInputToolbar = props => {
      return (
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: "white",
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      );
    };

    //componentes chat
    return (
      <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: oferente_id }}
      renderBubble={renderBubble}
      placeholder=' Escribir texto aquí ...'
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      isAnimated={true}
      renderInputToolbar={props => customtInputToolbar(props)}
       />
    )
}

const styles = StyleSheet.create({
  sendingContainer: {
      justifyContent: 'center'
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }


})
