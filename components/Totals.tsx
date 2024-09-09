import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Totals = {
  input: number;
  output: number;
};

export function Totals(props: Totals) {
  const balance = () => {
    return props.input - props.output;
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={style.base}>
      <View style={[style.container, { marginTop: insets.top }]}>
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
          <Text style={style.baseText}>{balance()}</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  base: {
    backgroundColor: "black",
    height: "20%",
    justifyContent: "center",
  },
  fields: {
    flexDirection: "row",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.19)",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
    gap: 10,
  },
  baseText: {
    color: "white",
    fontSize: 20,
  },
});
