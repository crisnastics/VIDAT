import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { validateEmail } from "../utils/validation";
const config = require('../../config.json');

export default function ChangeEmailForm(props) {
  const { id, email, password, setShowModal, toastRef, setRealoadUserInfo } = props;
  const [formData, setFormData] = useState(defaultValue()); // La forma de los datos. En este caso email y paswword
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    //se llama la funcion setFormData que actualiza el estado
    //recibe un objeto con los valores actuales del estado, y se actualiza el typo con el nuevo valor. las variables van en [] : valor
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    setErrors({}); //limpiar estado error
    if (!formData.email || email === formData.email) {
      setErrors({
        email: "El email no ha cambiado.",
      });
    } else if (!validateEmail(formData.email)) {
      setErrors({
        email: "Email incorrecto.",
      });

    } else if (!formData.password) {
      setErrors({
        password: "Ingrese contraseña.",
      });
    } else {
      setIsLoading(true);
      if( password === formData.password){
        fetch(config.urlserver+'/demandante/'+id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "email": formData.email,

            })
          }).then(() => {
            setRealoadUserInfo(true);
            setShowModal(false);
            setIsLoading(false);
            toastRef.current.show("Correo actulaizada correctamente");
          })
        }else{
          setErrors({
            password: "La contraseña es incorrecta",
          });
          setIsLoading(false);
        }
      }
    };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        defaultValue={email || ""}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errors.email} // propiedad para guardar valor del email si da error
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "green",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />
      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

function defaultValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#3E9EB3",
  },
});
