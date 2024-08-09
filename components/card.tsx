import { StyleSheet, View, Text } from "react-native";

export function Card({ input }) {
  return (
    <>
      <View style={input.type ? styles.input : styles.output}>
        <Text>{input.category}</Text>
        <Text>{input.amount}</Text>
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
  },
  input: {
    backgroundColor: "green",
    padding: 20,
    borderWidth: 5,
    borderRadius: 20,
  },
});
