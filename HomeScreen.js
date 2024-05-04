import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Iniciar sesión"
        onPress={() => navigation.navigate('LogIn')}
        style={styles.button}
      />
      <View style={styles.separator}></View>
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 150,
    backgroundColor: '#144fcc',
  },
  separator: {
    height: 30, // Espacio entre los botones
  },
});
