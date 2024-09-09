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
          <Text style={styles.text}>{props.data.category}</Text>
          <Text style={styles.text}>{props.data.amount}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
          }}
        >
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
    backgroundColor: "#444444",
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#c0c0c0",
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boton: {
    backgroundColor: "#000",
    borderRadius: 6,
    padding: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
