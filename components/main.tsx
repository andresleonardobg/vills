import { useState, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, View, Alert } from "react-native";
import { ModalForm } from "./modalForm";
import { Card } from "./card";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  getData,
  removeData,
  storeTransactions,
} from "../database/db_controller";
import { Transaction } from "../types/types";
import { Totals } from "./Totals";
import { saveFile, getDataFile } from "../database/storeFile";

type TrasactionToUpdate = {
  id: number;
  transaction: Transaction;
};

export function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [records, setRecords] = useState<Transaction[]>([]);
  const [transactionToUpdate, setTransactionToUpdate] =
    useState<TrasactionToUpdate | null>(null);

  // get data from localstorage
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      console.log("data completa: ", JSON.stringify(data, null, 2));
      if (data !== null) {
        setRecords(data.transactions);
      }
    };
    fetchData();
  }, []);

  const getDataFileInfo = async () => {
    const data = await getDataFile();
    if (data !== null) {
      setRecords(data);
      storeTransactions(data);
    }
  };

  const showAlert = () => {
    Alert.alert("Info", "¿Borrar todas las bases de datos?", [
      {
        text: "ok",
        onPress: () => {
          setRecords([]);
          removeData();
        },
      },
      {
        text: "Cancelar",
        onPress: () => console.log("dismissing alert"),
      },
    ]);
  };

  const deleteRecord = (id: number) => {
    const index = records.findIndex((item) => item.id === id);
    const oldRecords = [...records];
    oldRecords.splice(index, 1);
    setRecords(oldRecords);
    storeTransactions(oldRecords);
  };

  const editRecord = (id: number) => {
    const index = records.findIndex((item) => item.id === id);
    const transaction = records[index];
    const dataToUpdate: TrasactionToUpdate = {
      id: index,
      transaction: transaction,
    };
    setTransactionToUpdate(dataToUpdate);
    setModalVisible(true);
  };

  const totalsInputs: number = records.reduce((previousValue, currentValue) => {
    if (currentValue.type) {
      return previousValue + currentValue.amount;
    }
    return previousValue;
  }, 0);

  const totalsOutputs: number = records.reduce((preValue, currentValue) => {
    if (!currentValue.type) {
      return preValue + currentValue.amount;
    }
    return preValue;
  }, 0);

  return (
    <>
      <ModalForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        transactions={records}
        setData={setRecords}
        infoTransactionToUpdate={transactionToUpdate}
      />
      <Totals input={totalsInputs} output={totalsOutputs} />
      <FlatList
        style={{ padding: 20, gap: 20 }}
        data={records}
        renderItem={({ item }) => (
          <Card data={item} delete={deleteRecord} edit={editRecord} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
      <View style={{ height: 20 }} />
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.boton}
      >
        <Ionicons name="add-circle" size={32} color="white" />
      </Pressable>
      <Pressable onPress={showAlert} style={styles.botonDelete}>
        <MaterialIcons name="delete" size={24} color="#ffffff" />
      </Pressable>
      <Pressable
        onPress={() => saveFile(records, "records_test")}
        style={styles.botonSave}
      >
        <MaterialIcons name="file-download" size={32} color="black" />
      </Pressable>
      <Pressable onPress={getDataFileInfo} style={styles.botonImport}>
        <MaterialCommunityIcons name="import" size={32} color="black" />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#737373",
    borderWidth: 3,
    borderRadius: 6,
    padding: 10,
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 150,
    right: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  botonDelete: {
    backgroundColor: "#737373",
    borderWidth: 3,
    borderRadius: 6,
    padding: 10,
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 50,
    right: 60,
    alignItems: "center",
    justifyContent: "center",
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
  debug: {
    borderWidth: 2,
    borderColor: "#f00",
  },
  botonSave: {
    backgroundColor: "#737373",
    borderWidth: 3,
    borderRadius: 6,
    padding: 10,
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 250,
    right: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  botonImport: {
    backgroundColor: "#737373",
    borderWidth: 3,
    borderRadius: 6,
    padding: 10,
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 350,
    right: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
