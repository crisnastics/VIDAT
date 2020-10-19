import React, {useState} from "react";
import { StyleSheet, View} from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "./Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function OpcionCuenta(props){
  const { userInfo , toastRef, setRealoadUserInfo } = props;
  const [showModal, setShowModal] = useState(false); //estados de mi ventana moda, inicia falso
  const [renderComponent, setRenderComponent] = useState(null); //renderiza los componenetes de email, nombre, passs de la list



  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
          setRenderComponent(
            <ChangeDisplayNameForm
              id={userInfo.id} // guardamos en la variable display la propiedad displayname del objeto user
              name={userInfo.name}
              setShowModal={setShowModal} //para cerrar el modal desde adentro
              toastRef={toastRef}
              setRealoadUserInfo = {setRealoadUserInfo}
            />)
          setShowModal(true);
        break;
      case "email":
          setRenderComponent(
            <ChangeEmailForm
            id={userInfo.id} // guardamos en la variable display la propiedad displayname del objeto user
            password={userInfo.password}
            email={userInfo.email}
            setShowModal={setShowModal} //para cerrar el modal desde adentro
            toastRef={toastRef}
            setRealoadUserInfo = {setRealoadUserInfo}
          />)
          setShowModal(true);
        break;
      case "password":
          setRenderComponent(
            <ChangePasswordForm
            id={userInfo.id} // guardamos en la variable display la propiedad displayname del objeto user
            password={userInfo.password}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setRealoadUserInfo={setRealoadUserInfo}
            //setRealoadUserInfo no es necesario porque cuando cambie de contraseña lo sacaremos de la sesion
            />)
          setShowModal(true);
        break;
      default:
        setRenderComponent(null);
        setShowModal(false);
        break;
    }

  };
  const MenuOptions = generateOptions(selectedComponent);

  return(

    <View>
      {map(MenuOptions,(menu, index) =>(
        <ListItem
        key={index}
        title={menu.title}
        leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
        }}
        rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
            size: menu.iconSizeRight,
        }}
        containerStyle={styles.menuItem}
        onPress={menu.onPress}
        />
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
    //cuando hago click afuera, el setshowmodal me lo cierra, porque en el componente Modal.js empieza con setvisible(false)
    //el Modal me devuelve cada cada component porque menuoption depende de ellos como parametro
    //renderComponent me renderiza en la ventana modal cada setRenderComponent
  );
}

function generateOptions(selectedComponent){
  const [activNotif, setActivNotif] = useState(false);
  return [
    {
      title: "Cambiar Nombre y Apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName")
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email")
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password")
    },

    {
      title: "Notificaciones",
      iconType: "material-community",
      iconNameLeft: "bell",
      iconColorLeft: "#ccc",
      iconNameRight: activNotif ? "toggle-switch-off-outline" : "toggle-switch",
      iconColorRight: "blue",
      iconSizeRight: 30,
      onPress: () => setActivNotif(!activNotif)
    },

    {
      title: "Política de uso",
      iconType: "material-community",
      iconNameLeft: "information-outline",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      //onPress: () => setActivNotif(!activNotif)
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
   borderBottomWidth: 1,
   borderBottomColor: "#e3e3e3",
 },

});
