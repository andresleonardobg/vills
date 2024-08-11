import { StyleSheet, View, Text } from "react-native";

export function Card({ data }) {
  return (
    <>
      <View style={data.type ? styles.input : styles.output}>
        <Text>{data.category}</Text>
        <Text>{data.amount}</Text>
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
