import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import QuizScreen from "./screens/QuizScreen.js";
import Puzzle from "./screens/Puzzle.js";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <QuizScreen />
      {/* <Puzzle
        imageUri={require("./screens/wroclaw.jpeg")}
        rows={3}
        cols={3}
        onSolved={() => console.log("Puzzle solved!")}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
