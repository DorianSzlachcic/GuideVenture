import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RadioButton } from './components/RadioButton';
import Quiz from './quiz';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <RadioButton answer="ABC"/>
    //   <RadioButton answer="ABC"/>
    // </View>
    Quiz
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
