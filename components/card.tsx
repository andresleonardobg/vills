import { StyleSheet, View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Transaction, NewDataTransaction } from "../types/types";

type propsCard = {
  data: Transaction;
  delete: (id: number) => void;
  edit: (id: number) => void;
};

export function Card(props: propsCard) {
  return (
    <>
      <View style={props.data.type ? styles.input : styles.output}>
        <View>
          <Text>{props.data.category}</Text>
          <Text>{props.data.amount}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Pressable
            onPress={() => props.delete(props.data.id)}
            style={styles.boton}
          >
            <MaterialIcons name="delete" size={24} color="#ffffff" />
          </Pressable>
          <Pressable
            onPress={() => props.edit(props.data.id)}
            style={styles.boton}
          >
            <AntDesign name="edit" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  output: {
    backgroundColor: "yellow",
    padding: 20,
    borderWidth: 5,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "green",
    padding: 20,
    borderWidth: 5,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boton: {
    backgroundColor: "#000",
    borderRadius: 6,
    padding: 10,
    width: 60,
    right: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
