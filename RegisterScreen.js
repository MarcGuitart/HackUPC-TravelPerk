import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from './src/supabase';

export default function RegisterScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');


  const handleRegister = async () => {
    //navigation.navigate('Prefer');

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
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

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
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
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
      
      <Button
        title="Register"
        //onPress={handleRegister}
        onPress={() => navigation.navigate('Preferences')}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}
