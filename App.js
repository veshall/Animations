import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import CardContainer from "../Components/Card_Swipe_Animation/CardContainer";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <CardContainer />
        <StatusBar style="light" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
