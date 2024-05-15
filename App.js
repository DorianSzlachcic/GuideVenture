import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import QuizScreen from './screens/QuizScreen.js';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <QuizScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
