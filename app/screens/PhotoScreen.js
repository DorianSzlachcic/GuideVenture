import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const PhotoScreen = ({ step=4, onNextAction }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      const uri = FileSystem.documentDirectory + photo.uri.split('/').pop();
      await FileSystem.moveAsync({ from: photo.uri, to: uri });
      setPhotoUri(uri);
      Alert.alert('Photo taken!', 'Photo has been saved to device.');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(ref) => setCamera(ref)} />
      <Button title="Take Photo" onPress={takePhoto} />
      {photoUri && <Button title="Next" onPress={() => onNextAction(step.points, photoUri)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '70%',
  },
});

export default PhotoScreen;
