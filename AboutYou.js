import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from './src/supabase';

export default function PreferenceScreen({ navigation }) {
  const [dni, setDni] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');

  const handleSavePreferences = async () => {
    try {
      // Insertar los datos en la tabla 'Users' de Supabase
      const { data, error } = await supabase.from('Users').insert([
        { dni, username, phoneNumber, age },
      ]);

      if (error) {
        console.error('Error al guardar las preferencias:', error.message);
        return;
      }

      console.log('Datos guardados correctamente:', data);

      // Navegar a la siguiente pantalla después de guardar los datos
      navigation.navigate('Feed');
    } catch (error) {
      console.error('Error al guardar las preferencias:', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    <Text style={{ fontSize: 20, marginBottom: 20 }}>Insert your data for security reasons</Text>

      <Text>DNI:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 5 }}
        value={dni}
        onChangeText={text => setDni(text)}
      />
      
      <Text>Username:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 5 }}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      
      <Text>Phone Number:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 5 }}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      
      <Text>Age:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 5 }}
        value={age}
        onChangeText={text => setAge(text)}
      />
      
      <Button title="Save Data" onPress={handleSavePreferences} />
    </View>
  );
}
