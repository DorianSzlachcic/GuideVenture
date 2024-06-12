import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState } from "react";
import Settings from "./settings";
import { router } from "expo-router";

export default function Intro() {
  const [loaded, setLoaded] = useState(false);
  const [json, setJson] = useState(null);

  fetch(Settings.ApiUrl + "games/" + Settings.GameId)
    .then((res) => {
      if (res.status !== 200) return null;
      return res.json();
    })
    .then((j) => {
      setJson(j);
      setLoaded(true);
    });

  if (!loaded)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{json["title"]}</Text>
      <Text>{json["introduction"]}</Text>
      <Button
        title="Ruszamy!"
        onPress={() => {
          router.navigate("/gameplay");
        }}
      />
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
