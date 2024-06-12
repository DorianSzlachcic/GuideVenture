import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const SummaryScreen = ({ points, photos }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Podsumowanie</Text>
      <Text style={styles.points}>Zdobyte punkty: {points}</Text>
      <Text style={styles.subtitle}>Zdjęcia:</Text>
      {photos.map((photoUri, index) => (
        <Image key={index} source={{ uri: photoUri }} style={styles.image} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  points: {
    fontSize: 20,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default SummaryScreen;
