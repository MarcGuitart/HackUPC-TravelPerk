import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from './src/supabase';

export default function PreferenceScreen({ navigation }) {
  const [dni, setDni] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');

  const handleSavePreferences = async () => {
    try {
      // Validar que todos los campos estén completos
      if (!dni || !username || !phoneNumber || !age) {
        throw new Error('Please fill in all fields');
      }

      // Validar el formato del DNI (8 números)
      if (!/^\d{8}$/.test(dni)) {
        throw new Error('Please enter a valid DNI (8 digits)');
      }

      // Validar el formato del número de teléfono (9 números)
      if (!/^\d{9}$/.test(phoneNumber)) {
        throw new Error('Please enter a valid phone number (9 digits)');
      }

      // Validar que la edad sea un número entre 5 y 120
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Insert your data for security reasons
      </Text>

      <Text>DNI:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 5 }}
        value={dni}
        onChangeText={(text) => setDni(text)}
      />

      <Text>Username:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 5 }}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Text>Phone Number:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 5 }}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />

      <Text>Age:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 5 }}
        value={age}
        onChangeText={(text) => setAge(text)}
      />

      <Button title="Save Data" onPress={handleSavePreferences} />
    </View>
  );
}
