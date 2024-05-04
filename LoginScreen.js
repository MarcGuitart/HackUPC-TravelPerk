import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Aquí puedes implementar la lógica para registrar al usuario
    console.log('Username:', username);
    console.log('Password:', password);
    
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Login successful!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      
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
      <View style={styles.separator}></View>
      <Button
        title="Log In"
        onPress={handleRegister}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#144fcc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: '80%',
  },
  separator: {
    height: 30, // Espacio entre los botones
  },
});
