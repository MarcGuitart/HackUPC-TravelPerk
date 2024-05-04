import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { supabase } from './src/supabase';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {

  const [user, setUser] = useState('');

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const username = user ? user.email : 'Guest';
    setUser(username);
    console.log(`Username: ${username}`);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#fb5b5a' }]}
        onPress={() => navigation.navigate('LogIn')}
      >
        <AntDesign name="login" size={24} color="white" />
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#5d8ffc' }]}
        onPress={() => navigation.navigate('Register')}
      >
        <AntDesign name="adduser" size={24} color="white" /> {/* Cambiado el icono a "adduser" */}
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.welcomeText}>
        {user ? `Bienvenido, ${user}` : 'Bienvenido, Invitado'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#144fcc',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
});
