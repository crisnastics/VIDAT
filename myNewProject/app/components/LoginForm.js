import React, { useEffect, useState , useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";
const config = require('../../config.json');

export default function LoginForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [countries, setCountries] = useState([]);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };




  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      fetch(config.urlserver+'/demandante')
      .then((response) => response.json())
      .then((json) => {
        if (json.find(({ email }) => email == formData.email) == undefined){
          toastRef.current.show("Usuario no Registrado");
        }else{
          setLoading(true);
          if(json.find(({ email }) => email == formData.email).password == formData.password){
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
          }else{
            toastRef.current.show("Contraseña incorrecta");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
            color="green"
          />
        }
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Iniciando sesión" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}



const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#3E9EB3",
  },

});
