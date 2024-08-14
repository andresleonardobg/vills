import { StyleSheet, View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Transaction } from "../types/types";

type propsCard = {
  data: Transaction;
  delete: (id: number) => void;
};

export function Card(props: propsCard) {
  return (
    <>
      <View style={props.data.type ? styles.input : styles.output}>
        <View>
          <Text>{props.data.category}</Text>
          <Text>{props.data.amount}</Text>
        </View>
        <View>
          {/* //TODO: bug when delete other card all deleted and check the id of
          objects */}
          <Pressable
            onPress={() => props.delete(props.data.id)}
            style={styles.boton}
          >
            <MaterialIcons name="delete" size={24} color="#ffffff" />
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
