import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const PuzzleScreen = ({ step, onNextAction }) => {
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  const solvePuzzle = () => {
    setPuzzleSolved(true);
  };

  return (
    <View style={styles.container}>
      <Text>{step.step_description.String}</Text>
      <Image source={{ uri: step.image_source.String }} style={styles.image} />
      <Button title="Solve Puzzle" onPress={solvePuzzle} />
      {puzzleSolved && <Button title="Next" onPress={() => onNextAction(step.points, null)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginVertical: 20,
  },
});

export default PuzzleScreen;
