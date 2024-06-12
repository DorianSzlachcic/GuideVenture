import { ActivityIndicator, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import QuizScreen from "./screens/QuizScreen";
import PhotoScreen from "./screens/PhotoScreen";
import PuzzleScreen from "./screens/PuzzleScreen";
import NavigationScreen from "./screens/NavigationScreen";
import SummaryScreen from "./screens/SummaryScreen";
import Settings from "./settings";

export default function Gameplay() {
  const [stepNum, setStepNum] = useState(2);
  const [step, setStep] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [points, setPoints] = useState(0);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(
      Settings.ApiUrl +
        "games/" +
        Settings.GameId +
        "/steps/" +
        stepNum.toString()
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

  const onNextAction = (additionalPoints = 0, photo = null) => {
    setPoints(points + additionalPoints);
    if (photo) {
      setPhotos([...photos, photo]);
    }
    setLoaded(false);
    setStepNum(stepNum + 1);
  };

  if (!loaded)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (!step) {
    return <SummaryScreen points={points} photos={photos} />;
  }

  switch (step.step_type) {
    case "quiz":
      return <QuizScreen step={step} onNextAction={onNextAction} />;
    case "photo":
      return <PhotoScreen step={step} onNextAction={onNextAction} />;
    case "puzzle":
      return <PuzzleScreen step={step} onNextAction={onNextAction} />;
    default:
      return (
        <View style={styles.container}>
          <Text>Unknown step type</Text>
        </View>
      );
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
