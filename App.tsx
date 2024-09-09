import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Main } from "./components/main";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <View style={{ height: "100%" }}>
        <Main />
      </View>
    </SafeAreaProvider>
  );
}
