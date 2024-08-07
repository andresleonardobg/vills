import { useState, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ModalForm } from "./modalForm";
import { Card } from "./card";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { getData, removeData } from "../database/db_controller";

export function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [records, setRecords] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      console.log("data completa: ", data);
      console.log("Transacciones: ", data.transactions);
      if (data !== null) {
        setRecords(data.transactions);
      }
    };
    console.log("Records", records);
    fetchData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ModalForm
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={records}
          setData={setRecords}
        />
        <FlatList
          style={{ gap: 10 }}
          data={records}
          // keyExtractor={}
          renderItem={({ item }) => <Card input={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        // onPress={() => removeData()}
        style={styles.boton}
      >
        <Ionicons name="add-circle" size={32} color="white" />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    paddingTop: Constants.statusBarHeight,
  },
  boton: {
    backgroundColor: "#000",
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
});
