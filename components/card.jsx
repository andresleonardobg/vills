import { StyleSheet, View, Text } from "react-native";

export function Card({ input }) {
  return (
    <>
      <View style={input ? styles.input : styles.output}>
        <Text>Comida</Text>
        <Text>-$100000</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  output: {
    backgroundColor: "yellow",
    width: "90%",
    padding: 20,
    borderWidth: 5,
    borderRadius: 20,
  },
  input: {
    backgroundColor: "green",
    width: "90%",
    padding: 20,
    borderWidth: 5,
    borderRadius: 20,
  },
});
