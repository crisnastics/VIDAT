import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../utils/validation";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import {useNavigation} from "@react-navigation/native";
import Loading from "./Loading";
const config = require('../../config.json');

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValue());
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);


  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.name) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("Las contraseñas tienen que ser iguales");
    } else if (size(formData.password) < 6) {
      toastRef.current.show(
        "La contraseña tiene que tener al menos 6 caracteres"
      );
      } else {
        fetch(config.urlserver+'/demandante')
        .then((response) => response.json())
        .then((json) => {
          if (json.find(({ email }) => email == formData.email) != undefined){
            toastRef.current.show("El email pertenece a otra cuenta");
          }else{
          //  setLoading(true);
            fetch(config.urlserver+'/demandante', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "name": formData.name,
              "email": formData.email,
              "password": formData.password,
              "photoURL": "",
              })
            })
            fetch(config.urlserver+'/demandante').then((response) => response.json())
            .then((json) => {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'navigation',
                    params: {
                      id: json.find(({ email }) => email == formData.email).id,
                      name: json.find(({ email }) => email == formData.email).name,
                    },
                  },
                ],
              })
            })
          }
      })
    };
  }
  const onChange = (e,type) =>{
    setFormData({...formData,[type]: e.nativeEvent.text});
  };
  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Nombre y Apellido"
        containerStyle={styles.inputForm}
        onChange={(e)=>onChange(e,"name")}
        rightIcon={
          <Icon
            type="material-community"
            name="account-outline"
            iconStyle={styles.iconRight}
          />
        }
      />

      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e)=>onChange(e,"email")}
        rightIcon={
          <Icon
            type="material-community"
            name="email"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
       placeholder="Contraseña"
       containerStyle={styles.inputForm}
       password={true}
       secureTextEntry={showPassword ? false : true}
       onChange={(e)=>onChange(e,"password")}
       rightIcon={
         <Icon
           type="material-community"
           name={showPassword ? "eye-off-outline" : "eye-outline"}
           iconStyle={styles.iconRight}
           onPress={() => setShowPassword(!showPassword)}
         />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
        onChange={(e)=>onChange(e,"repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  );
}

function defaultValue(){
  return{
    name:"",
    email:"",
    password: "",
    repeatPassword: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
