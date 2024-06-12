import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

export function RadioButton({ answer, onPress, isSelected }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.root, isSelected && styles.selected]}>
        <View style={styles.body}>
          {isSelected && (
            <Image
              source={{ uri: "asset:images/check.png" }}
              style={{ width: 24, height: 24 }}
              resizeMode="cover"
            />
          )}
          <Text style={styles.answer}>
            {answer}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 302,
    height: 52,
    borderRadius: 5,
    backgroundColor: 'grey',
    marginBottom: 10,
  },
  selected: {
    backgroundColor: 'blue', // Zmiana koloru tła, gdy element jest zaznaczony
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answer: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
  },
});
