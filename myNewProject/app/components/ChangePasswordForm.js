import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { size } from "lodash";
const config = require('../../config.json');

export default function ChangePasswordForm(props) {
  const { id, password, setShowModal, toastRef, setRealoadUserInfo } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defualtValue());
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = async () => {
    let isSetErrors = true;
    let errorsTemp = {};
    setErrors({});

    if (!formData.password || !formData.newPassword || !formData.repeatNewPassword
    ) {
      errorsTemp = {
        password: !formData.password ? "La contraseña no puede estar vacia." : "",
        newPassword: !formData.newPassword ? "La contraseña no puede estar vacia." : "",
        repeatNewPassword: !formData.repeatNewPassword ? "La contraseña no puede estar vacia." : "",
      };
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      errorsTemp = {
        newPassword: "Las contraseñas no coinciden",
        repeatNewPassword: "Las contraseñas no coinciden",
      };
    } else if (size(formData.newPassword) < 6) {
      errorsTemp = {
        newPassword: "La contraseña tiene que tener al menos 6 caracteres.",
        repeatNewPassword: "La contraseña tiene que tener al menos 6 caracteres.",
      };
    } else {
      setIsLoading(true);
      if( password === formData.password){
        fetch(config.urlserver+'/demandante/'+id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "password": formData.newPassword,
            })
          }).then(() => {
            setRealoadUserInfo(true);
            setShowModal(false);
            setIsLoading(false);
            toastRef.current.show("Contraseña actulaizada correctamente");
          })
        }else{
          errorsTemp = {
            password: "La contraseña es incorrecta.",
          };
          setIsLoading(false);
        }
      }

    isSetErrors && setErrors(errorsTemp);
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true} // si showPassword es true, secureTextEntry es false (usuario ve contraseña) sino es true
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "green",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}  // cuando sufra cambio, obtienes el evento, traes la funcion, y pasas el evento y el type
        errorMessage={errors.password}
      />
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true} // si showPassword es true, secureTextEntry es false (usuario ve contraseña) sino es true
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "green",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "newPassword")}  // cuando sufra cambio, obtienes el evento, traes la funcion, y pasas el evento y el type
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Repetir nueva contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "green",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "repeatNewPassword")}
        errorMessage={errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
      <Text>{errors.other}</Text>
    </View>
  );
}

function defualtValue() {
  return {
    password: "",
    newPassword: "",
    repeatNewPassword: "",
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
