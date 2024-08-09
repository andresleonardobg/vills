import { Text, View, TouchableOpacity } from "react-native";

export function CheckBox({ name, selected, setSelected }) {
  let checked;

  if (selected === name) {
    checked = <Text>X</Text>;
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View>
        <TouchableOpacity
          onPress={() => setSelected(name)}
          style={{
            borderWidth: 2,
            borderColor: "black",
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {checked}
        </TouchableOpacity>
      </View>
      <Text>{name}</Text>
    </View>
  );
}
