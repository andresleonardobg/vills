import { useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";

import { CheckBox } from "./checkbox";

export function ModalForm({ modalVisible, setModalVisible, data, setData }) {
  const [typeBill, onChangeText] = useState("");
  const [amoutMoney, onChangeNumber] = useState("");
  const [inputOutput, setinputOutput] = useState("Gasto");

  const addNewRecord = () => {
    onChangeNumber("");
    onChangeText("");
    setModalVisible(!modalVisible);
    setinputOutput("Gasto");
    setData([
      ...data,
      {
        typeRecord: inputOutput === "Gasto" ? false : true,
        value: amoutMoney,
        name: typeBill,
      },
    ]);
  };

  const closeModal = () => {
    onChangeNumber("");
    onChangeText("");
    setModalVisible(!modalVisible);
    setinputOutput("Gasto");
  };

  return (
    <Modal
      visible={modalVisible}
      style={{ width: 500, height: 500 }}
      transparent
    >
      <View style={styles.modal}>
        <View style={styles.modalView}>
          <Text>Tipo de gasto</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangeText}
            value={typeBill}
          />
          <Text>Cantidad gastada</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangeNumber}
            value={amoutMoney}
            keyboardType="number-pad"
          />
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 10,
              gap: 10,
            }}
          >
            <CheckBox
              name="Ingreso"
              selected={inputOutput}
              setSelected={setinputOutput}
            />
            <CheckBox
              name="Gasto"
              selected={inputOutput}
              setSelected={setinputOutput}
            />
          </View>
          <View style={styles.botons}>
            <Pressable style={styles.boton} onPress={addNewRecord}>
              <Text style={{ color: "white" }}>Guardar registro</Text>
            </Pressable>
            <Pressable style={styles.boton} onPress={closeModal}>
              <Text style={{ color: "white" }}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#000",
    borderRadius: 6,
    padding: 10,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000054",
  },
  modalView: {
    padding: 50,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  inputText: {
    borderWidth: 5,
    borderColor: "black",
    padding: 5,
    margin: 5,
  },
  botons: {
    flexDirection: "row",
    gap: 5,
  },
});
