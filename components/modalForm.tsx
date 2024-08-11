import { useState, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { CheckBox } from "./checkbox";
import { storeTransaction, generateId } from "../database/db_controller";
import { CurrentDate } from "../tools/villsFunctions";
import { Transaction, propsTransaction } from "../types/types";

export function ModalForm(props: propsTransaction) {
  const [typeBill, onChangeText] = useState("");
  const [amoutMoney, onChangeNumber] = useState("");
  const [inputOutput, setinputOutput] = useState("Gasto");
  const [newId, setNewId] = useState(false);

  const [id, setId] = useState<number>(0);

  useEffect(() => {
    setNewId(false);
    const fetchId = async () => {
      const generatedId = await generateId();
      setId(generatedId);
    };

    fetchId();
  }, [newId]);

  const currentDate = new CurrentDate();

  const addNewTransaction = () => {
    setNewId(true);
    const newTransaction: Transaction = {
      id: id,
      type: inputOutput === "Ingreso" ? true : false,
      amount: parseInt(amoutMoney),
      category: typeBill,
      year: currentDate.year(),
      month: currentDate.month(),
      day: currentDate.day(),
      hour: [currentDate.hour(), currentDate.minutes(), currentDate.seconds()],
      description: "Ejempo",
    };
    storeTransaction(newTransaction);
    props.setData([...props.transactions, newTransaction]);
  };

  const addNewRecord = () => {
    onChangeNumber("");
    onChangeText("");
    props.setModalVisible(!props.modalVisible);
    setinputOutput("Gasto");
    addNewTransaction();
  };

  const closeModal = () => {
    onChangeNumber("");
    onChangeText("");
    props.setModalVisible(!props.modalVisible);
    setinputOutput("Gasto");
  };

  return (
    <Modal
      visible={props.modalVisible}
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
