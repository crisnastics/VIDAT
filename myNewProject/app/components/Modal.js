
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Overlay } from "react-native-elements";

export default function Modal(props) {
  const { isVisible, setIsVisible, children } = props;

  const closeModal = () => setIsVisible(false);

  return (
    <ScrollView>
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(0,0,0,0.5)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlay}
        onBackdropPress={closeModal}
      >
        {children}
      </Overlay>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff",
  },
});
