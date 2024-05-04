import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from './src/supabase';

export default function RegisterScreen() {

  const [dni, setDni] = React.useState('');
  const [age, setAge] = React.useState('');
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handleRegister = async () => {
    
  try {
      if (password !== confirmPassword) {
        console.error('Las contraseñas no coinciden');
        return;
      }

      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Error al registrar usuario:', error.message);
        return;
      }

    // Aquí puedes implementar la lógica para registrar al usuario
    console.log('DNI:', dni);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Age:', age);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);

    // Por ejemplo, podrías guardar el resto de los datos en una tabla de usuarios personalizada en Supabase
    const { data, error: insertError } = await supabase.from('Users').insert([
      { dni, username, phoneNumber, age, email},
    ]);

    if (insertError) {
      console.error('Error al insertar usuario en la base de datos:', insertError.message);
      return;
    }

    console.log('Datos del usuario guardados en la base de datos:', data);
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
  }
  

};

  return (
    <View style={{ flex: 1, backgroundColor: '#144fcc', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 20 }}>Create your account</Text>
      
      <TextInput
        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10 }}
        placeholder="Enter your username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      
      <TextInput
        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10 }}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      
      <TextInput
        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10 }}
        placeholder="Confirm your password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      
      <TextInput
        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10 }}
        placeholder="Enter your DNI"
        value={dni}
        onChangeText={text => setDni(text)}
      />
      
      <TextInput
        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10 }}
        placeholder="Enter your age"
        value={age}
        onChangeText={text => setAge(text)}
      />
      
      <TextInput
        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10 }}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      
      <TextInput
        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10 }}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      
      <Button
        title="Register"
        onPress={handleRegister}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}
