import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Overlay } from "react-native-elements";

export default function Loading(props) {
  const { isVisible, text } = props;
  return (
    <Overlay
    isVisible = {isVisible}
    overlayBackgroundColor = "transparent"
    overlayStyle = {styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator  animating={true} size="large" color="green" />
        {text && <Text style={styles.text}> {text} </Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
    overlay: {
      height: 100,
      width: 200,
    },
    view: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-around",
    },

    text: {
      color: "black",
      textTransform: "uppercase",
      marginTop: 10,
    },
});
