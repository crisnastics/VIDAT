import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Avatar } from "react-native-elements";
import { Caption, Paragraph, Drawer, Text} from 'react-native-paper';
import { DrawerItem } from '@react-navigation/drawer';
const config = require('../../config.json');


export default function DrawerContent(props) {
    const [infoDem, setInfoDem] = useState("");

    //especificamente este hook es para cuando se actualiza el avatar
    useEffect(() => {
      fetch(config.urlserver+'/demandante/'+obj_id_demandante)
      .then((response) => response.json())
      .then((json) => {
        setInfoDem(json);
      });
    }, [obj_photo_demandante]);


    //cerrar sesion del drawer
    const logout = () => {
        props.navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    };



    //return con avatar y section del drawer
    return(
        <View style={{flex:1}}>

                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15, marginLeft: 50}}>
                        <Avatar
                         rounded
                         size="xlarge"
                         source ={ infoDem.photoURL ? { uri: infoDem.photoURL } : require("../../assets/perfil_default.png") }
                        />
                        </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                type="material-community" name="home-outline" size ={22} color={color}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                              <Icon
                              type="material-community" name="account" size ={22} color={color}
                              />
                            )}
                            label="Perfil"
                            onPress={() => {props.navigation.navigate('Perfil')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                              <Icon
                              type="material-community" name="calendar-month-outline" size ={22} color={color}
                              />
                            )}
                            label="Historial"
                            onPress={() => {props.navigation.navigate('Historial')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                              <Icon
                              type="material-community" name="chart-bar" size ={22} color={color}
                              />
                            )}
                            label="Estadísticas"
                            onPress={() => {props.navigation.navigate('Estadisticas')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                              <Icon
                              type="material-community" name="cash" size ={22} color={color}
                              />
                            )}
                            label="Pago"
                            onPress={() => {props.navigation.navigate('Pago')}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                              <Icon
                              type="material-community" name="settings-outline" size ={22} color={color}
                              />
                            )}
                            label="Configuración"
                            onPress={() => {props.navigation.navigate('Configuración')}}
                        />
                    </Drawer.Section>

                </View>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                        name="exit-to-app"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Cerrar Sesión"
                    onPress={() => {logout()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      marginTop:50,
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginLeft:10,
      marginTop: 25,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },

    logo:{
      marginTop:45,
      width:100,
      height:100,
    },
  });
