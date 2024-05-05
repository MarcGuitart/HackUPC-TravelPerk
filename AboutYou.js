import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { supabase } from './src/supabase';

export default function PreferenceScreen({ navigation }) {
  const [dni, setDni] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');

  const handleSavePreferences = async () => {
    try {
      if (!dni || !username || !phoneNumber || !age) {
        throw new Error('Please fill in all fields');
      }

      if (!/^\d{8}$/.test(dni)) {
        throw new Error('Please enter a valid DNI (8 digits)');
      }

      if (!/^\d{9}$/.test(phoneNumber)) {
        throw new Error('Please enter a valid phone number (9 digits)');
      }

      const ageNumber = parseInt(age);
      if (isNaN(ageNumber) || ageNumber < 5 || ageNumber > 120) {
        throw new Error('Please enter a valid age (between 5 and 120)');
      }

      // Verificar si el nombre de usuario ya existe en la tabla UserData
      const { data: existingUsers, error } = await supabase
        .from('UserData')
        .select('*')
        .eq('username', username);

      if (error) {
        throw new Error('Error checking existing users: ' + error.message);
      }

      if (existingUsers.length > 0) {
        throw new Error('Username is already taken');
      }

      // Insertar los datos en la tabla 'UserData' de Supabase
      const { data: userData, insertError } = await supabase
        .from('UserData')
        .insert([
          { dni: dni, username: username, phone: phoneNumber, age: age },
        ]);

      if (insertError) {
        throw new Error('Error saving preferences: ' + insertError.message);
      }

      console.log('Datos guardados correctamente:', userData);

      // Navegar a la siguiente pantalla después de guardar los datos
      navigation.reset({
        index: 0,
        routes: [{ name: 'Feed' }],
      });
    } catch (error) {
      alert(error.message);
      console.error('Error al guardar las preferencias:', error.message);
    }
  };

  return (
    <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Insert your data for security reasons
        </Text>

        <TextInput
          style={styles.input}
          value={dni}
          onChangeText={(text) => setDni(text)}
          placeholder="Enter your DNI"
          placeholderTextColor="#000"
        />

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Enter your username"
          placeholderTextColor="#000"
        />

        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholder="Enter your phone number"
          placeholderTextColor="#000"
        />

        <TextInput
          style={styles.input}
          value={age}
          onChangeText={(text) => setAge(text)}
          placeholder="Enter your age"
          placeholderTextColor="#000"
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#28A4D4' }]}
          onPress={handleSavePreferences}
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '45%',
    color: '#000',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#042f83',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
