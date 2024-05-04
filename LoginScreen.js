import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from './src/supabase';
import { AntDesign } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Aquí puedes implementar la lógica para registrar al usuario
    console.log('Email:', email);
    console.log('Password:', password);
    
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })


    if (error) {
      alert(error.message);
    } else {
        navigation.reset({
        index: 0,
        routes: [{ name: 'Feed' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28A4D4' }]}
        onPress={handleRegister}
      >
        <AntDesign name="login" size={24} color="white" />
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});
