import { View, Text, StyleSheet } from "react-native";

type Totals = {
    input: number;
    output: number;
}

export function Totals(props: Totals) {
    const balance = () => {
        return props.input - props.output;
    }
  return (
    <View style={style.base}>
      <View style={style.container}>
        {/* total inputs */}
        <View style={style.fields}>
          <Text style={style.baseText}>Ingresos: </Text>
          <Text style={style.baseText}>{props.input}</Text>
        </View>
        {/* total outputs */}
        <View style={style.fields}>
          <Text style={style.baseText}>Gastos: </Text>
          <Text style={style.baseText}>{props.output}</Text>
        </View>
        {/* balance */}
        <View style={style.fields}>
          <Text style={style.baseText}>Saldos: </Text>
          <Text style={style.baseText}>{ balance() }</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  base: {
    backgroundColor: "gray",
    height: "20%",
    justifyContent: "center",
  },
  fields: {
    flexDirection: "row",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.19)",
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    borderRadius: 20,
    gap: 10,
  },
  baseText: {
    color: "white",
    fontSize: 20,
  }
});
