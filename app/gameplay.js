import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import QuizScreen from "./screens/QuizScreen";

export default function Gameplay() {
  const [stepNum, setStepNum] = useState(1);
  const [step, setStep] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      Settings.ApiUrl +
        "games/" +
        Settings.GameId +
        "/step/" +
        toString(stepNum)
    )
      .then((res) => {
        if (res.status !== 200) return null;
        return res.json();
      })
      .then((s) => {
        setStep(s);
        setLoaded(true);
      });
  }, [stepNum]);

  if (!loaded)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );

  const onNextAction = () => {
    setStepNum(stepNum + 1);
  };

  switch (step["step_type"]) {
    case "quiz":
      return <QuizScreen step={step} onNextAction={onNextAction} />;
    default:
      break;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
