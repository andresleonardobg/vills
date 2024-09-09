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
import {
  storeTransaction,
  generateId,
  storeTransactions,
} from "../database/db_controller";
import { CurrentDate } from "../tools/villsFunctions";
import { Transaction, NewDataTransaction } from "../types/types";

type TrasactionToUpdate = {
  id: number;
  transaction: Transaction;
};

export type propsTransaction = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  transactions: Transaction[];
  setData: React.Dispatch<React.SetStateAction<Transaction[]>>;
  infoTransactionToUpdate: null | TrasactionToUpdate;
};

export function ModalForm(props: propsTransaction) {
  const [category, setCategory] = useState("");
  const [amoutMoney, setAmoutMoney] = useState("");
  const [type, setType] = useState("Gasto");
  const [getId, setGetId] = useState(true);
  const [id, setId] = useState(0);

  // get id
  useEffect(() => {
    if (getId) {
      setGetId(false);
      const fetchId = async () => {
        const generatedId = await generateId();
        setId(generatedId);
      };
      console.log("nuevo id generado");
      fetchId();
    }
  }, [getId]);

  //set initial values of the inputs
  useEffect(() => {
    if (props.infoTransactionToUpdate) {
      setCategory(props.infoTransactionToUpdate.transaction.category);
      setAmoutMoney(
        props.infoTransactionToUpdate.transaction.amount.toString()
      );
    }
  }, [props.infoTransactionToUpdate]);

  const saveNewTransaction = () => {
    const currentDate = new CurrentDate();

    setGetId(true);

    const newTransaction: Transaction = {
      id: id,
      type: type === "Ingreso" ? true : false,
      amount: parseInt(amoutMoney),
      category: category,
      year: currentDate.year(),
      month: currentDate.month(),
      day: currentDate.day(),
      hour: [currentDate.hour(), currentDate.minutes(), currentDate.seconds()],
      description: "Ejempo",
    };

    storeTransaction(newTransaction);

    props.setData([...props.transactions, newTransaction]);
  };

  const updateTransaction = () => {
    let records = [...props.transactions];

    if (props.infoTransactionToUpdate) {
      const oldTransaction = props.infoTransactionToUpdate.transaction;
      const newData: Transaction = {
        id: props.infoTransactionToUpdate?.id,
        type: type === "Ingreso" ? true : false,
        amount: parseInt(amoutMoney),
        category: category,
        year: oldTransaction.year,
        month: oldTransaction.month,
        day: oldTransaction.day,
        hour: oldTransaction.hour,
        description: "Actualizado",
      };

      records[props.infoTransactionToUpdate.id] = newData;
      props.setData(records);
    }
    storeTransactions(records);
    props.setData(records);
  };

  const closeModal = () => {
    setAmoutMoney("");
    setCategory("");
    setType("Gasto");
    props.setModalVisible(!props.modalVisible);
  };

  const saveData = () => {
    if (props.infoTransactionToUpdate) {
      updateTransaction();
    } else {
      saveNewTransaction();
    }
    closeModal();
  };

  return (
    <Modal
      visible={props.modalVisible}
      style={{ width: 500, height: 500 }}
      transparent
    >
      <View style={styles.modal}>
        <View style={styles.modalView}>
          <Text>Tipo</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setCategory}
            value={category}
          />
          <Text>Cantidad</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setAmoutMoney}
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
            <CheckBox name="Ingreso" selected={type} setSelected={setType} />
            <CheckBox name="Gasto" selected={type} setSelected={setType} />
          </View>

          <View style={styles.botons}>
            <Pressable style={styles.boton} onPress={saveData}>
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
