import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ModalForm } from "./modalForm";

export function Main() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ModalForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Text>app de prueba</Text>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.boton}
      >
        <Text style={{ color: "#fff" }}>Boton de prueba</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boton: {
    backgroundColor: "#000",
    borderRadius: 6,
    padding: 10,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "#0f0",
    padding: 50,
  },
});
