import React, { useState, useCallBack } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
const config = require('../../config.json');

export default function ChangeDisplayNameForm(props) {
  const { id, name, setShowModal, toastRef, setRealoadUserInfo } = props;
  const [newName, setNewDisplayName] = useState(defaultValue());
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (e, type) => {
    //se llama la funcion setFormData que actualiza el estado
    //recibe un objeto con los valores actuales del estado, y se actualiza el typo con el nuevo valor. las variables van en [] : valor
    setNewDisplayName({ ...newName, [type]: e.nativeEvent.text });

  };

  const onSubmit = () => {
    setError(null);
    setIsLoading(true);
    fetch(config.urlserver+'/demandante/'+id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": newName.name,
        })
      }).then(() => {
        setRealoadUserInfo(true);
        setShowModal(false);
        setIsLoading(false);
        toastRef.current.show("Nombre actualizado");

      })
      .catch(() => {
        setError("Error al actualizar el nombre.");
      });
    };


  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        defaultValue={name || ""}
        onChange={(e) => onChange(e, "name")}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        color="#000000"
        loading={isLoading}
      />
    </View>
  );
}

function defaultValue() {
  return {
    name: "",
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
