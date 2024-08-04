import { StyleSheet, View, Text } from "react-native";

export function Card({ input }) {
  return (
    <>
      <View style={input.typeRecord ? styles.input : styles.output}>
        <Text>{input.name}</Text>
        <Text>{input.value}</Text>
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
