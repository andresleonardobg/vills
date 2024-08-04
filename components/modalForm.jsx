import { useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";

export function ModalForm({ modalVisible, setModalVisible, data, setData }) {
  const [typeBill, onChangeText] = useState("");
  const [amoutMoney, onChangeNumber] = useState("");

  const addNewRecord = () => {
    setModalVisible(!modalVisible);
    setData([
      ...data,
      {
        typeRecord: true,
        value: amoutMoney,
        name: typeBill,
      },
    ]);
  };

  return (
    <Modal visible={modalVisible}>
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
          <View style={styles.botons}>
            <Pressable style={styles.boton} onPress={addNewRecord}>
              <Text style={{ color: "white" }}>Guardar registro</Text>
            </Pressable>
            <Pressable
              style={styles.boton}
              onPress={() => setModalVisible(!modalVisible)}
            >
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
  },
  modalView: {
    padding: 50,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 20,
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
