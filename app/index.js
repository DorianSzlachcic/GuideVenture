import { Alert, StyleSheet, Text, TextInput, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { router } from "expo-router";

import Settings from "./settings";

function startGame(pin) {
  fetch(Settings.ApiUrl + "games/" + pin)
    .then((res) => {
      if (res.status != 200) {
        Alert.alert(
          "Niepoprawny PIN gry",
          "Nie udało się znaleźć gry o podanym PINie"
        );
        return null;
      } else return res.json();
    })
    .then((json) => {
      if (json !== null) {
        Settings.GameId = pin;
        router.navigate("/intro");
      }
    });
}

export default function Page() {
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>PIN gry</Text>
      <TextInput
        onChangeText={setPin}
        value={pin}
        placeholder="Wpisz PIN gry"
        keyboardType="numeric"
      />
      <Text>Nazwa gracza/zespołu</Text>
      <TextInput
        onChangeText={setName}
        value={name}
        placeholder="Wpisz nazwę gracza/zespołu"
      />
      <Button
        title="Zacznij grę"
        onPress={() => {
          startGame(pin);
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
